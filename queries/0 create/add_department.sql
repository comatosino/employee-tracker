USE employee_tracker_db;

-- let's add a department!
-- the only thing a department needs is a name

-- in js, prompt user for name of new dept
-- replace "Quality" with user input
INSERT INTO department 
        SET name = "Quality" -- from user input
;

SELECT * FROM department;