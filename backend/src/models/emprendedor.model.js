"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//modelo de datos para emprendedores. Se crea un registro en la colección emprendedores.

const emprendedorSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    nombre_completo: {
      type: String,
      required: true,
      maxLenght: 100,
    },
    rut: {
      type: String,
      required: true,
    },
    celular: {
      type: String,
      required: true,
      minLenght: 9,
      maxLenght: 15,
    },
    carreraId: {
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
    productosId: {
      type: [
        {
          type: Schema.ObjectId,
          ref: "Productos",
        },
      ],
      required: true,
      default: [],
      maxItems: 100,
    },
    //arreglo de ayudantes que trabajan con el emprendedor
    ayudantesId: {
      type: [
        {
          type: Schema.ObjectId,
          ref: "Ayudantes",
        },
      ],
      required: false,
      default: [],
      maxItems: 3,
    },
  },
  {
    versionKey: false,
  },
);

const Emprendedor = mongoose.model("Emprendedor", emprendedorSchema);

module.exports = Emprendedor;
