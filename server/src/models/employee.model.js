const { DataTypes } = require("sequelize");
const sequelize = require("../db/init.mysql");

const Employee = sequelize.define(
  "employee",
  {
    employee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
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
  },
  { timestamps: true }
);

module.exports = { Employee };
