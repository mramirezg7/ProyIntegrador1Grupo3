const express = require("express");
const router = express.Router();
const Actividad = require("../models/actividad.model");

// Registrar una nueva actividad

router.post("/", async (req, res) => {
    try{
        // Validar campos obligatorios 
        const {nombre, categoria, fecha, hora, lugar, cupoMaximo, estado, requisitos} = req.body;

        if(!nombre || !categoria || !fecha || !hora || !lugar || !cupoMaximo || !estado || !requisitos){
            return res.status(400).json({mensajeError: "Todos los campos son obligatorios."});
        }

        // Validar que el tipo esté dentro de los valores permitidos por el enum
        const estadosPermitidos = ['Lleno', 'Disponible'];
        if (!estadosPermitidos.includes(estado)) {
            return res.status(400).json({ mensajeError: "El estado debe ser uno de: " + tiposPermitidos.join(', ')});
        }

        const nuevaActividad = new Actividad(req.body);
        await nuevaActividad.save();
        res.status(201).json(nuevaActividad);
    } catch (error){
        res.status(400).json({ msj: "Error al crear la atividad", error})
    }
});

// Obtener todas las actividades
router.get("/", async (req, res) => {
    try {
        const actividades = await Actividad.find();
        res.json(actividades);
    } catch (error){
        res.status(500).json({ msj: "Error al obtener las actividades", error });
    }
});

// Eliminar una actividad
router.delete("/:id", async (req, res) => {
    const {id} = req.params;

    try{
        const actividad = await Actividad.findByIdAndDelete(id);
        if(!actividad){
            return res.status(404).json({ error: "Actividad no encontrado"});
        }
        res.status(200).json({ mensaje: "Actividad Eliminada"})
    } catch (error) {
        res.status(400).json({ mensajeError: error.message });
    }
});

module.exports = router;
