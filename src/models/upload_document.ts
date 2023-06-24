import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const UploadDocument = db.define("tbl_docbill", {
  id_document_bill: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  appointment_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ruta_document: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    timestamps : false

});

export default UploadDocument;