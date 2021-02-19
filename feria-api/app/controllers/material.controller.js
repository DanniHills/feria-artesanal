const db = require("../models");
const Material = db.materiales;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    //req.body -> contenido de la petición 
    //req.params -> parametros de la url -> se establece en la ruta /:algo/:otroparametro
    //req.query-> saca url condicion? nombre variable = algo
    //if (!req.body.mat_id) {
    /*    res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }*/

    // Create a Material
    const material = {
        mat_nombre: req.body.mat_nombre,

    };

    // Guardar en la bd un Material
    Material.create(material)
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
    //const nombre = req.query.mat_nombre;
    // var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    //Material.findAll({ where: condition })

    Material.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error desconocido"
            });
        });
};

// Find a single Material with an id
exports.findOne = (req, res) => {
    const matId = req.params.mat_id;

    Material.findByPk(matId)
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
                message: "Error al retornar Material."
            });
        });
};

// Update a Material by the id in the request
exports.update = (req, res) => {
    const matId = req.params.mat_id;

    Material.update(req.body, {
            where: { mat_id: matId }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Material actualizado."
                });
            } else {
                res.send({
                    message: `id=${matId} no existe.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({ //revisar errores

                message: "Error al actualizar"
            });
        });
};

// Delete a Material with the specified id in the request
exports.delete = (req, res) => {
    const matId = req.params.mat_id;

    Material.destroy({
            where: { mat_id: matId }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Material eliminado"
                });
            } else {
                res.send({
                    message: `id=${matId} no existe`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error al eliminar el Material"
            });
        });
};