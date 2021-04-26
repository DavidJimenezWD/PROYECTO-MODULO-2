const express = require("express");
const router = express.Router();

router.get("/ps", (req, res) => {
  const db = req.app.locals.db;
  db.collection("samples_gamesPS")
    .find()
    .toArray((err, info) => {
      if (err !== null) {
        res.send({ mensaje: err });
      } else {
        res.send(info);
      }
    });
});

router.get("/pc", (req, res) => {
  const db = req.app.locals.db;
  db.collection("samples_gamesPC")
    .find()
    .toArray((err, info) => {
      if (err !== null) {
        res.send({ mensaje: err });
      } else {
        res.send(info);
      }
    });
});

router.get("/xbx", (req, res) => {
  const db = req.app.locals.db;
  db.collection("samples_gamesXBX")
    .find()
    .toArray((err, info) => {
      if (err !== null) {
        res.send({ mensaje: err });
      } else {
        res.send(info);
      }
    });
});

router.get("/ps", (req, res) => {
  const db = req.app.locals.db;
  db.collection("samples_gamesPS")
    .find()
    .toArray((err, info) => {
      if (err !== null) {
        res.send({ mensaje: err });
      } else {
        res.send(info);
      }
    });
});

router.get("/pc", (req, res) => {
  const db = req.app.locals.db;
  db.collection("samples_gamesPC")
    .find()
    .toArray((err, info) => {
      if (err !== null) {
        res.send({ mensaje: err });
      } else {
        res.send(info);
      }
    });
});

router.get("/xbx", (req, res) => {
  const db = req.app.locals.db;
  db.collection("samples_gamesXBX")
    .find()
    .toArray((err, info) => {
      if (err !== null) {
        res.send({ mensaje: err });
      } else {
        res.send(info);
      }
    });
});

router.post("/anyadirPS", (req, res) => {
  const newGame = req.body;
  newGame.categoria = "PS";
  const db = req.app.locals.db;

  db.collection("samples_gamesPS").insertOne(newGame, (err, info) => {
    if (err !== null) {
      res.send({ mensaje: err });
    } else {
      res.send({ mensaje: info });
    }
  });
});

router.post("/anyadirPC", (req, res) => {
  const newGame = req.body;
  newGame.categoria = "PC";
  const db = req.app.locals.db;

  db.collection("samples_gamesPC").insertOne(newGame, (err, info) => {
    if (err !== null) {
      res.send({ mensaje: err });
    } else {
      res.send({ mensaje: info });
    }
  });
});

router.post("/anyadirXBX", (req, res) => {
  const newGame = req.body;
  newGame.categoria = "XBX";
  const db = req.app.locals.db;

  db.collection("samples_gamesXBX").insertOne(newGame, (err, info) => {
    if (err !== null) {
      res.send({ mensaje: err });
    } else {
      res.send({ mensaje: info });
    }
  });
});

router.put("/editarPS", (req, res) => {
  const editGame = req.body;
  const titleGame = req.body.titulo;
  const db = req.app.locals.db;

  db.collection("samples_gamesPS").updateOne(
    { titulo: titleGame },
    { $set: editGame },
    (err, info) => {
      if (err !== null) {
        res.send({ mensaje: err });
      } else {
        res.send({ mensaje: info });
      }
    }
  );
});
router.put("/editarPC", (req, res) => {
  const editGame = req.body;
  const titleGame = req.body.titulo;
  const db = req.app.locals.db;

  db.collection("samples_gamesPC").updateOne(
    { titulo: titleGame },
    { $set: editGame },
    (err, info) => {
      if (err !== null) {
        res.send({ mensaje: err });
      } else {
        res.send({ mensaje: info });
      }
    }
  );
});

router.put("/editarXBX", (req, res) => {
  const editGame = req.body;
  const titleGame = req.body.titulo;
  const db = req.app.locals.db;

  db.collection("samples_gamesXBX").updateOne(
    { titulo: titleGame },
    { $set: editGame },
    (err, info) => {
      if (err !== null) {
        res.send({ mensaje: err });
      } else {
        res.send({ mensaje: info });
      }
    }
  );
});

router.delete("/eliminarPS", (req, res) => {
  const titleGame = req.body.titulo;
  const db = req.app.locals.db;

  db.collection("samples_gamesPS").deleteOne(
    { titulo: titleGame },
    (err, info) => {
      if (err !== null) {
        res.send({ mensaje: err });
      } else {
        res.send({ mensaje: info });
      }
    }
  );
});
router.delete("/eliminarPC", (req, res) => {
  const titleGame = req.body.titulo;
  const db = req.app.locals.db;

  db.collection("samples_gamesPC").deleteOne(
    { titulo: titleGame },
    (err, info) => {
      if (err !== null) {
        res.send({ mensaje: err });
      } else {
        res.send({ mensaje: info });
      }
    }
  );
});
router.delete("/eliminarXBX", (req, res) => {
  const titleGame = req.body.titulo;
  const db = req.app.locals.db;

  db.collection("samples_gamesXBX").deleteOne(
    { titulo: titleGame },
    (err, info) => {
      if (err !== null) {
        res.send({ mensaje: err });
      } else {
        res.send({ mensaje: info });
      }
    }
  );
});

router.post("/buscarTituloPS", (req, res) => {
  const titulo = req.body.titulo;
  const db = req.app.locals.db;

  db.collection("samples_gamesPS")
    .find({ titulo: titulo })
    .toArray((err, info) => {
      if (err !== null) {
        res.send({ mensaje: err });
      } else {
        res.send(info);
      }
    });
});

router.post("/buscarTituloPC", (req, res) => {
  const titulo = req.body.titulo;
  const db = req.app.locals.db;

  db.collection("samples_gamesPC")
    .find({ titulo: titulo })
    .toArray((err, info) => {
      if (err !== null) {
        res.send({ mensaje: err });
      } else {
        res.send(info);
      }
    });
});

router.post("/buscarTituloXBX", (req, res) => {
  const titulo = req.body.titulo;
  const db = req.app.locals.db;

  db.collection("samples_gamesXBX")
    .find({ titulo: titulo })
    .toArray((err, info) => {
      if (err !== null) {
        res.send({ mensaje: err });
      } else {
        res.send(info);
      }
    });
});

module.exports = router;
