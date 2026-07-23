const express = require("express");
const router = express.Router();
const Stand = require("../models/stands.model");

// Registar un nuevo stand 
router.post("/", async (req, res) => {
    try{
        const{nombre, categoria, responsable, ubicacion, descripcion} = req.body;
        if(!nombre || !categoria || !responsable || !ubicacion || !descripcion){
            return res.status(400).json({mensajeError: "Todos los campos son obligatorios."});
        }

        const nuevoStand = new Stand(req.body);
        await nuevoStand.save();
        res.status(201).json(nuevoStand);
    }catch(error){
        res.status(400).json({ msj: "Error al crear el stand", error })
    }
});

//Obtener los stands
router.get("/", async (req, res) => {
    try {
        const stands = await Stand.find();
        res.json(stands);
    } catch (error) {
        res.status(500).json({ msj: "Error al obtener los stands", error });
    }
});

//Eliminar un stand
router.delete("/:id", async (req, res) => {
    const {id} = req.params;

    try{
        const stand = await Stand.findByIdAndDelete(id);
        if(!stand){
            return res.status(404).json({ error: "Stand no encontrado"});
        }
        res.status(200).json({ mensaje: "Stand Eliminado"})
    } catch (error) {
        res.status(400).json({ mensajeError: error.message });
    }
});

module.exports = router;

