const db = require("../models/");
const Artesano = db.artesanos;
const Op = db.Sequelize.Op;
const PuestosArtesanales= db.puestosArtesanales;
const Productos =db.productos;
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    //req.body -> contenido de la petición 
    //req.params -> parametros de la url -> se establece en la ruta /:algo/:otroparametro
    //req.query-> saca url condicion? nombre variable = algo
    //if (!req.body.admin_id) {
    /*    res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }*/

    // Create a artesano
    const artesano = {
        pArt_id: req.body.pArt_id,
        art_nombre: req.body.art_nombre,
        art_apellido: req.body.art_apellido,
        art_rut: req.body.art_rut,
        art_fono: req.body.art_fono,
        art_correo: req.body.art_correo,
        art_pwd: req.body.art_pwd,
        art_std: req.body.art_std,
    };

    // Guardar en la bd un artesano
    Artesano.create(artesano)
        .then(data => {
            res.send({status: 200, message: "Artesano creado correctamente.", data: data});
        })
        .catch(err => {
            res.send({
		status: 400,
                message: err.message || "Ocurrio un error desconocido"
            });
        });
};

// Filtro 
exports.findAll = (req, res) => {
    //const nombre = req.query.art_nombre;
    // var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    //Artesano.findAll({ where: condition })

    Artesano.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error desconocido"
            });
        });
};
exports.findWithArt = (req, res) => {
    const artId = req.params.art_id;

    Artesano.findAll({ where: { art_id: artId }, include : [{model: PuestosArtesanales}]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error desconocido"
            });
        });
};
exports.findAllWithArt = (req, res) => {
    Artesano.findAll({ include : [{model: PuestosArtesanales}]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error desconocido"
            });
        });
};
// Find a single artesano with an id
exports.findOne = (req, res) => {
    const artId = req.params.art_id;

    Artesano.findByPk(artId)
        .then(data => {
            console.log(data)
            if (data != null) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: "Id no existe"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error al retornar artesano."
            });
        });
};

// Update a artesano by the id in the request
exports.update = (req, res) => {
    const artId = req.params.art_id;

    Artesano.update(req.body, {
            where: { art_id: artId }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Artesano actualizado."
                });
            } else {
                res.send({
                    message: `id=${artId} no existe.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({ //revisar errores

                message: "Error al actualizar"
            });
        });
};

// Delete a Artesano with the specified id in the request
exports.delete = (req, res) => {
    const artId = req.params.art_id;

    Artesano.destroy({
            where: { art_id: artId }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Artesano eliminado"
                });
            } else {
                res.send({
                    message: `id=${artId} no existe`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error al eliminar el artesano"
            });
        });
};