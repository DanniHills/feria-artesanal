const { productos } = require("../models");
const db = require("../models");
const PuestoArtesanal = db.puestosArtesanales;
const Op = db.Sequelize.Op;
const Productos = db.productos;
const Artesanos = db.artesanos;
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
    const puestoArtesanal = {
        pArt_id: req.body.pArt_id,
        feria_id: req.body.feria_id,
        art_id: req.body.art_id,
        tec_id: req.body.tec_id,
        pArt_nombre: req.body.pArt_nombre,
        pArt_descrip: req.body.pArt_descrip,
        pArt_logo: req.body.pArt_logo,
        pArt_std: req.body.pArt_std,
        pArt_ubicacion: req.body.tec_id

    };

    // Guardar en la bd un puesto Artesanal
    PuestoArtesanal.create(puestoArtesanal)
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
    //const nombre = req.query.pArt_nombre;
    // var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    //PuestoArtesanal.findAll({ where: condition })

    PuestoArtesanal.findAll({include: [{model :Productos }],order:[['pArt_ubicacion', 'ASC'],[Productos,'prod_ubicacion','ASC']]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error desconocido"
            });
        });
};

exports.getPuestosArtesanoId = (req, res) => {
    //const nombre = req.query.pArt_nombre;
    // var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    //PuestoArtesanal.findAll({ where: condition })
    const art_id = req.params.art_id;
    PuestoArtesanal.findAll({ where: {art_id: art_id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error desconocido"
            });
        });
};

// agregar where con id para puesto de manera individual
exports.findAllWithProd = (req, res) => {
    //const nombre = req.query.pArt_nombre;
    // var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    //PuestoArtesanal.findAll({ where: condition })
    const pArtId = req.params.pArt_id;
    PuestoArtesanal.findOne({  where: { pArt_id: pArtId }, include: [{model :Productos  }],order:[[Productos,'prod_ubicacion','ASC']]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error desconocido"
            });
        });
};



// Find a single puesto Artesanal with an id
exports.findOne = (req, res) => {
    const pArtId = req.params.pArt_id;

    PuestoArtesanal.findByPk(pArtId)
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
                message: "Error al retornar Puesto Artesanal."
            });
        });
};
// Update a puesto Artesanal by the id in the request
exports.update = (req, res) => {
    const pArtId = req.params.pArt_id;

    PuestoArtesanal.update(req.body, {
            where: { pArt_id: pArtId }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Puesto Artesanal actualizado."
                });
            } else {
                res.send({
                    message: `id=${pArtId} no existe.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({ //revisar errores

                message: "Error al actualizar"
            });
        });
};

exports.ubicacionTecnicas = async (req, res) => {
    console.log("\n\n\n");
    let ubicaciones = req.body;
    PuestoArtesanal.findAll().then(puestos => {
        ubicaciones.forEach((ubicacion, index) => {
            puestos.forEach(puesto => {
            puesto = puesto.dataValues;
                if(puesto.tec_id === ubicacion){
                    puesto.pArt_ubicacion = index + 1;
                    PuestoArtesanal.update(puesto, {
                        where: { pArt_id: puesto.pArt_id }
                    });
                }
            });
        });
    });
    res.send({status:'Ok'});
}
//puestos ordenados por ubicacion
exports.ordenUbicacion = (req,res)=>{
    PuestoArtesanal.findAll({ order:[['pArt_ubicacion', 'ASC']] } )
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrio un error desconocido"
        });
    });
}
// Delete a Puesto Artesanal with the specified id in the request
exports.delete = (req, res) => {
    const pArtId = req.params.pArt_id;

    PuestoArtesanal.destroy({
            where: { pArt_id: pArtId }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Puesto Artesanal eliminado"
                });
            } else {
                res.send({
                    message: `id=${pArtId} no existe`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error al eliminar el Puesto Artesanal"
            });
        });
};