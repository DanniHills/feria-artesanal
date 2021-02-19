module.exports = app => {
    const Artesano = require("../controllers/artesano.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", Artesano.create);

    // Retrieve all Tutorials
    router.get("/", Artesano.findAll);
    // un artesano con puesto 
    router.get("/All/Art/:art_id", Artesano.findWithArt);
    router.get("/All/Art/", Artesano.findAllWithArt);
    // Retrieve all published Tutorials
    // router.get("/published", Artesano.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:art_id", Artesano.findOne);

    // Update a Tutorial with id
    router.put("/:art_id", Artesano.update);

    // Delete a Tutorial with id
    router.delete("/:art_id", Artesano.delete);

    // Delete all Tutorials
    // router.delete("/", Artesano.deleteAll);

    app.use('/api/Artesano', router);
};