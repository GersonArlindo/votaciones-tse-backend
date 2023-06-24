import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const States = db.define('tbl_states',{
    state_id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    name_state:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    abbreviation:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    covered_virtually:{
        type: DataTypes.CHAR,
        allowNull: true,
    },
    covered_inperson:{
        type: DataTypes.CHAR,
        allowNull: true,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_created: {
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

export default States;
