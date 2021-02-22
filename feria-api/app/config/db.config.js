module.exports = {
    HOST: process.env.MYSQL_HOST || "localhost",
    USER: "root",
    PASSWORD: "feria_artesanal",
    DB: "prueba",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};