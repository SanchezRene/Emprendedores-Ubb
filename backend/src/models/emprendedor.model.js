"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//modelo de datos para emprendedores. Se crea un registro en la colección emprendedores.

const emprendedorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    maxLenght: 100,
  },
  rut: {
    type: String,
    required: true,
  },
  celular: {
    type: Number,
    required: true,
    minLenght: 9,
    maxLenght: 15,
  },
  idCarrera: {
    type: Schema.ObjectId,
    ref: "Carrera",
    required: true,
  },
  nombre_puesto: {
    type: String,
    required: true,
    maxLenght: 100,
  },
  //arreglo de productos que vende el emprendedor
  idProductos: {
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
  //arreglo de ayudantes que trabajan con el emprendedor
  idAyudantes: {
    type: [
      {
        type: Schema.ObjectId,
        ref: "Ayudantes",
      },
    ],
    required: false,
    maxItems: 3,
  },
});

const Emprendedor = mongoose.model("Emprendedor", emprendedorSchema);

module.exports = Emprendedor;
