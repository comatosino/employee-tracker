require('dotenv').config();
require('console.table');

const { prompt, Separator } = require('inquirer');

const {
  VIEW_ALL_DEPARTMENTS,
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT,
} = require('./io/constants');

const {
  viewAllDepartments,
  addDepartment,
  deleteDepartment,
} = require('./io/handlers');

const db = require('./db');

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
    .then(({ response }) => {
      switch (response) {
        case VIEW_ALL_DEPARTMENTS:
          return viewAllDepartments();

        case ADD_DEPARTMENT:
          return addDepartment();

        case DELETE_DEPARTMENT:
          return deleteDepartment();

        default:
          return db.end(() => console.log('exiting application...\ngoodbye!'));
      }
    })
    .then(main)
    .catch((error) => db.end(() => console.error(error.message)));
};

main();
