import { DataTypes } from "sequelize";
import { sequelize } from "../Databases/Postgre";

export const Sample = sequelize.define("samples", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  result: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  suggestion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: new Date(),
  },
});