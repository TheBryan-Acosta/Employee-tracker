const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const db = require("./config/connection");

var select_Options = [
	{
		type: "list",
		name: "option",
		message: "What would you like to do?",
		choices: [
			"view all departments",
			"view all roles",
			"view all employees",
			"add a department",
			"add a role",
			"add an employee",
		],
	},
];

inquirer.prompt(select_Options).then((anwsers) => {
	const { option } = anwsers;

	//view all deps
	if (option === "view all departments") {
		db.promise()
			.query("SELECT * FROM department")
			.then(([rows, fields]) => {
				console.table(rows);
			})
			.catch(console.log)
			.then(() => db.end());
	}
	//view all roles
	if (option === "view all roles") {
		db.promise()
			.query("SELECT * FROM job")
			.then(([rows, fields]) => {
				console.table(rows);
			})
			.catch(console.log)
			.then(() => db.end());
	}
	//view all employees
	if (option === "view all employees") {
		db.promise()
			.query("SELECT * FROM employee")
			.then(([rows, fields]) => {
				console.table(rows);
			})
			.catch(console.log)
			.then(() => db.end());
	}
	// add a department
	if (option === "add a department") {
		inquirer
			.prompt([
				{
					type: "input",
					name: "dpt_name",
					message: "What is the name of the department?",
					validate: function (input) {
						if (input == "") {
							return "Please enter a Department!";
						}
						return true;
					},
				},
			])
			.then((anwsers) => {
				const { dpt_name } = anwsers;
				db.promise()
					.query(`INSERT INTO department (dept_name) VALUES("${dpt_name}")`)
					.then(([rows, fields]) => {
						console.table(rows);
					})
					.catch(console.log)
					.then(() => db.end());
			});
	}
	// add a role
	if (option === "add a role") {
		inquirer
			.prompt([
				{
					type: "input",
					name: "role_name",
					message: "What is the name of the role?",
					validate: function (input) {
						if (input == "") {
							return "Please enter a valid name!";
						}
						return true;
					},
				},
				{
					type: "input",
					name: "salary",
					message: "What is the Salary for the role?",
					validate: function (input) {
						if (input == "") {
							return "Please enter a salary!";
						}
						if (isNaN(input)) {
							return "Please enter a valid salary!";
						}
						return true;
					},
				},
				{
					type: "input",
					name: "dept_id",
					message: "What department number does this role belong too?",
					validate: function (input) {
						if (isNaN(input)) {
							return "Please enter a valid department!";
						}
						return true;
					},
				},
			])
			.then((answers) => {
				const { role_name, salary, dept_id } = answers;
				console.log(role_name);
				db.promise()
					.query(
						`INSERT INTO job(title, salary, department_id) VALUES("${role_name}", "${salary}", "${dept_id}")`
					)
					.then(([rows, fields]) => {
						console.log(`Role created!`);
					})
					.catch(console.log)
					.then(() => db.end());
			});
	}
	// add an employee
	if (option === "add an employee") {
		inquirer
			.prompt([
				{
					type: "input",
					name: "first_name",
					message: "What is the first name of the employee?",
					validate: function (input) {
						if (input == "") {
							return "Please enter a valid name!";
						}
						return true;
					},
				},
				{
					type: "input",
					name: "last_name",
					message: "What is the Last name of the Employee?",
					validate: function (input) {
						if (input == "") {
							return "Please enter a valid name!";
						}
						return true;
					},
				},
				{
					type: "input",
					name: "role",
					message: "What is the employees role?",
					validate: function (input) {
						if (input == "") {
							return "Please enter a valid role!";
						}
						return true;
					},
				},
				{
					type: "input",
					name: "manager",
					message: "Who is their manager?",
					validate: function (input) {
						if (input == "") {
							return "Please enter a valid name!";
						}
						return true;
					},
				},
			])
			.then((answers) => {
				const { first_name, last_name, role, manager } = answers;
				db.promise()
					.query(
						`INSERT INTO employee(first_name, last_name, role_id, manager_id ) VALUES("${first_name}", "${last_name}, "${role}", "${manager}")`
					)
					.then(([rows, fields]) => {
						console.log(`Employee has been added!`);
					})
					.catch(console.log)
					.then(() => db.end());
			});
	}
});
