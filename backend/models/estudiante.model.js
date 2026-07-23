const mongoose = require("mongoose");
const Schema = mongoose.Schema;


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
    actividades: [
        {
            type: Schema.Types.ObjectId,
            ref: "Actividad"
        }
    ],
    estadoAcademico: {
        activo: {
            type: Boolean,
            default: true
        },
    }
});

module.exports = mongoose.model("Estudiante", schemaEstudiante);