import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const Modules = db.define('tbl_modulos',{
    mod_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    mod_nombre:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_created:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_modify:{
        type: DataTypes.STRING,
        allowNull: true,
    }
});

export default Modules;
