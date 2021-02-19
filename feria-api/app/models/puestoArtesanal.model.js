module.exports = (sequelize, Sequelize) => {
    const PuestoArtesanal = sequelize.define("puesto_artesanal", {
        pArt_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        feria_id: {
            type: Sequelize.INTEGER
        },
        art_id: {
            type: Sequelize.INTEGER
        },
        tec_id: {
            type: Sequelize.INTEGER
        },
        pArt_nombre: {
            type: Sequelize.STRING(50)
        },
        pArt_descrip: {
            type: Sequelize.STRING(250)
        },
        pArt_logo: {
            type: Sequelize.STRING(200),
        },
        pArt_std: {
            type: Sequelize.TINYINT,
        },
        pArt_ubicacion: {
            type: Sequelize.STRING
        },

    }, {
        tableName: "puesto_artesanal"
    });

    return PuestoArtesanal;
};