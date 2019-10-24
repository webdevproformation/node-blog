// ici c'est ce fichier qui est appelé lorsque l'on est devant une
// page de où on demande un login / mot de passe

// vérifier que les informations sont conformes

// si c'est pas conforme => retour c'est pas conforme
// si c'est conforme => jwt

const express = require("express");
const router = express.Router();
const { Utilisateur } = require("../model/utilisateurs");
const bcrypt = require("bcrypt");

//Postman
//http://localhost:5000/api/connexion
// Post
// {"login" : "login7@yahoo.fr" , "mdp" : "azerty"}
// credentials

router.post("/", (req, resp) => {
  //req.body.login; // contient

  // 1 login qui a été envoyé est conforme => existe dans Mongo

  Utilisateur.find({ login: req.body.login }).then(result => {
    //console.log(result);
    if (result.length === 0)
      return resp.status(400).send("login ou mot de passe incorrect");

    // 2 mdp qui a été envoyé est conforme
    bcrypt.compare(req.body.mdp, result[0].mdp).then(validPassword => {
      if (!validPassword)
        return resp.status(400).send("login ou mot de passe incorrect");

      // envoyer jwt
      const token = result[0].generateAuthenToken();
      resp.header("x-auth", token).send("Bienvenu dans le Back Office !");
    });
  });
});

module.exports = router;
