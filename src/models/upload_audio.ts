import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const UploadAudio = db.define("tbl_audio", {
    id_audio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  appointment_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ruta_audio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type_audio: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  }
}, {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    timestamps : false

});

export default UploadAudio;