require("dotenv").config();
const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const admin = require("./admin");
const signup = require("./signup");
const basket = require("./basket");
const app = express();
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/admin", admin);
app.use("/signup", signup);
app.use("/basket", basket);

let db;
let userName;

//Conexion a la DB

MongoClient.connect(
  process.env.URL_CONNECTION_BBDD,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err !== null) {
      console.log("A habido un error: " + err);
    } else {
      app.locals.db = client.db("ecommerce_games");
      db = client.db("ecommerce_games");
    }
  }
);

// Passport para el Login de Usuario

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    function (email, password, done) {
      db.collection("samples_users")
        .find({ email: email })
        .toArray(function (err, users) {
          if (users.length === 0) {
            return done(null, false);
          }
          const user = users[0];
          if (bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.email);
});
passport.deserializeUser(function (id, done) {
  db.collection("samples_users")
    .find({ email: id })
    .toArray(function (err, users) {
      if (users.length === 0) {
        done(null, null);
      }
      done(null, users[0]);
    });
});

//URL para el Login

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/api",
    failureRedirect: "/api/fail",
  })
);

app.get("/api", (req, res) => {
  console.log(req.user.email);
  if (req.user.email === "admin@admin.com") {
    res.redirect("admin.html");
    res.send(alert("OK"));
  } else {
    res.redirect("/");
  }
});

app.get("/api/fail", (req, res) => {
  res.send({ mensaje: "Email o Password Incorrectos" });
});

app.get("/userName", (req, res) => {
  res.send(req.user.nombre);
});

app.get("/userEmail", (req, res) => {
  res.send(req.user.email);
});

app.get("/logout", function (req, res) {
  req.logout();
});

// Puerto de escucha de Node

app.listen(3000, () => console.log("Servidor Iniciado en el Puerto: 3000"));
