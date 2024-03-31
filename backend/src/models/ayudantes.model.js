"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Cada Emprendimiento tiene un arreglo de Ayudantes. Los ayudantes pueden ser amigos o parientes del emprendedor, por lo que pueden o no ser de la universidad.

const ayudantesSchema = new mongoose.Schema({

  nombre: {
    type: String,
    required: true,
    maxLenght: 100,
  },
  rut: {
    type: String,
    required: true,
  },
  emprendedorId: {
    type: Schema.Types.ObjectId,
    ref: "Emprendedor",
  },
});

const Ayudantes = mongoose.model("Ayudantes", ayudantesSchema);

module.exports = Ayudantes;
