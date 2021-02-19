module.exports = (sequelize, Sequelize) => {
    const Material = sequelize.define("material", {
        mat_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        mat_nombre: {
            type: Sequelize.ENUM('Piedra', 'Lana', 'Totora', 'Arcilla', 'greda', 'madera', 'mimbre', 'cobre', 'algodon', 'paja', 'crin'),
            indexes: [{unique: true, fields: ['mat_nombre']}],  
	    validate: {
                max: 11,
            }
        }
    }, {
        tableName: "material"
    });

    return Material;
};