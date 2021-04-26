const mysql = require('mysql');       // for interacting with db
const inquirer = require('inquirer'); // for managing user input

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employee_tracker_db',
});

connection.connect((err) => {
    if (err) throw err;

    // console.log(`connected as id ${connection.threadId}`);

    readDepartments();
    readRoles();
    readEmployees();

    connection.end();     // terminates connection
});

const readDepartments = () => {
    const query = `
    SELECT name 
      FROM department
    `;

    connection.query(query, (err, res) => {
        if (err) throw err;

        // res => "result"
        // query returns a javaScript object
        // console.log(res);     // check out what the query looks like!
        console.table(res);   // built-in formatting
        
        });
};

const readRoles = () => {
    const query = `
      SELECT title AS Title, salary AS Salary, name AS Department 
        FROM role
        JOIN department 
          ON role.department_id = department.id
    ORDER BY department
    `;

    connection.query(query, (err, res) => {

        if (err) throw err;

        // res => "result"
        // query returns a javaScript object
        // console.log(res);     // check out what the query looks like!
        console.table(res);   // built-in formatting

    });
};

const readEmployees = () => {
    const query = `
       SELECT e.id AS 'ID', 
              CONCAT(e.first_name, ' ', e.last_name) AS 'Employee',
              role.title AS 'Title', 
              department.name AS 'Department', 
              role.salary AS 'Salary', 
              CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
         FROM employee e 
    LEFT JOIN role 
           ON e.role_id = role.id
    LEFT JOIN department 
           ON role.department_id = department.id
    LEFT JOIN employee m 
           ON e.manager_id = m.id;
    `;

    connection.query(query, (err, res) => {
        if (err) throw err;

        // res => "result"
        // query returns a javaScript object
        // console.log(res);     // check out what the query looks like!
        console.table(res);   // built-in formatting

    });
};