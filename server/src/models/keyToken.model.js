const { DataTypes } = require("sequelize");
const sequelize = require("../db/init.mysql");
const { User } = require("./user.model");

const KeyToken = sequelize.define(
  "key_token",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
    },
    publicKey: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    privateKey: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING(1000),
      defaultValue: "",
    },
    refreshTokenUsed: {
      type: DataTypes.STRING(1000),
      defaultValue: "",
    },
  },
  { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
);

module.exports = { KeyToken };
