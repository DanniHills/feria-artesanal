module.exports = app => {
    const Material = require("../controllers/material.controller.js");

    var router = require("express").Router();

    // Create a new Material
    router.post("/", Material.create);

    // Retrieve all Material
    router.get("/", Material.findAll);

    // Retrieve all published Material
    // router.get("/published", Material.findAllPublished);

    // Retrieve a single Material with id
    router.get("/:mat_id", Material.findOne);

    // Update a Material with id
    router.put("/:mat_id", Material.update);

    // Delete a Material with id
    router.delete("/:mat_id", Material.delete);

    // Delete all Material
    // router.delete("/", Material.deleteAll);

    app.use('/api/Material', router);
};