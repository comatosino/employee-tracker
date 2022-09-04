const { prompt } = require('inquirer');

const db = require('../db');

const { getChoices } = require('./helpers');

const viewAllDepartments = () => {
  return db.getAllDepartments().then(([rows]) => console.table(rows));
};

const addDepartment = () => {
  return prompt([
    {
      name: 'name',
      message: 'What is the new department called?',
    },
  ]).then((department) => db.addDepartment(department));
};

const deleteDepartment = () => {
  return (
    db
      // grab table data
      .getAllDepartments()

      // generate prompt choices
      .then(([depts]) => getChoices(depts))

      // prompt with choices
      .then((choices) =>
        prompt([
          {
            name: 'id',
            message: 'Which department would you like to delete?',
            type: 'list',
            choices,
          },
        ])
      )
      // query database
      .then(({ id }) => db.deleteDepartment(id))
  );
};

module.exports = { viewAllDepartments, addDepartment, deleteDepartment };
