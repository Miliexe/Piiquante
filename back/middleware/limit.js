//Import des modules
const rateLimit = require("express-rate-limit");

//Limites des requêtes
const limiter = rateLimit({
    max: 5,
    windowMs: 15 * 60 * 1000,
    message: "Too many request from this IP"
  });

//Export du middleware
module.exports = limiter;