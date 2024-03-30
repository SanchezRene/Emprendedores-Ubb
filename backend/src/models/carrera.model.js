"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carreraSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  facultad: {
    type: String,
    required: true,
    num: [
      "Arquitectura, Construccion y Diseño",
      "Ingeniería",
      "Ciencias Empresariales",
      "Educación y Humanidades",
      "Ciencias de la Salud y de los Alimentos",
      "Ciencias",
    ],
    default: "pendiente",
  },
  sede: {
    type: String,
    enum: ["Concepcion", "Chillan"],
    default: "Concepcion",
  },
});

const Carrera = mongoose.model("Carrera", carreraSchema);

module.exports = Carrera;
