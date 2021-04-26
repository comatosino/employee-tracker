     USE employee_tracker_db;
     
-- USE THIS QUERY TO VIEW ALL ROLES WITH DEPT
  SELECT title AS 'Title', 
		 salary AS 'Salary', 
         name AS 'Department' 
    FROM role
    JOIN department 
      ON role.department_id = department.id
ORDER BY department;