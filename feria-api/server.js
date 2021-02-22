const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const app = express();

var corsOptions = {
    origin: "*"
};
app.use(fileUpload());
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models/");

// sincroniza BD, crea la tabla si no existe.
db.sequelize.sync({
    alter: true // chekear tabla para ver modificaciones 
    //force: true
});
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Bienvenidos " });
});

require("./app/routes/administrador.router")(app);
require("./app/routes/artesano.router")(app);
require("./app/routes/producto.router")(app);
require("./app/routes/material.router")(app);
require("./app/routes/tecnica.router")(app);
require("./app/routes/puestoArtesanal.router")(app);
require("./app/routes/feriaArtesanal.router")(app);
require("./app/routes/login.router")(app);
// set port, listen for requests
const PORT = 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});