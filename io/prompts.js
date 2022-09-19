const io = require('inquirer');

const {
  // departments
  VIEW_ALL_DEPARTMENTS,
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT,
  // roles
  VIEW_ALL_ROLES,
  ADD_ROLE,
  UPDATE_ROLE_SALARY,
  DELETE_ROLE,
  // employees
  VIEW_ALL_EMPLOYEES,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE_ROLE,
  DELETE_EMPLOYEE,
  EXIT,
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
        {
          name: 'Add an employee',
          value: ADD_EMPLOYEE,
        },
        {
          name: 'Update an employee role',
          value: UPDATE_EMPLOYEE_ROLE,
        },
        {
          name: 'Delete an employee',
          value: DELETE_EMPLOYEE,
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
