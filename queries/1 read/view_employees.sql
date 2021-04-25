USE employee_tracker_db;

-- THIS IS THE QUERY TO VIEW ALL EMPLOYEES & THEIR ROLES
SELECT 
e.id, e.first_name, e.last_name,
role.title, department.name, role.salary, 
CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
FROM employee e -- NOTE: add aliases "e" for employee and "m" for manager to allow self-join
	INNER JOIN role ON e.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id;