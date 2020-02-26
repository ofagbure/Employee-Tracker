var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_DB"
});


connection.connect(function (err) {
    if (err) throw err;
    start();
});


function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "Would you like to [VIEW EMPLOYEE RECORDS], [UPDATE AN EMPLOYEE], [ADD ITEMS], or [DELETE AN EMPLOYEE]?",
            choices: ["VIEW ITEMS", "UPDATE ITEMS", "ADD ITEMS", "DELETE AN EMPLOYEE"]
        })
        .then(function (answer) {

            if (answer.action === "ADD ITEMS") {
                addRecord();
            }
            else if (answer.action === "UPDATE AN EMPLOYEE") {
                updateRecord();
            }
            else if (answer.action === "DELETE AN EMPLOYEE") {
                deleteRecord();

            }
            else if (answer.action === "VIEW ITEM") {
                viewRecord();
            }

            else {
                connection.end();
            }
        });
};


function addRecord() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "list",
                message: "Would you like to add an [EMPLOYEE], [DEPARTMENT], or [ROLE]?",
                choices: ["EMPLOYEE", "DEPARTMENT", "ROLE"]
            }])
        .then(function (answer) {
            // still need to define below functions
            if (answer.item === "EMPLOYEE") {
                addEmployee();
            }
            else if (answer.item === "DEPARTMENT") {
                addDepartment();
            }
            else if (answer.item === "ROLE") {
                addRole();
            }
            else {
                connection.end();
            }
            start();
        })
};

function updateRecord() {
    inquirer
        .prompt([
            {
                name: "employee",
                type: "input",
                message: "Who would you like to update? (please provide their employee ID)"
            },
            {
                name: "roleID",
                type: "input",
                message: "What is their new role? (please provide the role ID)"
            },
            {
                name: "managerID",
                type: "input",
                message: "Who is their new manager? (please provide the employee ID of the manager",
            }
        ])
        .then(function (answer) {
            connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                    {
                        employee_id: answer.employee
                    },
                    {
                        role_id: answer.roleID
                    },
                    {
                        manager_id: answer.managerID
                    }
                ],
                function (err) {
                    if (err) throw err;
                    console.log("The employee was updated successfully!");
                }
            );
        });
    start();
};

function deleteRecord() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "list",
                message: "Would you like to delete an [EMPLOYEE], [DEPARTMENT], or [ROLE]?",
                choices: ["EMPLOYEE", "DEPARTMENT", "ROLE"]
            }])
        .then(function (answer) {
            // still need to define below functions
            if (answer.item === "EMPLOYEE") {
                deleteEmployee();
            }
            else if (answer.item === "DEPARTMENT") {
                deleteDepartment();
            }
            else if (answer.item === "ROLE") {
                deleteRole();
            }
            else {
                connection.end();
            }
        })
    start();
};

function viewRecord() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "list",
                message: "Would you like to view all [EMPLOYEES], [DEPARTMENTS], or [ROLES]?",
                choices: ["EMPLOYEES", "DEPARTMENTS", "ROLES"]
            }])
        .then(function (answer) {
            if (answer.item === "EMPLOYEES") {
                connection.query("SELECT * FROM employee", function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    connection.end();
                });
            }
            else if (answer.item === "DEPARTMENTS") {
                connection.query("SELECT * FROM department", function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    connection.end();
                });
            }
            else if (answer.item === "ROLES") {
                connection.query("SELECT * FROM role", function (err, res) {
                    if (err) throw err;
                    console.log(res);
                    connection.end();
                });
            }
            else {
                connection.end();
            }
        })
    start();
};

