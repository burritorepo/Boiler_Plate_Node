// Module dependencies
const express = require('express');

// Middlewares
const checkToken = require('../../Authentication');

// Services
const authService = require('../../services/auth');

let router = express.Router();

router.post('/sign-in', authService.signIn);

router.get('/sign-up', (req, res) => {
    res.json({
        msg: 'Hola'
    })
});

module.exports = router;
