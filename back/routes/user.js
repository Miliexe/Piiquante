//Import des modules
const express = require('express');
const router = express.Router();

//Import des contrôleurs
const userCtrl = require('../controllers/user');

//Import des middlewares
const limit = require('../middleware/limit');
const emailValidator = require('../middleware/email-validator');
const passwordValidator = require('../middleware/password-validator');

//Routage
router.post('/signup', emailValidator, passwordValidator, userCtrl.signup);
router.post('/login', limit, userCtrl.login);

//Export des routes
module.exports = router;