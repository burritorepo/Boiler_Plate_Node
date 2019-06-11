const config = require('../../../configs/config/index');
const db = require('../../../configs/db');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');


const connection = mysql.createConnection(db.connection);

const login = async (req, res) => {
  try {
    let username = await req.body.username;
    let password = await req.body.password;
   
    console.log('inside login',password);

    if (username && password) {
      console.log('results', username);
      connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?',
        [username, password], function (error, results, fields) {
          console.log('results', results);
          if (results.length > 0) {

            let token = jwt.sign({ username: username }, config.JWT.secret, {
              expiresIn: config.JWT.expiresIn
            });

            res.json({
              user: {
                success: true,
                message: 'Authentication successful!',
                id: results[0].id,
                username: results[0].username,
                email: results[0].email
              },
              token: token
            });
          } else {
            res.status(403).send({
              msg: 'Usuario o contraseña incorrectos'
            });
          }
        })
    };
  }
  
  catch (error) {
    return res.status(500).json({
      'code': 'SERVER_ERROR',
      'description': 'something went wrong, Please try again'
    });
  }
};

module.exports = login;