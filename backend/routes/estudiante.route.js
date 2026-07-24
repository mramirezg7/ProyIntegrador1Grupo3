const express = require("express");
const router = express.Router();
const Estudiante = require("../models/estudiante.model"); 

// 1. Guardar/Registrar un estudiante
router.post("/", async (req, res) => {
    try {
        const { nombreCompleto, identificacion, correo, telefono, carrera } = req.body;

        // Validar los campos obligatorios del estudiante (según nuestro formulario de contacto/inscripción)
        if (!nombreCompleto || !identificacion || !correo || !telefono || !carrera) {
            return res.status(400).json({ 
                mensajeError: "El nombre completo, identificación, correo, teléfono y carrera son obligatorios." 
            });
        }

        // Crear y guardar el estudiante
        const nuevoEstudiante = new Estudiante(req.body);
        await nuevoEstudiante.save();
        res.status(201).json(nuevoEstudiante);

    } catch (error) {
        return res.status(400).json({ mensajeError: "Error al registrar el estudiante", error });
    }
});

/*
Ejemplo de JSON para probar en Postman/Thunder Client:
{
  "nombreCompleto": "Juan Pérez",
  "identificacion": "20260102",
  "telefono": "+506 8888-8888",
  "correo": "juan.perez@campusfest.edu"
  "carrera": "Ingeniera de Software"
  "estadoAcademico": {
     "activo": true,
     "carrera": "Ingeniería en Sistemas"
  }
}
*/

// 2. Obtener todos los estudiantes registrados
router.get("/", async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ mensajeError: "Error al obtener la lista de estudiantes." });
    }
});

// 3. Obtener los primeros N estudiantes registrados
router.get("/primeros/:cantidad", async (req, res) => {
    try {
        const cantidad = parseInt(req.params.cantidad);

        // Validar que la cantidad sea un número válido y mayor a 0
        if (isNaN(cantidad) || cantidad <= 0) {
            return res.status(400).json({ mensajeError: "La cantidad debe ser un número mayor a 0." });
        }

        const estudiantes = await Estudiante.find().sort({ _id: 1 }).limit(cantidad);
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ mensajeError: "Error al obtener los estudiantes.", error });
    }
});

// 4. Métrica avanzada: Top de carreras con más estudiantes registrados en el CampusFest
// Ejemplo de llamada: http://localhost:3000/estudiantes/top-carreras/3
router.get("/top-carreras/:top", async (req, res) => {
    try {
        const top = parseInt(req.params.top);

        if (isNaN(top) || top <= 0) { 
            return res.status(400).json({ msj: "El parámetro top debe ser un número mayor a 0." });
        }

        // Aggregate, agrupando por la carrera del estudiante
        const carrerasMasPopulares = await Estudiante.aggregate([
            {
                $group: {
                    _id: "$carrera",
                    cantidadEstudiantes: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    cantidadEstudiantes: -1
                }
            },
            {
                $limit: top
            }
        ]);

        res.json(carrerasMasPopulares);

    } catch (error) {
        res.status(500).json({ msj: "Error al obtener el top de carreras", error });
    }
});

router.delete("/:id", async (req, res) => {
    const {id} = req. params;

    try{
        const estudiante = await Estudiante.findByIdAndDelete(id);
        if(!estudiante){
            return res.status(404).json({ error: "Estudiante no encontrado"});
        }
        res.status(200).json({ mensaje: "Estudiante Eliminado"})
    } catch (error){
        res.status(400).json({ mensajeError: error.message });
    }
});


module.exports = router;