"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//usuario envía formulario de inscripción. Se crea un registro en la colección inscripciones.

const inscripcionSchema = new mongoose.Schema({
  userId: {
    type: Schema.ObjectId,
    ref: "user",
    required: true,
  },
  emprendedorId: {
    type: Schema.ObjectId,
    ref: "Emprendedor",
    required: true,
  },
  productosId: {
    type: [
      {
        type: Schema.ObjectId,
        ref: "Productos",
      },
    ],
    required: true,
    minItems: 1,
    maxItems: 10,
  },
  ayudantesId: {
    type: [
      {
        type: Schema.ObjectId,
        ref: "Ayudantes",
      },
    ],
    required: true,
    default: [],
    maxItems: 3,
  },
  estado: {
    type: String,
    enum: ["pendiente", "aprobada", "rechazada", "sin inscripciones"],
    default: "sin inscripciones",
    required: true,
  },
  fechaInscripcion: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const Inscripcion = mongoose.model("Inscripcion", inscripcionSchema);

module.exports = Inscripcion;
