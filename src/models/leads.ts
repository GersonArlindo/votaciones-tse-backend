import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const Leads = db.define('tbl_leads',{
    id_l:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
    },
    lead_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: true,
    },
    first_name:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone_number:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    st_address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    zip_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    full_address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    source: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    campaign_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ad_set_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ad_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ad_account_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    agent_assigned: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    outcome: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    tags: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    home_owner: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bill_amount: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_create: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_modify: {
        type: DataTypes.STRING,
        allowNull: true
    },
    modification_by: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status_lead: {
        type: DataTypes.NUMBER,
        allowNull: true
    }
});

export default Leads;
