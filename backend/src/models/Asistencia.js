import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Asistencia = sequelize.define("Asistencia", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});
