module.exports = app => {
    const Administrador = require("../controllers/administrador.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", Administrador.create);

    // Retrieve all Tutorials
    router.get("/", Administrador.findAll);

    // Retrieve all published Tutorials
    // router.get("/published", Administrador.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:admin_id", Administrador.findOne);

    // Update a Tutorial with id
    router.put("/:admin_id", Administrador.update);

    // Delete a Tutorial with id
    router.delete("/:admin_id", Administrador.delete);

    // Delete all Tutorials
    // router.delete("/", Administrador.deleteAll);

    app.use('/api/Administrador', router);
};