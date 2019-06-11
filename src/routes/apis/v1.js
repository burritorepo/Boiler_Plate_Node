// Module dependencies
const express = require('express');

// Models

// Controllers
const userController = require('../../controllers/users');

const ApiController = () => {
    let router = express.Router();

    // Register api routes
    router.use('/users', userController);
    router.use('/drivers', driverController);

    return router;
};

module.exports = ApiController;