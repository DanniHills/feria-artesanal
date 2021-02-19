module.exports = app => {
    const FeriaArtesanal = require("../controllers/feriaArtesanal.controller");

    var router = require("express").Router();

    // Create a new feria Artesanal
    router.post("/", FeriaArtesanal.create);

    // Retrieve all feria Artesanal
    router.get("/", FeriaArtesanal.findAll);

    // Retrieve all published feria Artesanal
    // router.get("/published", FeriaArtesanal.findAllPublished);

    // Retrieve a single feria Artesanal with id
    router.get("/:feria_id", FeriaArtesanal.findOne);

    // Update a feria Artesanal with id
    router.put("/:feria_id", FeriaArtesanal.update);

    // Delete a feria Artesanal with id
    router.delete("/:feria_id", FeriaArtesanal.delete);

    // Delete all Feria Artesanal
    // router.delete("/", FeriaArtesanal.deleteAll);

    app.use('/api/FeriaArtesanal', router);
};