import { DataTypes } from "sequelize";
import db from "../db/connection.db";

const PersonasNaturales = db.define('tbl_personas_naturales',{
    id_persona:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
    },
    dui_persona:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    persona_image: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    nombre_persona:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    apellidos_persona:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    genero:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    departamento:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    municipio:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    direccion_persona:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    fecha_nacimiento:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    fecha_creacion:{
        type: DataTypes.STRING,
        allowNull: true,
    }
});

export default PersonasNaturales;