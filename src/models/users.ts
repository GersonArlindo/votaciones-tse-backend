import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const Users = db.define('tbl_users',{
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    birthdate:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_images: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    language_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status: {
        type: DataTypes.CHAR,
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

export default Users;
