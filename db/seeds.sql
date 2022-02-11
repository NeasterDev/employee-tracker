INSERT INTO departments (name)
VALUES
    ( "Engineering"),
    ( "Sales"),
    ( "Finance"),
    ( "Legal");

INSERT INTO roles (title, salary, department_id)
VALUES
    ( "Lead Engineer", 100000, 1),
    ( "Engineer", 80000, 1),
    ( "Sales Lead", 80000, 2),
    ( "Saleperson", 60000, 2),
    ( "Account Manager", 100000, 3),
    ( "Accountant", 75000, 3),
    ( "Legal Team Lead", 120000, 4),
    ( "Accountant", 90000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Bob", "Hill", 1, null),
    ("Rock", "Boulder", 2, 1),
    ("Bill", "Job", 3, null),
    ("Brock", "Johnson", 4, 3);