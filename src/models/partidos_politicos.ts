import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const Users = db.define('tbl_partidos_politicos',{
    id_partido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    sigla:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    direccion:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    representante_legal: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    imagen: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    date_created: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

export default Users;
