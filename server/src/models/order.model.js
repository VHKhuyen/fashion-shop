const sequelize = require("../db/init.mysql");
const { DataTypes } = require("sequelize");

const OrderItem = sequelize.define(
  "order_item",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "order_id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  { timestamps: true }
);

const Order = sequelize.define(
  "order",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(50),
      defaultValue: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ward: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "VN",
    },
    note: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    order_status: {
      type: DataTypes.STRING,
      allowNull: false,
      values: ["pending", "confirmed", "shipped", "canceled", "delivered"],
      defaultValue: "pending",
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = { Order, OrderItem };
