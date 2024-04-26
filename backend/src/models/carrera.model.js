"use strict";
const mongoose = require("mongoose");
const Constants = require("../constants/carrera.constants");

const carreraSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    facultad: {
      type: String,
      required: true,
      enum: Constants.Facultades,
    },
    sede: {
      type: String,
      enum: Constants.Sedes,
      default: "Concepción",
    },
  },
  {
    versionKey: false,
  },
);

const Carrera = mongoose.model("Carrera", carreraSchema);

module.exports = Carrera;
