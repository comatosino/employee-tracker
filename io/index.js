const { prompt, Separator } = require('inquirer');

const {
  VIEW_ALL_DEPARTMENTS,
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT,
} = require('./constants');

const {
  viewAllDepartments,
  addDepartment,
  deleteDepartment,
} = require('./handlers');

const db = require('../db');

const handleMain = (response) => {
  switch (response) {
    case VIEW_ALL_DEPARTMENTS:
      return viewAllDepartments().then(() => main());

    case ADD_DEPARTMENT:
      return addDepartment().then(() => main());

    case DELETE_DEPARTMENT:
      return deleteDepartment().then(() => main());

    default:
      return db.end(() => console.log('exiting application...\ngoodbye!'));
  }
};

const main = () => {
  prompt([
    {
      type: 'list',
      name: 'response',
      message: 'What would you like to do?',
      choices: [
        new Separator('--- Departments ---'),
        {
          name: 'View all departments',
          value: VIEW_ALL_DEPARTMENTS,
        },
        {
          name: 'Add a department',
          value: ADD_DEPARTMENT,
        },
        {
          name: 'Delete a department',
          value: DELETE_DEPARTMENT,
        },
        new Separator('--- Quit ---'),
        {
          name: 'Quit',
          value: QUIT,
        },
      ],
    },
  ])
    .then(({ response }) => handleMain(response))
    .catch((error) => db.end(() => console.error(error.message)));
};

module.exports = main;
