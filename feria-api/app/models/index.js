const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.administradores = require("./administrador.model.js")(sequelize, Sequelize);
db.artesanos = require("./artesano.model.js")(sequelize, Sequelize);
db.productos = require("./producto.model.js")(sequelize, Sequelize);
db.materiales = require("./material.model.js")(sequelize, Sequelize);
db.tecnicas = require("./tecnica.model.js")(sequelize, Sequelize);
db.puestosArtesanales = require("./puestoArtesanal.model.js")(sequelize, Sequelize);
db.feriasArtesanales = require("./feriaArtesanal.model")(sequelize, Sequelize);
db.materialesProductos = require("./matProds.model")(sequelize, Sequelize);

//agregar modelos 


db.administradores.hasMany(db.feriasArtesanales, {
    foreignKey: { name: 'admin_id' }
});
db.feriasArtesanales.hasMany(db.puestosArtesanales, {
    foreignKey: { name: 'feria_id' }
});
db.tecnicas.hasMany(db.puestosArtesanales, {
    foreignKey: { name: 'tec_id' }
});

db.artesanos.hasMany(db.puestosArtesanales, {
    foreignKey: { name: 'art_id' }
});
// primera tiene muchos de la segunda.
db.puestosArtesanales.hasMany(db.productos, {
    foreignKey: { name: 'pArt_id' }
});
db.materiales.hasMany(db.materialesProductos, {
    foreignKey: { name: 'mat_id' }
});
db.productos.hasMany(db.materialesProductos, {
    foreignKey: { name: 'prod_id' }
});


module.exports = db;