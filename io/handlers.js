const io = require('inquirer');

const db = require('../db');

const { getChoices } = require('./helpers');

module.exports = {
  viewAllDepartments: () => {
    return db.getAllDepartments().then(([rows]) => console.table(rows));
  },

  addDepartment: () => {
    return io
      .prompt([
        {
          name: 'name',
          message: 'What is the new department called?',
        },
      ])
      .then((department) => db.addDepartment(department));
  },

  deleteDepartment: () => {
    return db
      .getAllDepartments()
      .then(getChoices)
      .then((choices) =>
        io.prompt([
          {
            name: 'id',
            message: 'Which department would you like to delete?',
            type: 'list',
            choices,
          },
        ])
      )
      .then(({ id }) => db.deleteDepartment(id));
  },

  viewAllRoles: () => {
    return db.getAllRoles().then(([rows]) => console.table(rows));
  },

  addRole: () => {
    return db
      .getAllDepartments()
      .then(getChoices)
      .then((choices) =>
        io.prompt([
          {
            name: 'title',
            message: 'What is the title of the new role?',
          },
          {
            name: 'salary',
            message: "What is this role's salary?",
          },
          {
            name: 'department_id',
            message: 'Which department does this role belong to?',
            type: 'list',
            choices,
          },
        ])
      )
      .then((role) => db.addRole(role));
  },

  updateRoleSalary: () => {
    return db
      .getAllRoles()
      .then(getChoices)
      .then((choices) =>
        io.prompt([
          {
            name: 'id',
            message: 'Which role would you like to update?',
            type: 'list',
            choices,
          },
          {
            name: 'salary',
            message: 'What is the new salary?',
          },
        ])
      )
      .then(({ id, salary }) => db.updateRoleSalary(id, salary));
  },

  deleteRole: () => {
    return db
      .getAllRoles()
      .then(getChoices)
      .then((choices) =>
        io.prompt([
          {
            name: 'id',
            message:
              'Which role should be deleted? \n(Warning: this will also delete any employees with this role)',
            type: 'list',
            choices,
          },
        ])
      )
      .then(({ id }) => db.deleteRole(id));
  },
};
