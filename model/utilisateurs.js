const Joi = require("@hapi/joi");

function validationUtilisateur(profil) {
  const schemaUtilisateur = {
    login: Joi.string()
      .email()
      .required(),
    mdp: Joi.string().required(),
    role: Joi.string()
      .min(3)
      .required()
  };
  const schema = Joi.object(schemaUtilisateur);
  return schema.validateAsync(profil);
}

module.exports.validation = validationUtilisateur;
