require('dotenv').config();
require('console.table');

const io = require('inquirer');

const db = require('./db');

const {
  VIEW_ALL_DEPARTMENTS,
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT,
  VIEW_ALL_ROLES,
  ADD_ROLE,
  UPDATE_ROLE_SALARY,
  DELETE_ROLE,
  EXIT,
} = require('./io/constants');

const {
  viewAllDepartments,
  addDepartment,
  deleteDepartment,
  viewAllRoles,
  addRole,
  updateRoleSalary,
  deleteRole,
} = require('./io/handlers');

const { loop, exit } = require('./io/helpers');

const main = () => {
  io.prompt([
    {
      type: 'list',
      name: 'response',
      message: 'What would you like to do?',
      choices: [
        new io.Separator('--- Departments ---'),

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

        new io.Separator('--- Roles ---'),

        {
          name: 'View all roles',
          value: VIEW_ALL_ROLES,
        },
        {
          name: 'Add a role',
          value: ADD_ROLE,
        },
        {
          name: 'Update role salary',
          value: UPDATE_ROLE_SALARY,
        },
        {
          name: 'Delete role',
          value: DELETE_ROLE,
        },

        new io.Separator('--- Exit ---'),

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

        case VIEW_ALL_ROLES:
          return viewAllRoles().then(loop);

        case ADD_ROLE:
          return addRole().then(loop);

        case UPDATE_ROLE_SALARY:
          return updateRoleSalary().then(loop);

        case DELETE_ROLE:
          return deleteRole().then(loop);

        default:
          return Promise.resolve(false);
      }
    })
    .then((loop) => {
      if (loop) main();
      else exit();
    })
    .catch((error) => db.end(() => console.error(error.message)));
};

main();
