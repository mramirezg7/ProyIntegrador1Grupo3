const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaActividad = new mongoose.Schema({
    nombre: {
        type: String, 
        required: true
    },
    categoria: {
        type: String, 
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
        
    },
    lugar: {
        type: String, 
        required: true
    },
    cupoMaximo: {
        type: Number, 
        required: true
    },
    estado: { 
        type: String,
        enum: ['Lleno', 'Disponible'], 
        default: 'Disponible'
    },
    requisitos: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model("Actividad", schemaActividad);