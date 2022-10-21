//Import des modules
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Modèle d'utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

//Contrôle d'unicité de l'email utilisateur
userSchema.plugin(uniqueValidator);

//Export du modèle
module.exports = mongoose.model('User', userSchema);