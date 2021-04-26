USE employee_tracker_db;

-- let's add an employee! 
-- MUST HAVE first_name, last_name, role

-- query role for list of roles
-- prompt user to select role from that list
-- save role id
-- prompt for first_name and last_name
-- query employee for list of employees
-- prompt user to select new employee's manager (or none)
    -- save manager id
	-- if no manager selected, manager_id = null

INSERT INTO employee
        SET first_name = "Robert",
            last_name = "Adams",
            role_id = 4,
            manager_id = 3 -- or NULL
;

SELECT * FROM employee;