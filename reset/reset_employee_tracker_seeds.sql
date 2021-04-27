DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE department (
	id INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE role (
	id INTEGER AUTO_INCREMENT,
	title VARCHAR(30) NOT NULL,
	salary DECIMAL(10, 2) NOT NULL,
	department_id INTEGER NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INTEGER AUTO_INCREMENT,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id INTEGER(10),
	manager_id INTEGER(10),
	PRIMARY KEY (id)
);

-- seed depts
INSERT INTO department 
(name) 
VALUES 
("Sales"), 
("Engineering"), 
("Finance"), 
("Legal");

-- seed roles
INSERT INTO role 
(title, salary, department_id) 
VALUES 
("Sales Lead", 100000, 1), 
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

-- seed employees
INSERT INTO employee 
(first_name, last_name, role_id, manager_id) 
VALUES 
("John", "Doe", 1, 3),
("Mike", "Chan", 2, 1),
("Ashley", "Rodriguez", 3, NULL),
("Kevin", "Tupik", 4, 3),
("Malia", "Brown", 5, NULL),
("Sarah", "Lourd", 6, NULL),
("Tom", "Allen", 7, 6),
("Christian", "Eckenrode", 3, 2);

SELECT * FROM department;
SELECT * FROM employee;
SELECT * FROM role;
