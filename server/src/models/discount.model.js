const { DataTypes } = require("sequelize");
const sequelize = require("../db/init.mysql");

const Discount = sequelize.define(
  "discount",
  {
    discount_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    discount_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    discount_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "fixed_amount",
    },
    discount_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount_start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    discount_end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    discount_max_uses: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount_min_order_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount_is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    discount_applies_to: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "all",
    },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

module.exports = { Discount };
