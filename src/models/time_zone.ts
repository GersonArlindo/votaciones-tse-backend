import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const TimeZone = db.define('tbl_time_zone',{
    time_zone_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    time_zone_name:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_created: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_modify: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
    timestamps : false

});

export default TimeZone;