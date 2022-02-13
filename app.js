const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

const generateTable = (sql) => {
    // Database query
    db.query(sql, (err, data) => {
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
    if(answers.index === "view all departments") {
        const sql = `SELECT * FROM departments`;
        generateTable(sql);
    }
});

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles