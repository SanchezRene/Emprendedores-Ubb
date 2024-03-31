"use strict";
// Importa el modelo de datos 'carerra'
const Ayudantes = require("../models/ayudantes.model");
const { handleError } = require("../utils/errorHandler");

async function getAyudantes() {
  try {
    const ayudantes = await Ayudantes.find();
    if (ayudantes == 0) return [null, "La colección de ayudantes está vacía"];

    return [ayudantes, null];
  } catch (error) {
    handleError(error, "ayudantes.service -> getAyudantes");
  }
}

async function createAyudante(ayudante) {
  try {
    const { nombre, rut } = ayudante;

    const ayudanteFound = await Ayudantes.findOne({ rut: ayudante.rut });
    if (ayudanteFound) return [null, "El ayudante ya existe"];

    const newAyudante = new Ayudantes({
      nombre,
      rut,
    });
    await newAyudante.save();

    return [newAyudante, null];
  } catch (error) {
    handleError(error, "ayudantes.service -> createAyudante");
  }
}

async function getAyudanteById(id) {
  try {
    const ayudante = await Ayudantes.findById(id);
    if (!ayudante) return [null, "Ayudante no encontrado"];

    return [ayudante, null];
  } catch (error) {
    handleError(error, "ayudantes.service -> getAyudanteById");
  }
}