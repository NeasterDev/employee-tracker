const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

const generateTable = (sql) => {
    // Database query
    db.query(sql, (err, data) => {
        // Error catcher
        if (err) { return console.log(err.message); }

        // Create readable table from database using console.table library
        const table = cTable.getTable(data);
        console.log(table);
    })
};

inquirer.prompt([
    {
        name: 'index',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }
]).then(answers => {
    let sql = ''
    // View all departments
    if(answers.index === 'view all departments') {
        sql = `SELECT * FROM department;`;
        generateTable(sql);
    } 
    // View all roles
    else if (answers.index === 'view all roles') {
        sql = `SELECT * FROM roles;`;
        generateTable(sql);
    } 
    // View all employees
    else if (answers.index === 'view all employees') {
        sql = `SELECT * FROM employees;`;
        generateTable(sql);
    }
});

// 1. (done)
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles 

// 2. (done)
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role

// 3. (done)
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to

// 4.
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

// 5.
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

// 6.
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// 7.
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
