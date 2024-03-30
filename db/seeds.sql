INSERT INTO departments (department_name)
VALUES
("In the store"),
("Outside the store");


INSERT INTO positions (title, salary, department_id)
VALUES
("Insider", 1.00, 1),
("Assistent Manager", 30.000, 1),
("General Manager", 60.000, 1),
("Delivery Expert", 40.000, 2);

INSERT INTO employee (first_name, last_name, position_id)
VALUES
("Bren", "Jolley", 4),
("Sarah", "C", 4),
("Ben", "Jim", 4),
("John", "Doe", 3),
("Sally", "Smith", 2),
("Mike", "Thomson", 1),
("Suzy", "Soozer", 2);