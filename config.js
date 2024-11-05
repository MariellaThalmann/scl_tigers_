import express from "express";
import { engine } from "express-handlebars";
import pg from "pg";
const { Pool } = pg;
import cookieParser from "cookie-parser";
import multer from "multer";
const upload = multer({ dest: "public/uploads/" });
import sessions from "express-session";
import bcrypt from "bcrypt";

export function createApp(dbconfig) {
  const app = express();

  const pool = new Pool(dbconfig);

  app.engine("handlebars", engine());
  app.set("view engine", "handlebars");
  app.set("views", "./views");

  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(
    sessions({
      secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
      saveUninitialized: true,
      cookie: { maxAge: 86400000, secure: false },
      resave: false,
    })
  );

  app.locals.pool = pool;
  /* Wie Registration und das Login funktioniert*/
  app.get("/registration", function (req, res) {
    res.render("registration");
  });

  app.post("/registration", function (req, res) {
    var password = bcrypt.hashSync(req.body.passwort, 10);
    pool.query(
      "INSERT INTO users (username, prename, name, age, phonenumber, email, passwort) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        req.body.username,
        req.body.prename,
        req.body.name,
        req.body.age,
        req.body.phonenumber,
        req.body.email,
        req.body.passwort,
      ],
      (error, result) => {
        if (error) {
          console.log(error);
        }
        res.redirect("/create_login");
      }
    );
  });

  app.get("/create_login", function (req, res) {
    res.render("login");
  });

  app.post("/create_login", function (req, res) {
    pool.query(
      "SELECT * FROM users WHERE username = $1",
      [req.body.username],
      (error, result) => {
        if (error) {
          console.log(error);
        }
        if (bcrypt.compareSync(req.body.passwort, result.rows[0].passwort)) {
          req.session.userid = result.rows[0].id;
          res.redirect("/");
        } else {
          res.redirect("/login");
        }
      }
    );
  });
  return app;
}

export { upload };
