const db = require("../models");
const Tecnica = db.tecnicas;
const Op = db.Sequelize.Op;

// Create and Save a new Técnica
exports.create = (req, res) => {
    // Validate request
    //req.body -> contenido de la petición 
    //req.params -> parametros de la url -> se establece en la ruta /:algo/:otroparametro
    //req.query-> saca url condicion? nombre variable = algo
    //if (!req.body.tec_id) {
    /*    res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }*/

    // Create a Técnica
    const tecnica = {
        pArt_id: req.body.pArt_id,
        tec_nombre: req.body.tec_nombre,

    };

    // Guardar en la bd una Técnica
    Tecnica.create(tecnica)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error desconocido"
            });
        });
};

// Filtro 
exports.findAll = (req, res) => {
    //const nombre = req.query.tec_nombre;
    // var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    //Tecnica.findAll({ where: condition })

    Tecnica.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error desconocido"
            });
        });
};

// Find a single Técnica with an id
exports.findOne = (req, res) => {
    const tecId = req.params.tec_id;

    Tecnica.findByPk(tecId)
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
                message: "Error al retornar Técnica."
            });
        });
};

// Update a Técnica by the id in the request
exports.update = (req, res) => {
    const tecId = req.params.tec_id;

    Tecnica.update(req.body, {
            where: { tec_id: tecId }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Técnica actualizada."
                });
            } else {
                res.send({
                    message: `id=${tecId} no existe.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({ //revisar errores

                message: "Error al actualizar"
            });
        });
};

// Delete a Técnica with the specified id in the request
exports.delete = (req, res) => {
    const tecId = req.params.tec_id;

    Tecnica.destroy({
            where: { tec_id: tecId }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Técnica eliminada"
                });
            } else {
                res.send({
                    message: `id=${tecId} no existe`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error al eliminar la Técnica"
            });
        });
};