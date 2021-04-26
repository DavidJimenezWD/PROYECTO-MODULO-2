const express = require("express");
const router = express.Router();

router.post("/anyadirACesta", (req, res) => {
  const db = req.app.locals.db;
  const pedido = req.body;

  db.collection("basket_users").insertOne(pedido, (err, info) => {
    if (err !== null) {
      console.log("A ocurrido un error: " + err);
    } else {
      console.log("Añadido al carro " + info);
    }
  });
});

router.post("/recogerCesta", (req, res) => {
  const db = req.app.locals.db;
  const usuario = req.body.usuario;

  db.collection("basket_users")
    .find({ usuario: usuario })
    .toArray((err, info) => {
      if (err !== null) {
        res.send({ mensaje: err });
      } else {
        res.send(info);
      }
    });
});

router.delete("/eliminar", (req, res) => {
  const db = req.app.locals.db;
  const email = req.body.email;
  db.collection("basket_users").deleteMany({ email: email }, (err, info) => {
    if (err !== null) {
      console.log({ mensaje: err });
    } else {
      console.log(info);
    }
  });
});

module.exports = router;
