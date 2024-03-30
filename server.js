const inquirer = require("inquirer");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "jazzjolley",
        database: "employeeTracker_db"
    },
    console.log("Connected to the employeeTracker_db database.")
);

    function init() {
        inquirer.prompt([
            {
                type: "list",
                message: "What do you want to do?",
                name: "question",
                choices: ["View all Departments", "View all Positions", "View all Employees", "Add a Department", "Add a Position", "Add an Employee", "Update an employee"]
            }
        ])
        .then((response) => {
            switch (response.question){
                case "View all Departments":
                    viewDepartments();
                    break;
                case "View all Positions":
                    viewPositions();
                    break;
                case "View all Employees":
                    viewEmployee();
                    break;
                case "Add a Department":
                    addDepartment();
                    break;
                case "Add a position":
                    addPosition();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;
                case "Update an employee postion":
                    updatePosition();
                    break;
                case "Exit":
                    db.end();
                    console.log("Good Bye!");
                    break;
            }
        });
    }

    function viewDepartments() {
        db.query("select * from departments", function (err, results) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(results);
        });
    }

    function viewPositions() {
        db.query("select * from positions", function (err, results) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(results);
        });
    }

    function viewEmployee() {
        db.query("select * from departments", function (err, results) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(results);
        });
    }

    function addDepartment() {
        inquirer.createPromptModule({
            type: "input",
            name: "name",
            message: "Enter a new department name:",
        })
        .then((response) => {
            const query = `INSERT INTO departments (department_name) VALUES ("${response.name}"`;
            db.query(query, function (err, results) {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log("Department add sucessfully!");
                init();
            });
        });
    }

    function addPosition() {
        db.query("SELECT * FROM departments", (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Enter new position title",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "Enter salary for the position",
                },
                {
                    type: "list",
                    name: "department",
                    message: "Which department does this position belong to?",
                    choices: res.map(department => department.department_name)
                },
            ]).then((response) => {
                const department = res.find(
                    department => department.department_name === response.department);
                    const query = "INSERT INTO positions SET?";
                    db.query(query,
                        {
                            title: response.title,
                            salary: response.salary,
                            department_id: department.id,
                        },
                        (err, result) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            console.log(`Added position ${response.title} with salary ${response.salary} to ${response.department} department in the database.`);
                            init();
                        }
                        );
                    });
                });
            }

    function addEmployee() {
        db.query("SELECT id, title FROM positions", (err, resPositions) => {
            if (err) {
                console.log(err);
                return;
            }
            const positions = resPositions.map(({ id, title }) => ({
                name: title,
                value: id,
            }));
            
            db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee',
            (err, resEmployee) => {
                if (err) {
                    console.error(err);
                    return;
                }
                const employee = resEmployee.map(({ id, name }) => ({
                    name: name,
                    value: id,
                }));

            });            
        });
    }
init();

viewDepartments();
viewPositions();
viewEmployee();


// // const Sequelize = require('sequelize');
// // const { Op } = Sequelize;
// const inquirer = require('inquirer');

// // Define your Sequelize models (Departments, Positions, Employees)

// // Function to start the application
// async function startApp() {
//   try {
//     await init();
//   } catch (error) {
//     console.error('An error occurred:', error);
//   } finally {
//     // Close the database connection
//     await sequelize.close();
//     console.log('Goodbye!');
//   }
// }

// // Function to initialize the application
// async function init() {
//   const response = await inquirer.prompt([
//     {
//       type: 'list',
//       message: 'What do you want to do?',
//       name: 'question',
//       choices: ['View all Departments', 'View all Positions', 'View all Employees', 'Add a Department', 'Add a Position', 'Add an Employee', 'Update an employee', 'Exit']
//     }
//   ]);

//   switch (response.question) {
//     case 'View all Departments':
//       await viewDepartments();
//       break;
//     case 'View all Positions':
//       await viewPositions();
//       break;
//     case 'View all Employees':
//       await viewEmployees();
//       break;
//     case 'Add a Department':
//       await addDepartment();
//       break;
//     case 'Add a Position':
//       await addPosition();
//       break;
//     case 'Add an Employee':
//       await addEmployee();
//       break;
//     case 'Update an employee':
//       await updateEmployee();
//       break;
//     case 'Exit':
//       return; // Exit the application
//   }
// }

// // Function to view all departments
// async function viewDepartments() {
//   const departments = await Departments.findAll();
//   console.log(departments);
// }

// // Function to view all positions
// async function viewPositions() {
//   const positions = await Positions.findAll();
//   console.log(positions);
// }

// // Function to view all employees
// async function viewEmployees() {
//   const employees = await Employees.findAll();
//   console.log(employees);
// }

// // Function to add a department
// async function addDepartment() {
//   const response = await inquirer.prompt([
//     {
//       type: 'input',
//       name: 'name',
//       message: 'Enter a new department name:',
//     }
//   ]);
//   await Department.create({ department_name: response.name });
//   console.log('Department added successfully!');
// }

// // // Function to add a position
// // async function addPosition() {
// //   // Implementation similar to addDepartment
// // }

// // // Function to add an employee
// // async function addEmployee() {
// //   // Implementation similar to addDepartment
// // }

// // // Function to update an employee
// // async function updateEmployee() {
// //   // Implementation similar to addDepartment
// // }

// // Start the application
// startApp();

