module.exports = (sequelize, Sequelize) => {
    const Tecnica = sequelize.define("tecnica", {
        tec_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tec_nombre: {
            type: Sequelize.ENUM('Tallado', 'Cesteria', 'Modelado', 'Orfebreria', 'trenzado', 'Tejido'),
            indexes: [{unique: true, fields: ['tec_nombre']}],  
            validate: {
                max: 6,
            }
        }
    }, {
        tableName: "tecnica"
    });

    return Tecnica;
};