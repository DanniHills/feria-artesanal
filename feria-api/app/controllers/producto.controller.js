const db = require("../models");
const Producto = db.productos;
const PuestoArtesanal = db.puestosArtesanales;
const MaterialesProductos = db.materialesProductos;
const Artesano = db.artesanos;
const Op = db.Sequelize.Op;
var mkdirp = require('mkdirp');
const { materialesProductos } = require("../models");


// Create and Save a new Tutorial
exports.create = (req, res) => {

    PuestoArtesanal.findOne({
        where: {
            pArt_id: req.body.pArt_id
        }
    })
        .then(puesto => {
            puesto = puesto.dataValues;

            const archivoImagen = req.files.prod_imagen;
            const archivoModelo = req.files.prod_modelo;

            // Create a Producto
            const producto = {
                pArt_id: req.body.pArt_id,
                prod_nombre: req.body.prod_nombre,
                prod_descrip: req.body.prod_descrip,
                prod_principal: req.body.prod_principal,
                prod_modelo3D: puesto.feria_id + '/' + puesto.pArt_nombre + '/' + req.body.prod_nombre + '/' + archivoModelo.name,
                prod_imagen: puesto.feria_id + '/' + puesto.pArt_nombre + '/' + req.body.prod_nombre + '/' + archivoImagen.name,
                prod_std: '1',
                prod_ubicacion: req.body.prod_ubicacion,
                prod_scale: req.body.prod_scale,
            };
            var materiales = req.body.mat_id;
            const rutaProducto = puesto.feria_id + '/' + puesto.pArt_nombre + '/' + producto.prod_nombre;
            // Guardar en la bd un producto
            Producto.create(producto)
                .then(data => {
                    console.log('prod_id ', data.dataValues.prod_id);
                    materiales = JSON.parse("[" + materiales + "]");
                    materiales.forEach(mat_id => {
                        const matprod = {
                            mat_id: mat_id,
                            prod_id: data.dataValues.prod_id
                        }
                        MaterialesProductos.create(matprod)
                            .then(response => {
                                mkdirp('./uploads/' + rutaProducto).then(data => {
                                    archivoImagen.mv('./uploads/' + rutaProducto + '/' + archivoImagen.name);
                                    archivoModelo.mv('./uploads/' + rutaProducto + '/' + archivoModelo.name);
                                });

                            });
                    });
                    res.send(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Ocurrio un error desconocido"
                    });
                });
        });

};

// Filtro 
exports.findAll = (req, res) => {
    //const nombre = req.query.prod_nombre;
    // var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    //Producto.findAll({ where: condition })

    Producto.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error desconocido"
            });
        });
};

// Find a single producto with an id
exports.findOne = (req, res) => {
    const prodId = req.params.prod_id;
    Producto.findOne({
        where: {
            prod_id: prodId
        },
        include: [{ model: MaterialesProductos }]
    })
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
                message: "Error al retornar producto."
            });
        });
};

// Update a producto by the id in the request
exports.update = (req, res) => {
    const prodId = req.params.prod_id;
    
    Producto.update(req.body, {
        where: { prod_id: prodId }
    })
        .then(num => {
            if (num == 1) {
                MaterialesProductos.destroy(
                    { where: { prod_id: prodId } }).then(data => {
                        // var materiales = JSON.parse("[" + req.body.materiales_productos + "]");
                      /*  var materiales = JSON.parse(req.body.materiales_productos);
                        if (materiales.length > 0) {
                            materiales.forEach(mat => {
                                const matprod = {
                                    mat_id: mat,
                                    prod_id: prodId
                                }
                                MaterialesProductos.create(matprod).then(() => {
                                    res.send({
                                        message: "Producto Actualizado"
                                    });
                                })

                            })
                        }else{
                            res.send({
                                message: "Producto Actualizado"
                            });
                        }*/
                        console.log(req.body);
                        res.send({
                            message: "Producto Actualizado"
                        });
                    }
                    )
            } else {
                res.send({
                    message: `id=${prodId} no existe.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({ //revisar errores

                message: "Error al actualizar"
            });
        });
};

// Delete a producto with the specified id in the request
exports.delete = (req, res) => {
    const prodId = req.params.prod_id;

    Producto.destroy({
        where: { prod_id: prodId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Producto eliminado"
                });
            } else {
                res.send({
                    message: `id=${prodId} no existe`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error al eliminar el producto"
            });
        });
};