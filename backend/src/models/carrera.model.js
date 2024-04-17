"use strict";
const mongoose = require("mongoose");

const carreraSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  facultad: {
    type: String,
    required: true,
    num: [
      "Arquitectura, Construcción y Diseño",
      "Ingeniería",
      "Ciencias Empresariales",
      "Educación y Humanidades",
      "Ciencias",
    ],
  },
  sede: {
    type: String,
    enum: ["Concepción"],
    default: "Concepción",
  },
});

const Carrera = mongoose.model("Carrera", carreraSchema);

module.exports = Carrera;
