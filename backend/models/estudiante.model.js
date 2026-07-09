const mongoose = require("mongoose");

// Esquema "Estudiante"
const schemaEstudiante = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true
    },
    correoElectronico: {
        type: String,
        required: true,
        unique: true // Evita que se registren correos duplicados
    },
    telefono: {
        type: String,
        required: true
    },
    carne: {
        type: String,
        required: true,
        unique: true // El carné o identificación universitaria debe ser único
    },
    estadoAcademico: {
        activo: {
            type: Boolean,
            default: true
        },
        carrera: {
            type: String,
            default: "No especificada"
        }
    }
});

module.exports = mongoose.model("Estudiante", schemaEstudiante);