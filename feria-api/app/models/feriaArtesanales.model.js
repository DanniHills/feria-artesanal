module.exports = (sequelize, Sequelize) => {
    const FeriaArtesanal = sequelize.define("feria_artesanal", {
        feria_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        admin_id: {
            type: Sequelize.INTEGER
        },
        feria_nombre: {
            type: Sequelize.STRING(50)
        },
        feria_descrip: {
            type: Sequelize.STRING(250)
        },
        feria_std: {
            type: Sequelize.INTEGER
                    }
    }, {
        tableName: "feria_artesanal"
    });

    return FeriaArtesanal;
};