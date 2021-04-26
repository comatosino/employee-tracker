const mysql = require('mysql');       // for interacting with db
const inquirer = require('inquirer'); // for managing user input

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'password',
  database: 'employee_tracker_db',
});

connection.connect((err) => {
    if (err) throw err;

    console.log(`connected as id ${connection.threadId}`);

    connection.end();     // terminates connection
});