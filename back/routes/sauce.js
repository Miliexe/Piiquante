//Import des modules
const express = require('express');
const router = express.Router();

//Import des contrôleurs
const sauceCtrl = require('../controllers/sauce');

//Import des middlewares
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const limit = require('../middleware/limit');

//Routage
router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', limit, auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', limit, auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

//Export des routes
module.exports = router;