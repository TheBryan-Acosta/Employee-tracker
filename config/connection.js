const mysql = require("mysql2");
require("dotenv").config();

// create the connection to database
// create the connection to database
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	database: "employee_tracker",
	password: "D^XZ6$EuwC",
});

module.exports = db;
