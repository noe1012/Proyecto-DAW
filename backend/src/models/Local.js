import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Local = sequelize.define("Local", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
