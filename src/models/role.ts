import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const Role = db.define("tbl_roles", {
  rol_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  rol_rol: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rol_descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rol_created: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rol_modify: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Role;
