const mysql = require('mysql2');
const config = require('./config');

const connection = mysql.createConnection(config);

connection.connect((error) => {
  if (error) throw error;
});

module.exports = connection;
