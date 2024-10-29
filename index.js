import { createApp } from "./config.js";

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

app.get("/impressum", async function (req, res) {
  res.render("impressum", {});
});

app.get("/gallery", async function (req, res) {
  const posts = await app.locals.pool.query("select * from posts");
  res.render("gallery", { posts: posts.rows });
});

app.get("/post/:id", async function (req, res) {
  const posts = await app.locals.pool.query(
    `select * from posts WHERE id = ${req.params.id}`
  );
  res.render("post", { posts: posts.rows });
});

/*29.10.2024 Formular Post*/
app.get("/new_post", async function (req, res) {
  res.render("new_post", {});
});

app.post("create_post/", async function (req, res) {
  await app.locals.pool.query(
    "INSERT INTO posts (title, image, timestamp, likes, description, user_id) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      req.body.title,
      req.body.image,
      req.body.timestamp,
      req.body.likes,
      req.body.description,
      req.body.user_id,
    ]
  );
  res.redirect("/start");
});

app.get("/profil", async function (req, res) {
  const users = await app.locals.pool.query("select * from users where id = 1");
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
