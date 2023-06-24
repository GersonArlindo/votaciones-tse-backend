import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const UploadImage = db.define("tbl_images", {
    id_image: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true,
  },
  appointment_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ruta_image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type_img: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

export default UploadImage;