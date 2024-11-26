import { createApp, upload } from "./config.js";

const app = createApp({
  user: "dawn_water_3245",
  host: "bbz.cloud",
  database: "dawn_water_3245",
  password: "720b8cf3cac1877e2ba687da65daf3e4",
  port: 30211,
});

/* Startseite */
app.get("/", async function (req, res) {
  res.render("start", {});
});

/*29.10.2024 Formular Post*/
app.get("/new_post", async function (req, res) {
  if (!req.session.user_id) {
    res.redirect("/login");
    return;
  }
  res.render("new_post", {});
});

app.post("/create_post", upload.single("image"), async function (req, res) {
  await app.locals.pool.query(
    "INSERT INTO posts (title, image, date, likes, description, user_id) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      req.body.title,
      req.file.filename,
      req.body.date,
      0,
      req.body.description,
      req.session.user_id,
    ]
  );
  res.redirect("/gallery");
});

/* Post like function*/
app.post("/like/:id", async function (req, res) {
  if (!req.session.user_id) {
    res.redirect("/login");
    return;
  }

  await app.locals.pool.query(
    "INSERT INTO likes (post_id, user_id) VALUES ($1, $2)",
    [req.params.id, req.session.user_id]
  );
  res.redirect("/gallery");
});

/*Post comment function */
app.post("/comments/:id", async function (req, res) {
  if (!req.session.user_id) {
    res.redirect("/login");
    return;
  }
  await app.locals.pool.query(
    "INSERT INTO comments (post_id, user_id, text ) VALUES ($1, $2, $3)",
    [req.params.id, req.session.userid, req.body.text]
  );
  res.redirect("/gallery");
});

/* post id */
app.get("/post/:id", async function (req, res) {
  const posts = await app.locals.pool.query(
    "SELECT * from posts WHERE id = $1",
    [req.params.id]
  );
  const likes = await app.locals.pool.query(
    "SELECT COUNT(user_id) FROM likes WHERE post_id = $1",
    [req.params.id]
  );
  res.render("post", { posts: posts.rows, likes: likes.rows[0] });
});

/* Impressum*/
app.get("/impressum", async function (req, res) {
  res.render("impressum", {});
});

app.get("/gallery", async function (req, res) {
  const posts = await app.locals.pool.query("select * from posts");
  res.render("gallery", { posts: posts.rows });
});

app.get("/profil", async function (req, res) {
  if (!req.session.user_id) {
    res.redirect("/login");
    return;
  }
  const users = await app.locals.pool.query(
    "SELECT * FROM users WHERE id = $1",
    [req.session.user_id]
  );
  const posts = await app.locals.pool.query(
    "SELECT * FROM posts WHERE user_id = $1",
    [req.session.user_id]
  );
  res.render("profil", { users: users.rows });
});

app.get("/login", async function (req, res) {
  res.render("login", {});
});

app.get("/registration", async function (req, res) {
  res.render("login", {});
});

/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
