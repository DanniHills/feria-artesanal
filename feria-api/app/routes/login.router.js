module.exports = app => {
    const Login = require("../controllers/login.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", Login.login);

    app.use('/api/Login', router);
};