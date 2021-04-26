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

    readDepartments();
    readRoles();
    readEmployees();

    connection.end();     // terminates connection
});

const readDepartments = () => {

    const query = `
    SELECT name 
    FROM department`;

    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);   // check out what the query looks like!
    });
};

const readRoles = () => {

    const query = `
    SELECT title AS Title, salary AS Salary, name AS Department 
    FROM role
    JOIN department ON role.department_id = department.id
    ORDER BY department`;

    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);   // check out what the query looks like!
    });
};

const readEmployees = () => {
    const query = `
    SELECT 
        e.id, e.first_name, e.last_name,
        role.title, department.name, role.salary, 
        CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
    FROM employee e
        INNER JOIN role ON e.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON e.manager_id = m.id`;

    connection.query(query, (err, res) => {
        if (err) throw err;

        console.table(res);   // check out what the query looks like!


    });
};