const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const db = require("./config/connection");

var Options = [
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
			"update an employee role",
		],
	},
];

inquirer.prompt(Options).then((anwsers) => {
	const { option } = anwsers;

	//WHEN I choose to view all departments
	if (option === "view all departments") {
		db.promise()
			.query("SELECT * FROM department")
			.then(([rows, fields]) => {
				//THEN I am presented with a formatted table showing department names and department ids
				console.table(rows);
			})
			.catch(console.log)
			.then(() => db.end());
	}
});
