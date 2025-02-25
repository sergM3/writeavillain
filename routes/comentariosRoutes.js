const express = require("express");
const Comentario = require("../models/Comentario"); //Importar modelo
const router = express.Router();

//1. Obtener todos los comentarios
router.get("/comentarios", async (req, res) => {
  try {
    const comentarios = await Comentario.find();
    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//2. Obtener comentarios de un villano en específico
router.get("/comentarios/:villano", async (req, res) => {
  try {
    const { villano } = req.params;
    const comentarios = await Comentario.find({ villano });

    if (comentarios.length === 0) {
      return res.status(404).json({ error: "No hay comentarios para este villano" });
    }

    res.json(comentarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//3. Agregar un nuevo comentario
router.post("/comentarios", async (req, res) => {
  try {
    const { villano, usuario, comentario } = req.body;

    if (!villano || !usuario || !comentario) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const nuevoComentario = new Comentario({
      villano,
      usuario,
      comentario,
      fecha: new Date() // Se genera automáticamente
    });

    await nuevoComentario.save();
    res.status(201).json(nuevoComentario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//5. Eliminar un comentario por su ID
router.delete("/comentarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comentarioEliminado = await Comentario.findByIdAndDelete(id);

    if (!comentarioEliminado) {
      return res.status(404).json({ error: "Comentario no encontrado" });
    }

    res.json({ mensaje: "Comentario eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//4. Editar un comentario por ID
router.put("/comentarios/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { comentario } = req.body;
  
      if (!comentario) return res.status(400).json({ error: "El comentario no puede estar vacío" });
  
      const comentarioActualizado = await Comentario.findByIdAndUpdate(
        id,
        { comentario, fecha: new Date() },
        { new: true }
      );
  
      if (!comentarioActualizado) return res.status(404).json({ error: "Comentario no encontrado" });
  
      res.json(comentarioActualizado);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;
