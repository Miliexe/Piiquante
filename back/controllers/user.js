//Import des modules
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const parseSalt = parseInt(process.env.SALT);

//Inscription
exports.signup = (req, res, next) => {
    //Saltage et Hashage du mot de passe
    bcrypt.genSalt(parseSalt)
        .then(salt => {
            bcrypt.hash(req.body.password, salt)
                .then(hash => {
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    });
                    //Création de l'utilisateur
                    user.save()
                        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                        .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        }
        )
}

//Connection
exports.login = (req, res, next) => {
    //Contrôle de l'utilisateur
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
            }
            //Contrôle de la paire login/password
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    //Génération du token
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            `'${process.env.TOKEN}'`,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
