USE employee_tracker_db;

-- let's update employee role! 

-- query for list of employees
-- prompt user to select employee
-- save employee id
-- query for list of roles
-- prompt user to select role
-- save selected role id

-- run below statement subbing for user input

UPDATE employee
   SET role_id = 4
 WHERE employee.id = 9;

SELECT * FROM employee;