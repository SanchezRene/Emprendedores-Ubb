"use strict";
const Ayudantes = require("../models/ayudantes.model");
const { handleError } = require("../utils/errorHandler");


// 1.- Ver todos los ayudantes
async function getAyudantes() {
  try {
    const ayudantes = await Ayudantes.find();
    if (ayudantes == 0) return [null, "La colección de ayudantes está vacía"];

    return [ayudantes, null];
  } catch (error) {
    handleError(error, "ayudantes.service -> getAyudantes");
  }
}

// 2.- Ver un ayudante por id
async function getAyudanteById(id) {
  try {
    const ayudante = await Ayudantes.findById(id);
    if (!ayudante) return [null, "Ayudante no encontrado"];

    return [ayudante, null];
  } catch (error) {
    handleError(error, "ayudantes.service -> getAyudanteById");
  }
}

// 3.- Ver ayudantes por emprendedor
async function getAyudantesByEmprendedorId(emprendedorId) {
  try {
    const ayudantes = await Ayudantes.find({ emprendedorId });
    if (ayudantes.length === 0) return [null, "No se encontraron ayudantes para este emprendedor"];

    return [ayudantes, null];
  } catch (error) {
    handleError(error, "ayudantes.service -> getAyudantesByEmprendedorId");
  }
}


async function createAyudante(ayudante) {
  try {
    const { nombre, rut, emprendedorId } = ayudante;

    const ayudanteFound = await Ayudantes.findOne({ rut: ayudante.rut });
    if (ayudanteFound) return [null, "El ayudante ya existe"];

    const countAyudantes = await Ayudantes.countDocuments({ emprendedorId });
    if (countAyudantes >= 3) return [null, "El emprendedor ya tiene el máximo de ayudantes permitidos"];

    const newAyudante = new Ayudantes({
      nombre,
      rut,
      emprendedorId
    });
    await newAyudante.save();

    return [newAyudante, null];
  } catch (error) {
    handleError(error, "ayudantes.service -> createAyudante");
  }
}


async function updateAyudanteById(id, ayudante) {
  try {
    const { nombre, rut, emprendedorId } = ayudante;

    const updatedAyudante = await Ayudantes.findByIdAndUpdate(
      id,
      { nombre, rut, emprendedorId },
      { new: true }
    );

    if (!updatedAyudante) return [null, "Ayudante no se actualizó"];

    return [updatedAyudante, null];
  } catch (error) {
    handleError(error, "ayudantes.service -> updateAyudante");
  }
}


async function deleteAyudante(id) {
  try {
    const deletedAyudante = await Ayudantes.findByIdAndDelete(id);
    if (!deletedAyudante) return [null, "Ayudante no eliminado"];

    return [deletedAyudante, null];
  } catch (error) {
    handleError(error, "ayudantes.service -> deleteAyudante");
  }
}

module.exports = {
  getAyudantes,
  getAyudanteById,
  getAyudantesByEmprendedorId,
  createAyudante,
  updateAyudanteById,
  deleteAyudante
};