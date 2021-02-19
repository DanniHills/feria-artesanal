module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("producto", {
        prod_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        pArt_id: {
            type: Sequelize.INTEGER
        },
        prod_nombre: {
            type: Sequelize.STRING(50),
        },
        prod_descrip: {
            type: Sequelize.STRING(250)
        },
        prod_principal: {
            type: Sequelize.TINYINT,
        },
        prod_modelo3D: {
            type: Sequelize.STRING(250)
        },
        prod_imagen: {
            type: Sequelize.STRING(250)
        },
        prod_std: {
            type: Sequelize.TINYINT,
            defaultValue: true
        },
        prod_ubicacion: {
            type: Sequelize.STRING,
        },
        prod_scale: {
            type: Sequelize.FLOAT,   
            validate: {   
             isFloat: true,    
            }                
        }
    }, {
        tableName: "producto"
    }, );


    return Producto;
};