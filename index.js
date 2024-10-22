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
