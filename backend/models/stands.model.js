const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaStand = new moongose.Schema({
    nombre: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    responsable: {
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Stand", schemaStand);