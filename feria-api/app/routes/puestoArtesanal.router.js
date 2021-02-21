module.exports = app => {
    const PuestoArtesanal = require("../controllers/puestoArtesanal.controller");

    var router = require("express").Router();

    // Create a new Puesto Artesanal
    router.post("/", PuestoArtesanal.create);

    // Retrieve all Puesto Artesanal
    router.get("/getProductos/", PuestoArtesanal.findAll);
    router.get("/getProductos/:pArt_id", PuestoArtesanal.findAllWithProd);

    // Retrieve all published Puesto Artesanal
    // router.get("/published", PuestoArtesanal.findAllPublished);

    // Retrieve a single Puesto Artesanal with id
    //router.get("/:pArt_id", PuestoArtesanal.findOne);

    // Update a Puesto Artesanal with id
    router.put("/:pArt_id", PuestoArtesanal.update);

    // Delete a Puesto Artesanal with id
    router.delete("/:pArt_id", PuestoArtesanal.delete);


    // Delete all Puesto Artesanal
    // router.delete("/", PuestoArtesanal.deleteAll);

    app.use('/api/PuestoArtesanal', router);
};