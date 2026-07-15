const mongoose = require("mongoose");
const { type } = require("node:os");

// Esquema "Estudiante"
const schemaEstudiante = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true
    },
    identificacion: {
        type: String,
        required: true,
        unique: true // Evita que se registren correos duplicados
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        required: true,
    },
    carrera: {
            type: String,
            required: true,
    },
    actividad:{
        type: String,
        required: true,
    },
    estadoAcademico: {
        activo: {
            type: Boolean,
            default: true
        },
    }
});

module.exports = mongoose.model("Estudiante", schemaEstudiante);