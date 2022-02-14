const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

var roleList = [];
const generateTable = (sql) => {
    // Database query
    db.query(sql, (err, data) => {
        // Error catcher
        if (err) { return console.log(err.message); }

        // Create readable table from database using console.table library
        const table = cTable.getTable(data);
        console.log(table);
        
        return prompt();
    })
};

const updateTable = (sql) => {
    // Database query
    db.query(sql, (err, data) => {
        // Error catcher
        if (err) { 
            console.log( err.message);
            return prompt();
        }
        else {
            console.log('Database successfully updated');
        }
        return prompt();
    })
}

const updateRoleList = () => {
    db.query('SELECT * FROM roles', (err, data) => {
        for (let i = 0; i < data.length; i++) {
            roleList[i] = data[i].title;
        }
    });
}

const addToTable = (table) => {
    let question;
    let sql;
    if (table === 'departments') {
        question = {
            type:'input',
            name: 'departmentName',
            message: 'Enter new department name:'
        };
    } else if (table === 'roles') {
        // THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
        question = [
            {
                type:'input',
                name: 'roleName',
                message: 'Enter new role name:'
            },
            {
                type:'input',
                name: 'salary',
                message: 'Enter salary for role:'
            },
            {
                type:'input',
                name: 'departmentID',
                message: 'Enter department id for role:'
            }
        ];
        sql = ``;
    } else if (table === 'employees') {
        // THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
        question = [
            {
                type:'input',
                name: 'first_name',
                message: 'Enter first name:'
            },
            {
                type:'input',
                name: 'last_name',
                message: 'Enter last name:'
            },
            {
                type:'input',
                name: 'roleID',
                message: 'Enter role id for employee:'
            },
            {
                type:'input',
                name: 'managerID',
                message: 'Enter manager id for employee("Enter" for no manager):'
            }
        ];
        sql = ``;
    }
    inquirer.prompt(question).then(answers => {
        if      (table === 'departments')    { sql = `INSERT INTO departments (name) VALUES ("${answers.departmentName}");` }
        else if (table === 'roles')          { sql = `INSERT INTO roles (title, salary, department_id)
                                                      VALUES ("${answers.roleName}","${answers.salary}","${answers.departmentID}")`; }
        else if (table === 'employees')      { 
            if (answers.managerID === '') {
                sql = `INSERT INTO employees (first_name, last_name, role_id)
                       VALUES ("${answers.first_name}", "${answers.last_name}", "${answers.roleID}")`; 
            } else {
                sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)                             
                       VALUES ("${answers.first_name}", "${answers.last_name}", "${answers.roleID}", "${answers.managerID}")`; 
            }
            
        }
        updateTable(sql);
    })
}

const prompt = () => {
        updateRoleList();
        inquirer.prompt([
        {
            name: 'index',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'finish']
        }
    ]).then(answers => {
        let sql = ''
        // View all departments
        if(answers.index === 'view all departments') {
            sql = `SELECT * FROM departments;`;
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
        else if (answers.index === 'add a department') {
            addToTable("departments");
        }
        else if (answers.index === 'add a role') {
            addToTable("roles");
        }
        else if (answers.index === 'add an employee') {
            addToTable("employees");
        }
        else if (answers.index === 'update an employee role') {

            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employee',
                    message: 'Enter ID for employee you wish to update:'
                },
                {
                    type: 'list',
                    name: 'role',
                    choices: roleList
                }
            ]).then(answers => {
                let roleID;

                db.query(`SELECT * FROM roles WHERE title='${answers.role}';`, (err, data) => {
                    console.log(data);
                    console.log(data[0].id);
                    roleID = data[0].id;
                    console.log(roleID);
                    sql = `UPDATE employees SET role_id = "${roleID}" WHERE id = ${answers.employee}`;
                    updateTable(sql);
                });
            })
        }
        else if (answers.index === 'finish') {
            process.exit();
        }
    });
}

prompt();

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

// 4. (done)
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

// 5. (done)
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

// 6.(done)
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

// 7.(done)
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
