module.exports = (sequelize, Sequelize) => {
    const MaterialesProductos = sequelize.define("materiales_productos", {
        mp_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mat_id: {
            type: Sequelize.INTEGER,
        },
        prod_id: {
            type: Sequelize.INTEGER,
            
        }
    }, {
        tableName: "materiales_productos"
    });

    return MaterialesProductos;
};