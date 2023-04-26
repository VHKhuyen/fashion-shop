const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db");

const Store = sequelize.define("store", {
  store_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  manager: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  img: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  map_img: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  duration: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  on_day: {
    type: DataTypes.STRING(50),
    allowNull: true,
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

module.exports = Store;
