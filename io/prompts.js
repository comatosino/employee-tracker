const io = require('inquirer');

const {
  VIEW_ALL_DEPARTMENTS,
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT,
  VIEW_ALL_ROLES,
  ADD_ROLE,
  UPDATE_ROLE_SALARY,
  DELETE_ROLE,
  VIEW_ALL_EMPLOYEES,
  EXIT
} = require('./constants');

module.exports = {
  MAIN_MENU: [
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

        new io.Separator('--- Employees ---'),

        {
          name: 'View all employees',
          value: VIEW_ALL_EMPLOYEES,
        },

        new io.Separator('--- Exit ---'),

        {
          name: 'Exit',
          value: EXIT,
        },
      ],
    },
  ],
};
