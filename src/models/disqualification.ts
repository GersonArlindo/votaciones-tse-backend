import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const Disqualification = db.define('tbl_disqualifications',{
    disqualification_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    disqualification_name:{
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
});

export default Disqualification;