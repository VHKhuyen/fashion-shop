const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "sushi",
  password: "Khuyen18102001@",
  database: "sql_store",
});
module.exports = db;
