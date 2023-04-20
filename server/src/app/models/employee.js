const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Customer = sequelize.define("customer", {
  employee_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jobs_title: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  birth_date: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
  phone: {
    type: DataTypes.STRING(50),
    defaultValue: null,
  },
  role: {
    type: DataTypes.STRING(1),
    allowNull: false,
    defaultValue: "3",
  },
  salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  store_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.NOW,
  },
});

// User.sync({ alter: true })
//   .then(() => {
//     console.log("User table created successfully");
//   })
//   .catch((error) => {
//     console.error("Error creating user table:", error);
//   });
module.exports = Customer;
