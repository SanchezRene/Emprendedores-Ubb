"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    estado: {
      type: String,
      enum: ["pendiente", "aprobada", "rechazada", "sin inscripciones"],
      default: "sin inscripciones",
    },
    fechaInscripcion: {
      type: Date,
      default: Date.now(),
    },
  });
  
  const Inscripcion = mongoose.model("Inscripcion", inscripcionSchema);
  
  module.exports = Inscripcion;