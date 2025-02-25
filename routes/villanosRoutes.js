const express = require("express");
const Villano = require("../models/Villano"); //Importar el modelo correcto
const router = express.Router();

//1. Obtener todos los villanos
router.get("/villanos", async (req, res) => {
  try {
    const villanos = await Villano.find();
    res.json(villanos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//2. Obtener un villano por nombre
router.get("/villanos/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;
    const villano = await Villano.findOne({ nombre });

    if (!villano) return res.status(404).json({ error: "Villano no encontrado" });

    res.json(villano);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//3. Agregar un nuevo villano
router.post("/villanos", async (req, res) => {
  try {
    const { nombre, franquicia, poderes, derrotado_por } = req.body;

    const nuevoVillano = new Villano({ nombre, franquicia, poderes, derrotado_por });
    await nuevoVillano.save();

    res.json(nuevoVillano);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//4. Actualizar un villano por nombre
router.put("/villanos/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;
    const { franquicia, poderes, derrotado_por } = req.body;

    const villanoActualizado = await Villano.findOneAndUpdate(
      { nombre },
      { franquicia, poderes, derrotado_por },
      { new: true }
    );

    if (!villanoActualizado) return res.status(404).json({ error: "Villano no encontrado" });

    res.json(villanoActualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//5. Eliminar un villano por nombre
router.delete("/villanos/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;
    const villanoEliminado = await Villano.findOneAndDelete({ nombre });

    if (!villanoEliminado) return res.status(404).json({ error: "Villano no encontrado" });

    res.json({ mensaje: "Villano eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//6. Obtener villanos por franquicia
router.get("/villanos/franquicia/:franquicia", async (req, res) => {
    try {
      const { franquicia } = req.params;
      const villanos = await Villano.find({ franquicia });
  
      if (villanos.length === 0) return res.status(404).json({ error: "No se encontraron villanos de esta franquicia" });
  
      res.json(villanos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;
