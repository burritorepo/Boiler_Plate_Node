// Module dependencies
const express = require('express');

// Middlewares
const checkToken = require('../../Authentication');

// Services
const authService = require('../../services/auth');

let router = express.Router();

router.post('/sign-in', function (req,res) {
    authService.signIn(req,res);
    console.log(authService.signIn);
console.log('request login');}
    );

router.get('/sign-up', (req, res) => {
    res.json({
        msg: 'Hola'
    })
});

module.exports = router;
