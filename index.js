const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "P@ssword!",
  database: "employee_db"
});

connection.connect(function(err) {
  if (err) throw err;
});

//=================================================================
//============== Main Question ===============
// What would you like to do?
function action() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "menu",
                message: "Which action would you like to do?",
                choices: [
                    "Add",
                    "View",
                    "Update",
                    "Exit"
                ]
            }]
        ).then(function (response) {
            // add
            if (response.menu === "Add") {
                console.log(response.menu + " selected!");
                create()
            }
            // view
            else if (response.menu === "View") {
                console.log(response.menu + " selected!");
                viewInfo()
            }
            //update
            else if (response.menu === "Update") {
                console.log(response.menu + " selected!");
                updateInfo()
            }
            //exit
            else {
                console.log(response.menu + " selected!");
                connection.end()
            }
        })
}
action()
//CHECK
//=================================================================
//================== Add =====================

// Please choose which you want to add too
function create() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "add",
                message: "Where would you like to add?",
                choices: [
                    "Employee",
                    "Role",
                    "Department",
                    "Back"
                ]
            }]
        ).then(function (response) {
            // If you choose Employee the addEmployee function will begin
            if (response.add === "Employee") {
                createEmployee()
            }
            // If you choose Role the addRole function will begin
            else if (response.add === "Role") {
                createRole()
            }
            // If you choose Department addDepartment will begin
            else if (response.add === "Department") {
                createDepartment()
            }
            // If you choose Back the action() will take you back to the main menu
            else {
                console.log("Back to menu");
                action()
            }
        })
}

//====Employee====
function createEmployee() {
    inquirer
        .prompt([
            //input first_name
            {
                type: "input",
                name: "employeeFirst",
                message: "What is this employee's first name?"
            },
            //input last_name
            {
                type: "input",
                name: "employeeLast",
                message: "What is this employee's last name?"
            },
            //input manager_id
            {
                type: "input",
                name: "employeeManager_id",
                message: "What is the manager ID number of this employee's manager?"
            },
            //input role_id
            {
                type: "input",
                name: "employeeRole_id",
                message: "What is this employees Role?"
            }
        ]).then(async function (eResponse) {
            connection.query("INSERT INTO employees SET ?",
            {
                first_name: eResponse.employeeFirst,
                last_name: eResponse.employeeLast,
                manager_id: parseInt(eResponse.employeeManager_id),
                role_id: parseInt(eResponse.employeeRole_id)
            }, async function(err) {
                if (err) throw (err);
                await action();
            });
        }
        );
    }


//CHECK
//save into table

//====Role====
function createRole() {
    inquirer
        .prompt([
            //input id
            {
                type: "input",
                name: "roleId",
                message: "What is this employees ID?"
            },
            //input title
            {
                type: "input",
                name: "roleTitle",
                message: "What is this employee's title?"
            },
            //input salary
            {
                type: "input",
                name: "roleSalary",
                message: "What is this employee's Salary?"
            },
            //input department_id
            {
                type: "input",
                name: "roleDepartment",
                message: "What is this employee's department Id?"
            }
        ]).then(async function (rResponse) {
            connection.query("INSERT INTO role SET ?",
            {
                title: rResponse.roleTitle,
                salary: rResponse.roleSalary,
                department_id: rResponse.roleDepartment

            }, function(err) {
                if (err) throw (err);
            });
            await action();
        })
}
//CHECK
//====Department===
function createDepartment() {
    inquirer
        .prompt([
            //input id
            {
                type: "input",
                name: "departmentTitle",
                message: "What is the department title?"
            }
        ]).then(async function (dResponse) {
            connection.query("INSERT INTO department SET ?",
            {
                name: dResponse.departmentTitle
            }, function(err) {
                if (err) throw (err);
            });
            await action();
        })
}


//=================================================================
//=================== View ===================
// Please choose which you want to view

function viewInfo() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "view",
                message: "Which would you lke to view?",
                choices: [
                    "Employee",
                    "Role",
                    "Department",
                    "Back"
                ]
            }]
        ).then(function (response) {
            // If you choose Employee the addEmployee function will begin
            if (response.view === "Employee") {
                viewEmployees()
            }
            // If you choose Role the addRole function will begin
            else if (response.view === "Role") {
                viewRole()
            }
            // If you choose Department addDepartment will begin
            else if (response.view === "Department") {
                viewDepartment()
            }
            // If you choose Back the action() will take you back to the main menu
            else {
                console.log("Back to menu");
                action()
            }
        })
};

//====== Employee =====
function viewEmployees() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        action();
    
    });
    // 
};
//======= Role =======
function viewRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        action();
    });
    
};
// pull data from table

//====== Department =====
function viewDepartment() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        action();
    });
    
}
// pull data from table

//=================================================================
//=================== update =================

// Please choose where you would like to update

function updateInfo() {
    inquirer.prompt([
        {
            type: "list",
            name: "update",
            message: "Please choose one of the following to update:",
            choices: ["Employee", "Role", "Department"]
        }
    ])
}

//====Employee====
function updateEmployee() {
    // give list of employees (list)
    // choose what to update on selected employee
    // update
    // save to table
}

//====Role====
function updateRole() {
    // SELECT * FROM employees 

    // get list of role
    // choose role
    // update
    // save to table
}

//====Department====
function updateDepartment() {
    // get list of department
    // choose name
    // choose what to update
    // update
    // save to table
};

function updateInfo() {
    inquirer
    .prompt([
        {
            name: "employeeId",
            type: "input",
            message: "What is the employee ID for the EMPLOYEE you would like to update?"
        },
        {
            name: "employeeRole",
            type: "input",
            message: "What is the new role ID for this EMPLOYEE?"
        }
    ]).then(async function(uResponse) {
        connection.query("UPDATE employees SET ? WHERE ?",
        [
            {
                role_id: uResponse.employeeRole 
            },
            {
                id: uResponse.employeeId
            }
        
        ],
        function(err) {
            if (err) throw (err);
        });
        await action();
    });
}