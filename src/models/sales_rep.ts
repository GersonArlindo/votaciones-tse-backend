import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const SalesRep = db.define(
  "tbl_sales_rep",
  {
    sales_rep_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    appointment_type_availability: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    appt_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color_appt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_created: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_modify: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    timestamps: false,
  }
);

export default SalesRep;
