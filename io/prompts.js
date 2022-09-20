const io = require('inquirer');

const {
  // departments
  VIEW_ALL_DEPARTMENTS,
  VIEW_DEPARTMENT_BUDGET,
  ADD_DEPARTMENT,
  DELETE_DEPARTMENT,
  // roles
  VIEW_ALL_ROLES,
  ADD_ROLE,
  UPDATE_ROLE_SALARY,
  DELETE_ROLE,
  // employees
  VIEW_ALL_EMPLOYEES,
  VIEW_EMPLOYEES_BY_MANAGER,
  VIEW_EMPLOYEES_BY_DEPARTMENT,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE_ROLE,
  UPDATE_EMPLOYEE_MANAGER,
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
          name: 'View department budget',
          value: VIEW_DEPARTMENT_BUDGET,
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
          name: 'View employees by manager',
          value: VIEW_EMPLOYEES_BY_MANAGER,
        },
        {
          name: 'View employees by department',
          value: VIEW_EMPLOYEES_BY_DEPARTMENT,
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
          name: 'Update an employee manager',
          value: UPDATE_EMPLOYEE_MANAGER,
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
