const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const categorieSchema = new mongoose.Schema({
  nom: String
});

const Categorie = mongoose.model("categories", categorieSchema);

function validationCategorie(categorie) {
  const schemaCategorieJoi = {
    nom: Joi.string()
      .min(3)
      .required()
  };
  const schema = Joi.object(schemaCategorieJoi);
  return schema.validateAsync(categorie);
}

module.exports.Categorie = Categorie;
module.exports.categorieSchema = categorieSchema;
module.exports.validationArticle = validationCategorie;
