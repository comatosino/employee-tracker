-- DROP DATABASE IF EXISTS employee_tracker_db;
-- CREATE DATABASE employee_tracker_db;
-- USE employee_tracker_db;

CREATE TABLE department (
	id INTEGER AUTO_INCREMENT,
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
	role_id INTEGER(10) NOT NULL,
	manager_id INTEGER(10),
	PRIMARY KEY (id)
);