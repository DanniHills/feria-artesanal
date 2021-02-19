const db = require("../models/");
const Administrador = db.administradores;
const Op = db.Sequelize.Op;

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

    // Create a Administrador
    const administrador = {
        admin_nombre: req.body.admin_nombre,
        admin_apellido: req.body.admin_apellido,
        admin_correo: req.body.admin_correo,
        admin_pwd: req.body.admin_pwd,
    };

    // Guardar en la bd un administrador
    Administrador.create(administrador)
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
    //const nombre = req.query.admin_nombre;
    // var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    //Administrador.findAll({ where: condition })

    Administrador.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error desconocido"
            });
        });
};

// Find a single Administrador with an id
exports.findOne = (req, res) => {
    const adminId = req.params.admin_id;

    Administrador.findByPk(adminId)
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
                message: "Error al retornar administrador."
            });
        });
};

// Update a Administrador by the id in the request
exports.update = (req, res) => {
    const adminId = req.params.admin_id;

    Administrador.update(req.body, {
            where: { admin_id: adminId }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Administrador actualizado."
                });
            } else {
                res.send({
                    message: `id=${adminId} no existe.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({ //revisar errores

                message: "Error al actualizar"
            });
        });
};

// Delete a Administrador with the specified id in the request
exports.delete = (req, res) => {
    const adminId = req.params.admin_id;

    Administrador.destroy({
            where: { admin_id: adminId }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Administrador eliminado"
                });
            } else {
                res.send({
                    message: `id=${adminId} no existe`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error al eliminar el administrador"
            });
        });
};