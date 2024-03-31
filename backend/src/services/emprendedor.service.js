"use strict";
const Carrera = require("../models/carrera.model");
const Ayudantes = require("../models/ayudantes.model");
const Productos = require("../models/productos.model");
const Emprendedor = require("../models/emprendedor.model");
const { handleError } = require("../utils/errorHandler");

async function getEmprendedores() {
  try {
    const emprendedores = await Emprendedores.find();
    if (emprendedores == 0)
      return [null, "La colección de emprendedores está vacía"];

    return [emprendedores, null];
  } catch (error) {
    handleError(error, "emprendedores.service -> getEmprendeores");
  }
}

async function getEmprendedorById(id) {
  try {
    const emprendedor = await Emprendedor.findById(id);
    if (!emprendedor) return [null, "Emprendedor no encontrado"];

    return [emprendedor, null];
  } catch (error) {
    handleError(error, "emprendedores.service -> getEmprendedorById");
  }
}

async function createEmprendedor(emprendedor) {
  try {
    const { nombre, rut, celular, carreraId, nombre_puesto } = emprendedor;

    //Verificar que no exista un emprendedor con el mismo rut
    const EmprendedorFound = await Emprendedor.findOne({ rut });
    if (EmprendedorFound) return [null, "El emprendedor ya existe"];

    //Verificar que la carrera exista
    const carrera = await Carrera.findById(carreraId);
    if (!carrera) return [null, "La carrera no existe"];

    // Crear un nuevo emprendedor
    const newEmprendedor = new Emprendedor({
      nombre,
      rut,
      celular,
      carreraId,
      nombre_puesto,
    });
    await newEmprendedor.save();

    return [newEmprendedor, null];
  } catch (error) {
    handleError(error, "emprendedor.service -> createEmprendedor");
  }
}

async function updateEmprendedor(id, emprendedor) {
  try {
    const { nombre, rut, celular, carreraId, nombre_puesto,  } = emprendedor;

    //Verificar el emprendedor exista   
    const EmprendedorFound = await Emprendedor.findById(id);
    if (!EmprendedorFound) return [null, "El emprendedor no existe"];

    //verificar que no exista un emprendedor con el mismo rut
    const EmprendedorDuplicate = await Emprendedor.findOne({ rut });
    if (EmprendedorDuplicate) return [null, "El emprendedor ya existe"];

    //Verificar que la carrera exista
    const carrera = await Carrera.findById(carreraId);
    if (!carrera) return [null, "La carrera no existe"];

    const updatedEmprendedor = await Emprendedor.findByIdAndUpdate(
      id,
      {
        nombre,
        rut,
        celular,
        carreraId,
        nombre_puesto,
      },
      { new: true }
    );

    return [updatedEmprendedor, null];
  } catch (error) {
    handleError(error, "emprendedor.service -> updateEmprendedor");
  }
}

async function deleteEmprendedorById(id) {
    try {
        const deletedEmprendedor = await Emprendedor.findByIdAndDelete(id);
        if (!deletedEmprendedor) return [null, "Emprendedor no encontrado"];

        return [deletedEmprendedor, null];
    } catch (error) {
        handleError(error, "emprendedor.service -> deleteEmprendedorById");
    }
}

async function deleteFullEmprendedorById(id) {
    try {
        const deletedEmprendedor = await Emprendedor.findByIdAndDelete(id);
        if (!deletedEmprendedor) return [null, "Emprendedor no encontrado"];

        // Borrar ayudantes
        await Ayudantes.deleteMany({ emprendedorId: id });

        // Borrar productos
        await Productos.deleteMany({ emprendedorId: id });

        return [deletedEmprendedor, null];
    } catch (error) {
        handleError(error, "emprendedor.service -> deleteFullEmprendedorById");
    }
}

module.exports = {
  getEmprendedores,
  getEmprendedorById,
  createEmprendedor,
  updateEmprendedor,
  deleteEmprendedorById,
  deleteFullEmprendedorById,
};