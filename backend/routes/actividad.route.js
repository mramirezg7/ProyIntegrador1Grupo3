const express = require("express");
const router = express.Router();
const Actividad = require("../models/actividad.model");
const Estudiante = require("../models/estudiante.model");

// Registrar una nueva actividad

router.post("/", async (req, res) => {
    try{
        // Validar campos obligatorios 
        const {nombre, categoria, fecha, hora, lugar, cupoMaximo, estado} = req.body;

        if(!nombre || !categoria || !fecha || !hora || !lugar || !cupoMaximo || !estado){
            return res.status(400).json({mensajeError: "Todos los campos son obligatorios."});
        }

        // Validar que el tipo esté dentro de los valores permitidos por el enum
        const estadosPermitidos = ['Lleno', 'Disponible', 'Cancelado'];
        if (!estadosPermitidos.includes(estado)) {
            return res.status(400).json({ mensajeError: "El estado debe ser uno de: " + estadosPermitidos.join(', ')});
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

        // A cada actividad se le agrega cuántos estudiantes tiene inscritos
        const lista = [];

        for (let i = 0; i < actividades.length; i++) {
            const inscritos = await Estudiante.countDocuments({ actividades: actividades[i]._id });
            const datos = actividades[i].toObject();
            datos.inscritos = inscritos;
            lista.push(datos);
        }

        res.json(lista);
    } catch (error){
        res.status(500).json({ msj: "Error al obtener las actividades", error });
    }
});

// Obtener una actividad por su ID
router.get("/:id", async (req, res) => {
    try {
        const actividad = await Actividad.findById(req.params.id);
        
        if (!actividad) {
            return res.status(404).json({ mensajeError: "Actividad no encontrada" });
        }
        
        res.json(actividad);
    } catch (error) {
        res.status(500).json({ msj: "Error al obtener la actividad", error: error.message });
    }
});


// Obtener los estudiantes inscritos en una actividad
router.get("/:id/participantes", async (req, res) => {
    try {
        const actividad = await Actividad.findById(req.params.id);

        if (!actividad) {
            return res.status(404).json({ mensajeError: "Actividad no encontrada" });
        }

        // Se buscan los estudiantes que tengan esta actividad en su lista
        const participantes = await Estudiante.find({ actividades: req.params.id });

        res.json(participantes);
    } catch (error) {
        res.status(500).json({ msj: "Error al obtener los participantes", error: error.message });
    }
});

// Actualizar una actividad
router.put("/:id", async (req, res) => {
    const {id} = req.params;

    try {
        // runValidators hace que se revisen las reglas del modelo (por ejemplo el estado)
        const actividad = await Actividad.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!actividad) {
            return res.status(404).json({ error: "Actividad no encontrada" });
        }
        // Si la actividad fue cancelada se respeta ese estado, si no depende de los inscritos
        if (actividad.estado !== "Cancelado") {
            const inscritos = await Estudiante.countDocuments({ actividades: id });

            if (inscritos >= actividad.cupoMaximo) {
                actividad.estado = "Lleno";
            } else {
                actividad.estado = "Disponible";
            }

            await actividad.save();
        }

        res.status(200).json(actividad);
    } catch (error) {
        res.status(400).json({ mensajeError: error.message });
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
