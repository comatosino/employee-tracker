const mysqlConnection = require('./connection');

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  end(cb) {
    if (cb) return this.connection.end(cb);
    return this.connection.end(() => console.log('db connection closed'));
  }

  getAllDepartments() {
    return this.connection.promise().query(
      `
      SELECT id, name
      FROM department
      `
    );
  }

  addDepartment(department) {
    return this.connection.promise().query(
      `
      INSERT INTO department
      SET ?
      `,
      department
    );
  }

  deleteDepartment(id) {
    return this.connection.promise().query(
      `
      DELETE FROM department
      WHERE id = ?
      `,
      id
    );
  }

  getAllRoles() {
    return this.connection.promise().query(
      `
      SELECT role.id,
             role.title,
             role.salary,
             department.name AS department
      FROM role
      LEFT JOIN department
      ON role.department_id = department.id;
      `
    );
  }

  addRole(role) {
    return this.connection.promise().query(
      `
      INSERT INTO role
      SET ?
      `,
      role
    );
  }

  updateRoleSalary(id, salary) {
    return this.connection.promise().query(
      `
      UPDATE role
      SET ?
      WHERE ?
      `,
      [{ salary }, { id }]
    );
  }

  deleteRole(id) {
    return this.connection.promise().query(
      `
      DELETE FROM role
      WHERE id = ?
      `,
      id
    );
  }

  getAllEmployees() {
    return this.connection.promise().query(
      `
      SELECT id, CONCAT(first_name, ' ', last_name) AS name
      FROM employee
      `
    );
  }

  viewAllEmployees() {
    return this.connection.promise().query(
      `
      SELECT e.id,
             CONCAT(e.first_name, ' ', e.last_name) AS name,
             role.title AS title,
             department.name AS 'department',
             role.salary AS salary,
             CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      LEFT JOIN role
      ON e.role_id = role.id
      LEFT JOIN department
      ON role.department_id = department.id
      LEFT JOIN employee m
      ON e.manager_id = m.id;
      `
    );
  }

  getRolesAndEmployees() {
    return Promise.all([this.getAllRoles(), this.viewAllEmployees()]);
  }

  addEmployee(employee) {
    return this.connection.promise().query(
      `
      INSERT INTO employee
      SET ?
      `,
      employee
    );
  }
}

module.exports = new DB(mysqlConnection);
