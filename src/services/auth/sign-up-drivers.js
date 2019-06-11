const db = require('../../../configs/db');
const mysql = require('mysql');
const connection = mysql.createConnection(db.connection);

const signUpDrivers = async (req, res) => {
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?');
}

module.exports = signUpDrivers;