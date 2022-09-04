require('dotenv').config();
require('console.table');

const { prompt, Separator } = require('inquirer');

const db = require('./db');

const {
  VIEW_ALL_DEPARTMENTS,
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT,
  EXIT,
} = require('./io/constants');

const {
  viewAllDepartments,
  addDepartment,
  deleteDepartment,
} = require('./io/handlers');

const loop = () => true;

const check = (loop) => {
  if (loop) main();
  else exit();
};

const exit = () => {
  db.end(() => console.log('exiting application...\ngoodbye!'));
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
        new Separator('--- Exit ---'),
        {
          name: 'Exit',
          value: EXIT,
        },
      ],
    },
  ])
    .then(({ response }) => {
      switch (response) {
        case VIEW_ALL_DEPARTMENTS:
          return viewAllDepartments().then(loop);

        case ADD_DEPARTMENT:
          return addDepartment().then(loop);

        case DELETE_DEPARTMENT:
          return deleteDepartment().then(loop);

        default:
          return Promise.resolve(false);
      }
    })
    .then(check)
    .catch((error) => db.end(() => console.error(error.message)));
};

main();
