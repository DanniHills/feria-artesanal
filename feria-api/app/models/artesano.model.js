module.exports = (sequelize, Sequelize) => {
    const Artesano = sequelize.define("artesano", {
        art_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        art_nombre: {
            type: Sequelize.STRING(50)
        },
        art_apellido: {
            type: Sequelize.STRING(50)
        },
        art_rut: {
            type: Sequelize.STRING,
               indexes: [{unique: true, fields: ['art_rut']}],  
        },
        art_fono: {
            type: Sequelize.INTEGER,
            validate: {
                isNumeric: true
            }
        },
        art_correo: {
            type: Sequelize.TEXT,
        indexes: [{unique: {    
            args: true,    
            msg: 'Correo ya está registrado en la base de datos',
        }, fields: ['art_correo']}],  
        
	    validate: {
                isEmail: true,
                notEmpty: { msg: "Falta ingresar correo" }
            }
        },
        art_pwd: {
            type: Sequelize.TEXT,
            validate: {
                notEmpty: { msg: "Falta contraseña" }
            }
        },
        art_std: {
            type: Sequelize.TINYINT(2),
            defaultValue: true
        }
    }, {
        tableName: "artesano"
    });
    return Artesano;
};