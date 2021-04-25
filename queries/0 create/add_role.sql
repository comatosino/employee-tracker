USE employee_tracker_db;

-- let's add a role! 
-- a role MUST have title, salary, department_id

-- query department table and return list of depts
-- from that list, prompt user which department they'd like to add role to
-- save the id of the selected department
-- prompt user for role title and salary
-- run below insert statement with param replaced by user input

INSERT INTO 
	role
SET 
	title = "Quality Manager",
    salary = 110000,
    department_id = 5
;

SELECT * FROM role;