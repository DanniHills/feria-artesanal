module.exports = (sequelize, Sequelize) => {
    const Administrador = sequelize.define("administrador", {
        admin_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        admin_nombre: {
            type: Sequelize.STRING(50)
        },
        admin_apellido: {
            type: Sequelize.STRING(50)
        },
        admin_correo: {
            type: Sequelize.TEXT,
	     indexes: [{unique: true, fields: ['admin_correo']}],  
            validate: {
                isEmail: true,
                notEmpty: { msg: "Falta ingresar correo" }
            }
        },
        admin_pwd: {
            type: Sequelize.TEXT,
            validate: {
                notEmpty: { msg: "Falta contraseña" }
            }
        },
        admin_rol: {
            type: Sequelize.TEXT
        }

    }, {
        tableName: "administrador"
    });

    return Administrador;
};