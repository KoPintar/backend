import { DataTypes } from "sequelize";
import { sequelize } from "../Databases/Postgre";

export const History = sequelize.define("history", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
	user_id: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	type: {
		type: DataTypes.STRING,
		allowNull: false,
	},
  classResult: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numericResult: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
	image: {
		type: DataTypes.STRING,
		allowNull: true,
	},
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  }
});
