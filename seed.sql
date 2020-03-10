USE employee_db;

INSERT INTO department(name) 
VALUES ("sales");

INSERT INTO department(name) 
VALUES ("Engineer");

INSERT INTO department(name) 
VALUES ("Engineer");

INSERT INTO department(name) 
VALUES ("CEO");

INSERT INTO department(name) 
VALUES ("Legal");

INSERT INTO role(title, salary)
VALUES ("manager", 210000), ("CEO", 500000), ("General Manager", 175000), ("Lawyer", 150000), ("Cat Sitter", 75000);




INSERT INTO employees(first_name, last_name, manager_id, role_id)
VALUES ("Kimi", "Inglet", 1, 1);

INSERT INTO employees(first_name, last_name, manager_id, role_id)
VALUES ("Dan", "Fenichel", 1, 1);

INSERT INTO employees(first_name, last_name, manager_id, role_id)
VALUES ("Tera", "Kelly", 1, 1);

SELECT * FROM role;
