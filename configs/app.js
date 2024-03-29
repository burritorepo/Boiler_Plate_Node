/* -------------------------------------------
                 MODULE DEPENDENCIES
  ---------------------------------------------     
*/

const express = require('express');
const mysql = require('mysql');
const mongoose = require('mongoose');
const morgan = require('morgan');

module.exports = function () {
    let server = express(),
        create,
        start;

    // To run socket.io within the same HTTP server instance.
    const serverIO = require('http').createServer(server);
    const io = require('socket.io')(serverIO);

    create = (config, db) => {
        let routes = require('../src/routes');
        console.log(routes);
        // set all the server settings
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);

        // add middleware to parse the json
        server.use(express.json());
        server.use(express.urlencoded({
            extended: false
        }));

        // Add middleware to log client's requests
        server.use(morgan('dev'));

        // add middleware to include socket.io in our response, and use it in a different file
        server.use(function (req, res, next) {
            res.io = io;
            next();
        });

        //connect the database
        const connection = mysql.createConnection(db.connection);
        connection.connect();
        
        global.db = connection;
        /*  mongoose.connect(
             db.database,
             { 
                 useNewUrlParser: true,
                 useCreateIndex: true
             }
         ); */

        // Set up routes
        routes(server);
    };

    start = () => {
        let hostname = server.get('hostname'),
            port = server.get('port');
        // Socket io

        serverIO.listen(port, function () {
            console.log(`Express server listening on - http://${hostname}:${port}`);
        });
    };
    return {
        create: create,
        start: start
    };
};
