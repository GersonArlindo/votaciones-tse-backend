import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const Installers = db.define('tbl_installers',{
    installer_id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    epc_name:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    installers_images:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    state_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    contact_email:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
   installers_phone:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    date_created:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_modify: {
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

export default Installers;
