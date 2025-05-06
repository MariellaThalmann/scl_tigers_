/* Datenbank Verbindung */
import { createApp, upload } from "./config.js";

const app = createApp({
  user: "dawn_water_3245",
  host: "bbz.cloud",
  database: "dawn_water_3245",
  password: "720b8cf3cac1877e2ba687da65daf3e4",
  port: 30211,
});

/* Startseite XY */
app.get("/", async function (req, res) {
  res.render("start", {});
});
app.get("/news", async function (req, res) {
  res.render("news", {});
});
app.get("/spielplan", async function (req, res) {
  res.render("spielplan", {});
});
app.get("/tickets", async function (req, res) {
  res.render("tickets", {});
});
app.get("/aboutus", async function (req, res) {
  res.render("aboutus", {});
});
app.get("/stadion", async function (req, res) {
  res.render("stadion", {});
});
app.get("/impressum", async function (req, res) {
  res.render("impressum", {});
});
app.get("/sclyoungtigers", async function (req, res) {
  res.render("sclyoungtigers", {});
});
app.get("/news2", async function (req, res) {
  res.render("news2", {});
});
app.get("/page", async function (req, res) {
  res.render("page", {});
});
/* Wichtig! Diese Zeilen müssen immer am Schluss der Website stehen! */
app.listen(3010, () => {
  console.log(`Example app listening at http://localhost:3010`);
});
