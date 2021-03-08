module.exports = app => {
    const Producto = require("../controllers/producto.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", Producto.create);

    // Retrieve all Tutorials
    router.get("/", Producto.findAll);

    // Retrieve all published Tutorials
    // router.get("/published", Producto.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:prod_id", Producto.findOne);
    router.get("/Artesano/:art_id", Producto.getProductosArtesano);
    // Update a Tutorial with id
    router.get("/detalleArtesanoMateriales/:prod_id", Producto.detalleArtesanoMateriales);
    router.get("/orden/", Producto.findAll);
    router.put("/:prod_id", Producto.update);
    router.post("/ubicacion", Producto.ubicacionProductos);
    // Delete a Tutorial with id
    router.delete("/:prod_id", Producto.delete);

    // Delete all Tutorials
    // router.delete("/", Producto.deleteAll);

    app.use('/api/Producto', router);
};