const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const articleSchema = new mongoose.Schema({
  title: String
});

const Article = mongoose.model("articles", articleSchema);

function validationArticle(article) {
  const schemaArticle = {
    title: Joi.string()
      .min(3)
      .required()
  };
  const schema = Joi.object(schemaArticle);
  return schema.validateAsync(article);
}

module.exports.Article = Article;
module.exports.validationArticle = validationArticle;
