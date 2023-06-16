const sequelize = require("../db/init.mysql");
const { DataTypes } = require("sequelize");

const OrderItem = sequelize.define(
  "order_item",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

const Order = sequelize.define(
  "orders",
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    order_status: {
      type: DataTypes.STRING,
      allowNull: false,
      values: ["pending", "confirmed", "shipped", "canceled", "delivered"],
      defaultValue: "pending",
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

module.exports = { Order, OrderItem };
