"use strict";
const Ayudantes = require("../models/ayudantes.model");
const Emprendedor = require("../models/emprendedor.model");
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
/** la función find espera un objeto que especifica los criterios de búsqueda, donde cada clave representa un campo en la colección y cada valor representa el valor que se está buscando en ese campo.  */
async function getAyudantesByEmprendedorId(emprendedorId) {
  try {
    const emprendedor = await Emprendedor.findById(emprendedorId);
    if (!emprendedor) return [null, "No se encontró el emprendedor"];

    const ayudantes = await Ayudantes.find({ emprendedorId: emprendedorId });
    if (ayudantes.length === 0) return [null, "Emprendedor tiene 0 ayudantes"];

    return [ayudantes, null];
  } catch (error) {
    handleError(error, "ayudantes.service -> getAyudantesByEmprendedorId");
  }
}

async function createAyudante(ayudante) {
  try {
    const { nombre, rut, emprendedorId } = ayudante;

    const emprendedor = await Emprendedor.findById(emprendedorId);
    if (!emprendedor) return [null, "Emprendedor no encontrado"];

    const ayudanteFound = await Ayudantes.findOne({ rut: ayudante.rut });
    if (ayudanteFound) return [null, "El ayudante ya existe"];

    const countAyudantes = await Ayudantes.countDocuments({ emprendedorId });
    if (countAyudantes >= 3)
      return [null, "El emprendedor excede el máximo de ayudantes permitidos"];

    const newAyudante = new Ayudantes({
      nombre,
      rut,
      emprendedorId,
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

    const emprendedor = await Emprendedor.findById(emprendedorId);
    if (!emprendedor) return [null, "Emprendedor no encontrado"];

    const updatedAyudante = await Ayudantes.findByIdAndUpdate(
      id,
      { nombre, rut, emprendedorId },
      { new: true },
    );

    if (!updatedAyudante) return [null, "Ayudante no se actualizó"];

    return [updatedAyudante, null];
  } catch (error) {
    handleError(error, "ayudantes.service -> updateAyudanteById");
  }
}

async function deleteAyudante(id) {
  try {
    const deletedAyudante = await Ayudantes.findByIdAndDelete(id);
    if (!deletedAyudante) return [null, "Ayudante no eliminado"];

    const emprendedor = await Emprendedor.findById(
      deletedAyudante.emprendedorId,
    );
    if (!emprendedor) return [null, "Emprendedor no encontrado"];

    //borrar ayudante del array de ayudantesId
    emprendedor.ayudantesId.pull(deletedAyudante._id);
    await emprendedor.save();

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
  deleteAyudante,
};
