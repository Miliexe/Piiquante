//Import des modules
const multer = require('multer');

//Init des types d'images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Stockage des images
const storage = multer.diskStorage({
  //Dossier de stockage
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  //Renommage des fichiers
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

//Export du middleware
module.exports = multer({storage: storage}).single('image');