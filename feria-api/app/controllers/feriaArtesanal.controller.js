const db = require("../models");
const FeriaArtesanal = db.feriasArtesanales;
const Op = db.Sequelize.Op;

// Create and Save a new puesto Artesanal
exports.create = (req, res) => {
    // Validate request
    //req.body -> contenido de la petición 
    //req.params -> parametros de la url -> se establece en la ruta /:algo/:otroparametro
    //req.query-> saca url condicion? nombre variable = algo
    //if (!req.body.pArt_id) {
    /*    res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }*/

    // Create a puesto Artesanal
    const feriaArtesanal = {
        admin_id: '1',//req.body.admin_id,
        feria_nombre: req.body.feria_nombre,
        feria_descrip: req.body.feria_descrip,
        feria_std: '0',
    };

    // Guardar en la bd un Feria Artesanal
    FeriaArtesanal.create(feriaArtesanal)
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
    //const nombre = req.query.feria_nombre;
    // var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    //FeriaArtesanal.findAll({ where: condition })

    FeriaArtesanal.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error desconocido"
            });
        });
};

// Find a single Feria Artesanal with an id
exports.findOne = (req, res) => {
    const feriaId = req.params.feria_id;

    FeriaArtesanal.findByPk(feriaId)
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
                message: "Error al retornar Feria Artesanal."
            });
        });
};

// Update a Feria Artesanal by the id in the request
exports.update = (req, res) => {
    const feriaId = req.params.feria_id;

    FeriaArtesanal.update(req.body, {
            where: { feria_id: feriaId }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Feria Artesanal actualizado."
                });
            } else {
                res.send({
                    message: `id=${feriaId} no existe.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({ //revisar errores

                message: "Error al actualizar"
            });
        });
};

// Delete a Feria Artesanal with the specified id in the request
exports.delete = (req, res) => {
    const feriaId = req.params.feria_id;

    FeriaArtesanal.destroy({
            where: { feria_id: feriaId }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Feria Artesanal eliminado"
                });
            } else {
                res.send({
                    message: `id=${feriaId} no existe`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error al eliminar el Feria Artesanal"
            });
        });
};