const express = require("express");
const router = express.Router();
const encodePassword = require("./encode");

//Añado función intermedia para enciptar el password
router.post("/", encodePassword, (req, res) => {
  const db = req.app.locals.db;
  const newUser = req.body;

  db.collection("samples_users")
    .find({ email: newUser.email })
    .toArray((err, info) => {
      if (err !== null) {
        console.log({ mensaje: err });
      } else {
        if (info.length > 0) {
          res.send({ mensaje: "El Usuario existe" });
        } else {
          db.collection("samples_users").insertOne(newUser, (err, info) => {
            if (err !== null) {
              res.send({ mensaje: err });
            } else {
              res.send({ mensaje: "Añadido Correctamente" });
            }
          });
        }
      }
    });
});

module.exports = router;
