const mongoose = require("mongoose");

const actividadSchema = new mongoose.Schema({
  emprendedorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Emprendedor",
  },
  productoId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Productos",
  },
  categoria: {
    type: String,
    required: true,
    enum: ["Reunión", "Taller", "Evento", "Otro"],
  },
  nombre: {
    type: String,
    required: true,
    maxLength: 100,
  },
  descripcion: {
    type: String,
    required: true,
    maxLength: 255,
  },
  fechaInicio: {
    type: Date,
    required: true,
  },
  fechaFin: {
    type: Date,
    required: true,
  },
});

const Actividad = mongoose.model("Actividad", actividadSchema);

module.exports = Actividad;
