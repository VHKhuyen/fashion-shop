const { Sequelize } = require("sequelize");

// Kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;
