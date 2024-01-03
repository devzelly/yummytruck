const mysql = require("mysql2/promise");
const { databaseSecret } = require("./secret.js");

// mysql DB connection pool 
exports.pool = mysql.createPool(databaseSecret);