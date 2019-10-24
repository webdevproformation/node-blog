const express = require("express");
const Joi = require("@hapi/joi");
const router = express.Router();
const mongoose = require("mongoose");
const { Article, validationArticle } = require("../model/articles");

router.get("/", async (req, resp) => {
  const result = await Article.find();
  resp.send(result);
});

router.get("/:id", (req, resp) => {
  const id = req.params.id;
  const verifId = mongoose.Types.ObjectId.isValid(id);

  if (!verifId) {
    return resp.status(400).send(`${id} invalid`);
  }

  Article.findById(id)
    .then(result => {
      if (!result) return resp.status(404).send([]);
      return resp.send(result);
    })
    .catch(error => {
      resp.status(404).send(error.details[0].message);
    });
});

router.post("/", (req, resp) => {
  validationArticle(req.body)
    .then(() => {
      const newArticle = new Article({
        title: req.body.title,
        contenu: req.body.contenu
      });
      newArticle.save().then(result => {
        resp.send(result);
      });
    })
    .catch(error => {
      resp.status(400).send(error.details[0].message);
    });
});

router.put("/:id", (req, resp) => {
  const id = req.params.id;
  const verifId = mongoose.Types.ObjectId.isValid(id);

  if (!verifId) {
    return resp.status(400).send(`${id} invalid`);
  }

  validationArticle(req.body)
    .then(() => {
      Article.findById(id).then(article => {
        if (!article) return resp.status(404).send([]);
        article.title = req.body.title;
        article.save().then(result => {
          resp.send(result);
        });
      });
    })
    .catch(error => {
      resp.status(400).send(error.details[0].message);
    });
});

router.delete("/:id", (req, resp) => {
  const id = req.params.id;
  const verifId = mongoose.Types.ObjectId.isValid(id);

  if (!verifId) {
    return resp.status(400).send(`${id} invalid`);
  }

  Article.findByIdAndRemove(id)
    .then(result => {
      if (!result) return resp.status(404).send({});
      return resp.send({});
    })
    .catch(error => {
      resp.status(404).send("aucun article avec id" + error);
    });
});

module.exports = router;
