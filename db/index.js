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
      SELECT * FROM departments
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
}

module.exports = new DB(mysqlConnection);
