import { createApp } from "./config.js";

const app = createApp({
  user: "autumn_star_7622",
  host: "168.119.168.41",
  database: "demo",
  password: "uaioysdfjoysfdf",
  port: 18324,
});

/* Startseite */
app.get("/", async function (req, res) {
  res.render("start", {});
});

app.get("/impressum", async function (req, res) {
  res.render("impressum", {});
});

app.get("/views/gallery.handlebars", async function (req, res) {
  res.render("gallery", {});
});

app.get("/views/profil.handlebars", async function (req, res) {
  res.render("profil", {});
});

app.get("/views/login.handlebars", async function (req, res) {
  res.render("login", {});
});

app.get("/views/registration.handlebars", async function (req, res) {
  res.render("login", {});
});
/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
