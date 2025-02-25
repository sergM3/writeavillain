const mongoose = require("mongoose");

const VillanoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  franquicia: String,
  poderes: [String],
  derrotado_por: String
});

const Villano = mongoose.model("Villains", VillanoSchema, "Villains"); //Forzar el nombre correcto
module.exports = Villano;
