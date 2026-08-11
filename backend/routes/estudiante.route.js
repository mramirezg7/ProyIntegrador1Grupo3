const express = require("express");
const router = express.Router();
const Estudiante = require("../models/estudiante.model"); 
const Actividad = require("../models/actividad.model");

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
        const estudiantes = await Estudiante.find() .populate("actividades");
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

// Agregar actividad a un estudiante
router.put("/agregar-actividad", async(req, res) =>{
    const {identificacion, actividadId} = req.body;

    if(!identificacion || !actividadId){
        return res.status(400).json({mensajeError: "Identificación y ID de la actividad son obligatorios"})
    }

    try{
        //Verificar que la actividad existe
        const actividad = await Actividad.findById(actividadId);
        if (!actividad){
            return res.status(404).json({error: "Actividad no encontrada"});
        }
        //No se puede inscribir a nadie en una actividad que fue cancelada
        if(actividad.estado === "Cancelado"){
            return res.status(400).json({mensajeError: "La actividad fue cancelada"});
        }

        const inscritos = await Estudiante.countDocuments({actividades: actividadId});
        if(inscritos >= actividad.cupoMaximo){
            return res.status(400).json({mensajeError: "La actividad ya no tiene cupo disponible"});
        }

        //Buscar el estudiante y agregar la actividad
        const estudiante = await Estudiante.findOne({identificacion});
        if(!estudiante){
            return res.status(404).json({error: "Estudiante no encontrado"})
        }

        if(!estudiante.actividades.includes(actividadId)){
            estudiante.actividades.push(actividadId);
            await estudiante.save();
            if(inscritos + 1 >= actividad.cupoMaximo){
                actividad.estado = "Lleno";
                await actividad.save();
            }
        }else{
            return res.status(404).json({error: "Estudiante ya se encuentra registrado en la actividad"})
        }

        res.status(200).json({msj: "Actividad agregada al estudiante", estudiante});

    }catch(error){
        res.status(400).json({mensajeError: error.message});
    }
})

// Obtener un estudiante por su ID
router.get("/:id", async (req, res) => {
    try {
        const estudiante = await Estudiante.findById(req.params.id);

        if (!estudiante) {
            return res.status(404).json({ mensajeError: "Estudiante no encontrado" });
        }

        res.json(estudiante);
    } catch (error) {
        res.status(500).json({ msj: "Error al obtener el estudiante", error: error.message });
    }
});

// Actualizar un estudiante
router.put("/:id", async (req, res) => {
    const {id} = req.params;

    try {
        // runValidators hace que se revisen las reglas del modelo
        const estudiante = await Estudiante.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!estudiante) {
            return res.status(404).json({ error: "Estudiante no encontrado" });
        }

        res.status(200).json(estudiante);
    } catch (error) {
        res.status(400).json({ mensajeError: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    const {id} = req.params;

    try{
        const estudiante = await Estudiante.findByIdAndDelete(id);
        if(!estudiante){
            return res.status(404).json({ error: "Estudiante no encontrado"});
        }
        for(let i = 0; i < estudiante.actividades.length; i++){
            const actividad = await Actividad.findById(estudiante.actividades[i]);

            //Las actividades canceladas mantienen su estado
            if(actividad && actividad.estado !== "Cancelado"){
                const inscritos = await Estudiante.countDocuments({actividades: actividad._id});

                if(inscritos >= actividad.cupoMaximo){
                    actividad.estado = "Lleno";
                }else{
                    actividad.estado = "Disponible";
                }

                await actividad.save();
            }
        }
        res.status(200).json({ mensaje: "Estudiante Eliminado"})
    } catch (error){
        res.status(400).json({ mensajeError: error.message });
    }
});


module.exports = router;