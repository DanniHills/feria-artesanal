module.exports = app => {
    const Tecnica = require("../controllers/tecnica.controller.js");

    var router = require("express").Router();

    // Create a new Tecnica
    router.post("/", Tecnica.create);

    // Retrieve all Tecnica
    router.get("/", Tecnica.findAll);

    // Retrieve all published Tecnica
    // router.get("/published", Tecnica.findAllPublished);

    // Retrieve a single Tecnica with id
    router.get("/:tec_id", Tecnica.findOne);

    // Update a Tecnica with id
    router.put("/:tec_id", Tecnica.update);

    // Delete a Tecnica with id
    router.delete("/:tec_id", Tecnica.delete);

    // Delete all Tecnica
    // router.delete("/", Tecnica.deleteAll);

    app.use('/api/Tecnica', router);
};