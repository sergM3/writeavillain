const mongoose = require("mongoose");

const ComentarioSchema = new mongoose.Schema({
  villano: { type: String, required: true },
  usuario: { type: String, required: true },
  comentario: { type: String, required: true },
  fecha: { type: Date, default: Date.now } // Se genera automáticamente si no se proporciona
});

//Forzar el uso de la colección "Comments" en MongoDB
const Comentario = mongoose.model("Comments", ComentarioSchema, "Comments");

module.exports = Comentario;
