//Import des modules
const validator = require("validator");

//Contrôle de l'email
module.exports = (req, res, next) => {
  if (validator.isEmail(req.body.email)) {
    next();
  } else {
    return res.status(400).json({ message: "Cet email n'est pas valide." });
  }
};