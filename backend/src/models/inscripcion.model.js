"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Subesquema para almacenar los cambios de estado
const estadoHistorialSchema = new mongoose.Schema({
  estado: {
    type: String,
    enum: ["pendiente", "aprobada", "rechazada", "sin inscripciones"],
    required: true,
  },
  fechaCambio: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

// Esquema principal de inscripciones
const inscripcionSchema = new mongoose.Schema(
  {
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
      required: true,
    },
    fechaInscripcion: {
      type: Date,
      default: Date.now,
      required: true,
    },
    historialEstados: [estadoHistorialSchema], // Array para guardar el historial de estados
  },
  {
    versionKey: false,
  }
);

// Middleware para actualizar el historial de estados
inscripcionSchema.pre("save", function (next) {
  // Si el estado es nuevo o ha cambiado, agregarlo al historial
  if (this.isModified("estado")) {
    this.historialEstados.push({
      estado: this.estado,
      fechaCambio: new Date(),
    });
  }
  next();
});

const Inscripcion = mongoose.model("Inscripcion", inscripcionSchema);

module.exports = Inscripcion;
