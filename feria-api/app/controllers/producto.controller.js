const db = require("../models");
const Producto = db.productos;
const PuestoArtesanal = db.puestosArtesanales;
const MaterialesProductos = db.materialesProductos;
const Artesano = db.artesanos;
const Op = db.Sequelize.Op;
var mkdirp = require('mkdirp');
var fs = require('fs');
const { materialesProductos, productos, sequelize } = require("../models");


// Create and Save a new Tutorial
exports.create = (req, res) => {

    PuestoArtesanal.findOne({
        where: {
            pArt_id: req.body.pArt_id
        }
    })
        .then( async (puesto) => {
            puesto = puesto.dataValues;

            const archivoImagen = req.files.prod_imagen;
            const archivoModelo = req.files.prod_modelo;
            // Create a Producto
            const producto = {
                pArt_id: req.body.pArt_id,
                prod_nombre: req.body.prod_nombre,
                prod_descrip: req.body.prod_descrip,
                prod_principal: req.body.prod_principal,
                prod_modelo3D: '',
                prod_imagen: '',
                prod_std: '1',
                prod_ubicacion: req.body.prod_ubicacion,
                prod_scale: req.body.prod_scale,
            };
            var materiales = req.body.mat_id;
            // Guardar en la bd un producto
            Producto.create(producto)
                .then( async (data) => {
                    console.log('prod_id ', data.dataValues.prod_id);

                    const rutaProducto = 'feria_' + puesto.feria_id + '/puesto_' + puesto.pArt_id + '/prod_' + data.dataValues.prod_id;
                    producto.prod_modelo3D = 'feria_' + puesto.feria_id + '/puesto_' + puesto.pArt_id + '/prod_' + data.dataValues.prod_id + '/' + archivoModelo.name;
                    producto.prod_imagen = 'feria_' +puesto.feria_id + '/puesto_' + puesto.pArt_id + '/prod_' + data.dataValues.prod_id + '/' + archivoImagen.name;
                    await Producto.update(producto, {
                        where: { prod_id: data.dataValues.prod_id }
                    })
                    .then(up => {

                        materiales = JSON.parse("[" + materiales + "]");
                        materiales.forEach( async (mat_id) => {
                            const matprod = {
                                mat_id: mat_id,
                                prod_id: data.dataValues.prod_id
                            }
                            await MaterialesProductos.create(matprod)
                                .then(response => {
                                    mkdirp('./uploads/' + rutaProducto).then(data => {
                                        archivoImagen.mv('./uploads/' + rutaProducto + '/' + archivoImagen.name);
                                        archivoModelo.mv('./uploads/' + rutaProducto + '/' + archivoModelo.name);
                                    });

                                });
                        });
                        res.send(data);
                    });
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

exports.detalleArtesanoMateriales = async (req, res) => {
    const prodId = req.params.prod_id;

    var prod = await sequelize.query(`SELECT p.*, a.* ` 
    + `FROM producto p, puesto_artesanal pa, artesano a ` 
    + `WHERE p.prod_id = ${prodId} AND p.pArt_id = pa.pArt_id AND a.art_id = pa.art_id`);
    
    var materiales  = await sequelize.query(`SELECT m.mat_nombre `
    + `FROM producto p, materiales_productos mp, material m ` 
    + `WHERE p.prod_id = ${prodId} AND mp.prod_id = p.prod_id AND m.mat_id = mp.mat_id`);
    prod[0][0].materiales = materiales[0];
    res.send(prod[0][0]);
}

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
exports.update = async (req, res) => {
    const prodId = req.params.prod_id;
    
    const producto = req.body;
    //comprobar si existen archivos para actualizar, si no mantener
    //const archivoImagen = req.files.prod_imagen;
    //const archivoModelo = req.files.prod_modelo;
    if(req.files){
        await PuestoArtesanal.findOne({
            where: {
                pArt_id: req.body.pArt_id
            }
        })
        .then(puesto => {
            
            puesto = puesto.dataValues;
            const rutaProducto = 'feria_' + puesto.feria_id + '/puesto_' + puesto.pArt_id + '/prod_' + prodId;
            if(req.files.prod_imagen){
                const filePath = producto.prod_imagenOld; 
                producto.prod_imagen = 'feria_' + puesto.feria_id + '/puesto_' + puesto.pArt_id + '/prod_' + prodId + '/' + req.files.prod_imagen.name;
                //subir imagen a carpeta
                console.log("actualizando imagen");
                mkdirp('./uploads/' + rutaProducto).then(data => {
                    req.files.prod_imagen.mv('./uploads/' + rutaProducto + '/' + req.files.prod_imagen.name);
                    console.log("eliminando ./uploads/" + filePath);
                    fs.unlinkSync('./uploads/' + filePath);
                });
            }

            if(req.files.prod_modelo){
                const filePath = producto.prod_modeloOld;
                producto.prod_modelo3D = 'feria_' + puesto.feria_id + '/puesto_' + puesto.pArt_id + '/prod_' + prodId + '/' + req.files.prod_modelo.name;
                //subir modelo a carpeta
                console.log("actualizando modelo");
                mkdirp('./uploads/' + rutaProducto).then(data => {
                    req.files.prod_modelo.mv('./uploads/' + rutaProducto + '/' + req.files.prod_modelo.name);
                    fs.unlinkSync('./uploads/' + filePath);
                });
            }

        });
    }

    //actualizar datos del producto
    await Producto.update(producto, {
        where: { prod_id: prodId }
    })
        .then( async (num) => {
            if (num == 1) {
                await MaterialesProductos.destroy(
                    { where: { prod_id: prodId } }).then(data => {
                         var materiales = JSON.parse("[" + req.body.materiales_productos + "]");
                        //var materiales = JSON.parse(req.body.materiales_productos);
                        if (materiales.length > 0) {
                            materiales.forEach( async (mat) => {
                                const matprod = {
                                    mat_id: mat,
                                    prod_id: prodId
                                }
                                await MaterialesProductos.create(matprod).then(() => {
                                    res.send({
                                        message: "Producto Actualizado"
                                    });
                                })

                            })
                        }else{
                            res.send({
                                message: "Producto Actualizado"
                            });
                        }
                        //console.log(req.body);
                        //res.send({
                        //    message: "Producto Actualizado"
                        //});
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