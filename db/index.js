const mysqlConnection = require('./connection');

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  end(cb) {
    if (!cb) this.connection.end(() => console.log('db connection closed'));
    return this.connection.end(cb);
  }

  getAllDepartments() {
    return this.connection.promise().query(
      `
      SELECT id, name FROM departments
      `
    );
  }

  addDepartment(department) {
    return this.connection.promise().query(
      `
      INSERT INTO departments SET ?
      `,
      department
    );
  }

  deleteDepartment(id) {
    return this.connection.promise().query(
      `
      DELETE FROM departments WHERE id = ?
      `,
      id
    );
  }

  getAllRoles() {
    return this.connection.promise().query(
      `
      SELECT id, title, salary FROM roles
      `
    );
  }

  addRole(role) {
    return this.connection.promise().query(
      `
      INSERT INTO roles SET ?
      `,
      role
    );
  }

  updateRoleSalary(id, salary) {
    return this.connection.promise().query(
      `
      UPDATE roles SET ? WHERE ?
      `,
      [{ salary }, { id }]
    );
  }
}

module.exports = new DB(mysqlConnection);
