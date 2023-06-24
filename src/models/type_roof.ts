import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const Roof = db.define('tbl_type_roof',{
    roof_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    roof_name:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    description_roof:{
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

export default Roof;