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
    mainMenu();
});

const readDepartments = () => {
    const query = `
    SELECT name AS Name
      FROM department
    `;

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
       SELECT e.id AS 'Employee ID', 
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

const addDepartment = async () => {

    // get name of new dept from user
    const newDept = await inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: 'What is the name of the new department?',
    }]);

    // save value to obj for placeholer
    values = {
        name: newDept.name
    }

    //query db
    connection.query("INSERT INTO department SET ?", values, (err, res) => {
        if (err) throw err;
        mainMenu();
    });
};

const addRole = () => {

    connection.query("SELECT id, name FROM department", async (err, deptList) => {
        if (err) throw err;

        // create object from query results that follow {department name: department id}
        const deptObj = {};
        for (let i = 0; i < deptList.length; i++) {
            const row = deptList[i];
            deptObj[row.name] = row.id;
        }

        // get dept, name, salary of new role from user
        const newRole = await inquirer.prompt([
            {
                name: 'roleTitle',
                type: 'input',
                message: 'What is the title of the new role?',
            },
            {
                name: 'roleSalary',
                type: 'input',
                message: 'What is the salary of the new role?',
            },
            {
                name: 'roleDept',
                type: 'list',
                message: 'What department does this role belong to?',
                choices: Object.keys(deptObj)
            },
        ]);

        // save user responses to object for placeholder
        const values = {
            title: newRole.roleTitle,
            salary: newRole.roleSalary,
            department_id: deptObj[newRole.roleDept],
        }

        // add new role to db table
        connection.query("INSERT INTO role SET ?", values, (err, res) => {
            if (err) throw err;
            mainMenu();
        });
    });
};

const addEmployee = () => {

    // query list of roles to retrieve id and title
    connection.query("SELECT role.id, title FROM role", async (err, roleList) => {
        if (err) throw err;

        // create object to store roles and their ids
        const roleObj = {"No Role": null};
        for (let i = 0; i < roleList.length; i++) {
            const row = roleList[i];
            roleObj[row.title] = row.id;
        }

        // prompt user for input
        const newEmp = await inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: "What is the employee's first name?",
            },
            {
                name: 'lastName',
                type: 'input',
                message: "What is the employee's first name?",
            },
            {
                name: 'empRole',
                type: 'list',
                message: "What is this employee's role?",
                choices: Object.keys(roleObj)
            },
        ]);

        // query list of employees to select manager
        connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS 'name' FROM employee", async (err, empList) => {
            if (err) throw err;

            const empObj = {"No Manager": null};
            for (let i = 0; i < empList.length; i++) {
                const row = empList[i];
                empObj[row.name] = row.id;
            }

            // prompt user for manager
            const manager = await inquirer.prompt([{
                name: 'name',
                type: 'list',
                message: "Who is this employee's manager?",
                choices: Object.keys(empObj)
            }]);

            // save user responses to object for placeholder
            const values = {
                first_name: newEmp.firstName,
                last_name: newEmp.lastName,
                role_id: roleObj[newEmp.empRole], 
                manager_id: empObj[manager.name],
            };

            // add new employee to db table
            connection.query("INSERT INTO employee SET ?", values, (err, res) => {
                if (err) throw err;
                mainMenu();
            });
        });
    });
};

const updateRole = () => {
    
    // need to get emps
    connection.query("SELECT id, CONCAT(first_name, ' ', last_name) AS 'name' FROM employee", async (err, empList) => {
        if (err) throw err;

        const empObj = {};
        for (let i = 0; i < empList.length; i++) {
            const row = empList[i];
            empObj[row.name] = row.id;
        }

        const employee = await inquirer.prompt([{
            name: 'name',
            type: 'list',
            message: "Whose role is to be updated?",
            choices: Object.keys(empObj)
        }]);

        // need to get roles
        connection.query("SELECT role.id, title FROM role", async (err, roleList) => {
            if (err) throw err;

            // create object to store roles and their ids
            const roleObj = {};
            for (let i = 0; i < roleList.length; i++) {
                const row = roleList[i];
                roleObj[row.title] = row.id;
            }

            const role = await inquirer.prompt([{
                name: 'name',
                type: 'list',
                message: "What is this employee's new role?",
                choices: Object.keys(roleObj)
            }]);

            const values = [
                {
                    role_id: roleObj[role.name],  
                },
                {
                    id: empObj[employee.name],
                },
            ]
            
            // update db table
            connection.query("UPDATE employee SET ? WHERE ?", values, (err, res) => {
                if (err) throw err;
                mainMenu();
            });
        });
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
                  "Update an employee role",
                  "Exit the application",
                 ]
    }]);

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
            addDepartment();
            break;
        case "Add a role":
            addRole();
            break;
        case "Add an employee":
            addEmployee();
            break; 
        case "Update an employee role":
            updateRole();
            break;               
        default:
            connection.end();
            break;
    }
}