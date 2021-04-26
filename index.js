const mysql = require('mysql');       // for interacting with db
const inquirer = require('inquirer'); // for managing user input

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_tracker_db',
});

const mainMenuQuestions = [
    {
      type: 'input',
      message: 'What is your user name?',
      name: 'username',
    },
    {
      type: 'password',
      message: 'What is your password?',
      name: 'password',
    },
    {
      type: 'password',
      message: 'Re-enter password to confirm:',
      name: 'confirm',
    },
  ]




connection.connect((err) => {
    if (err) throw err;

    console.log(`connected as id ${connection.threadId}`);
    mainMenu();

    // readDepartments(); // testing
    // readRoles(); // testing
    // readEmployees(); // testing

    // addDepartment([{ // testing
    //     name: "Quality"
    // }]); 

    // addRole({ // testing
    //     /*SET*/
    //     title: "Quality Manager",
    //     salary: 110000,
    //     department_id: 5,
    // });

    // addEmployee([{ // testing
    //     /*SET*/
    //     first_name: "Robert",
    //     last_name: "Adams",
    //     role_id: 7,
    //     manager_id: null,
    // }]);

    // updateRole([ // testing
    //     {   /*SET*/
    //         role_id: 4,     
    //     },
    //     {   /*WHERE*/
    //         id: 9,
    //     },
    // ]);

    // connection.end();     // terminates connection
});

const readDepartments = async () => {
    const query = `
    SELECT name 
      FROM department
    `;

    try {

    } catch (err) {
        throw err;
    }



    connection.query(query, (err, res) => {
        if (err) throw err;

        // console.log(res);  // check out what the query looks like!
        console.table(res);   // built-in formatting
        mainMenu();
    });
};

const readRoles = () => {
    const query = `
      SELECT title AS Title, 
             salary AS Salary, 
             name AS Department 
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
        mainMenu();
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

        // console.log(res);  // check out what the query looks like!
        console.table(res);   // built-in formatting
        mainMenu();
    });
};

const addDepartment = (input) => {
    const query = `
    INSERT INTO department 
            SET ?
    `;
    connection.query(query, input, (err, res) => {
        if (err) throw err;
    });
};

const addRole = (input) => {
    const query = `
    INSERT INTO role
            SET ?
    `;
    connection.query(query, input, (err, res) => {
        if (err) throw err;
    });
};

const addEmployee = (input) => {
    const query = `
    INSERT INTO employee
            SET ?
    `;
    connection.query(query, input, (err, res) => {
        if (err) throw err;
    });
};

const updateRole = (input) => {
    const query = `
    UPDATE employee
       SET ?
     WHERE ?
    `;
    connection.query(query, input, (err, res) => {
        if (err) throw err;
    });
};

async function mainMenu() {

    const response = await inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ["View all departments", 
                  "View all roles", 
                  "View all employees",
                  "Add a department",
                  "Add a role",
                  "Add an employee",
                  "Update an employee role"
                 ]
    }]);
    // console.log(response.choice);

    switch (response.choice) {
        case "View all departments":
            readDepartments();
            break;
        case "View all roles":
            readRoles();
            break;
        case "View all employees":
            readEmployees();
            break;
        case "Add a department":
            
            break;
        case "Add a role":
            
            break;
        case "Add an employee":
            
        break; 
        case "Update an employee role":
            
            break;               
        default:
            break;
    }

}