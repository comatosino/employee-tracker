      USE employee_tracker_db;
      
-- THIS IS THE QUERY TO VIEW ALL EMPLOYEES & THEIR ROLES
-- LEFT JOINS TO INCLUDE EMPLOYEE EVEN IF ROLE OR DEPARTMENT DELETED
-- NOTE: add aliases "e" for employee and "m" for manager onto table name to allow self-join
   SELECT e.id AS 'ID', 
	      CONCAT(e.first_name, ' ', e.last_name) AS 'Employee',
	      role.title AS 'Title', 
	      department.name AS 'Department', 
	      role.salary AS 'Salary', 
		  CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
     FROM employee e 
LEFT JOIN role 
	   ON e.role_id = role.id
LEFT JOIN department 
	   ON role.department_id = department.id
LEFT JOIN employee m 
	   ON e.manager_id = m.id;