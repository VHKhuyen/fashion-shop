const { DataTypes } = require("sequelize");
const sequelize = require("../db/init.mysql");

const ApiKey = sequelize.define(
  "api_key",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    permissions: {
      type: DataTypes.STRING,
      allowNull: false,
      values: DataTypes.ENUM("0000", "1111", "2222"),
    },
  },
  { timestamps: true }
);

module.exports = { ApiKey };
