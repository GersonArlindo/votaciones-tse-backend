import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const Permission = db.define('tbl_permisos',{
    per_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    mod_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    rol_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    create:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    read:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    update:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    deleted:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    timestamps : false

});

export default Permission;
