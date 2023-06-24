import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const assappmt = db.define('tbl_assign_appointment',{
    appointment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    id_provider:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    lead_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    manager: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_sales_rep:{
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_language: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    bill_amount: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    credit_score: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bankrupcy: {
        type: DataTypes.CHAR,
        allowNull: true,
    },
    id_energy_provider: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    anual_usage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_roof: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    roof_age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    replace_roof: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    meter_location: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    meter_number: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    account_number: {
        type: DataTypes.INTEGER,
        allowNull: true
    },    
    appointment_type: {
        type: DataTypes.CHAR,
        allowNull: true
    },
    appointment_datetime: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id_timezone: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    state_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true
    },
    attendance_confirmed: {
        type: DataTypes.STRING,
        allowNull: true
    },
    attendance_confirmed_date_time: {
        type: DataTypes.STRING,
        allowNull: true
    },
    design_lead: {
        type: DataTypes.STRING,
        allowNull: true
    },
    design_notes: {
        type: DataTypes.STRING,
        allowNull: true
    },
    approved_by: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    doc_pending: {
        type: DataTypes.STRING,
        allowNull: true
    },
    client_think: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    appt_outcome_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    disqualification_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    crc_date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    financier: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date_created: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date_modify: {
        type: DataTypes.STRING,
        allowNull: true
    },
    modify_by: {
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

export default assappmt;
