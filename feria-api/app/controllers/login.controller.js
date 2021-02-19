const db = require("../models/");
const Administrador = db.administradores;
const Artesano = db.artesanos;
var config = require('../config/config');
var jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const correo = req.body.correo;
    const password = req.body.password;

    Administrador.findOne({
            attributes: { exclude: ['admin_pwd'] },
            where: {
                admin_correo: correo,
                admin_pwd: password
            }
        })
        .then(data => {
            if (data != null) {
                data.dataValues.tipo = 'Administrador';
                let token = jwt.sign(data.dataValues, config.secret, { expiresIn: config.tokenExpiration });
                res.send({ token: token, status: 'OK' });
            } else {
                Artesano.findOne({
                        attributes: { exclude: ['art_pwd'] },
                        where: {
                            art_correo: correo,
                            art_pwd: password
                        }
                    })
                    .then(data => {
                        if (data != null) {
                            data.dataValues.tipo = 'Artesano';
                            const token = jwt.sign(data.dataValues, config.secret, { expiresIn: config.tokenExpiration });
                            res.send({ token: token, status: 'OK' });
                        } else {
                            res.status(404).send({
                                message: "Correo o contraseña no válido."
                            });
                        }
                    })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};