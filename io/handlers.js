const io = require('inquirer');

const db = require('../db');

const { getChoices } = require('./helpers');

const viewAllDepartments = () => {
  return db.getAllDepartments().then(([rows]) => console.table(rows));
};

const addDepartment = () => {
  return io
    .prompt([
      {
        name: 'name',
        message: 'What is the new department called?',
      },
    ])
    .then((department) => db.addDepartment(department));
};

const deleteDepartment = () => {
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
};

module.exports = { viewAllDepartments, addDepartment, deleteDepartment };
