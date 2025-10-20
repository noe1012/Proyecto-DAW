import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Evento = sequelize.define("Evento", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
