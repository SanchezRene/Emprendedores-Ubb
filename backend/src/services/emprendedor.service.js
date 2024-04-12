"use strict";
const Carrera = require("../models/carrera.model");
const Ayudantes = require("../models/ayudantes.model");
const Productos = require("../models/productos.model");
const Emprendedor = require("../models/emprendedor.model");
const User = require("../models/user.model");
const { handleError } = require("../utils/errorHandler");

async function getEmprendedores() {
  try {
    const emprendedores = await Emprendedor.find();
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

async function getEmprendedorByUserId(userId) {
  try {
    const emprendedor = await Emprendedor.findOne({ userId });
    if (!emprendedor) return [null, "Emprendedor no encontrado"];

    return [emprendedor, null];
  } catch (error) {
    handleError(error, "emprendedores.service -> getEmprendedorByUserId");
  }
}

async function createEmprendedor(emprendedor) {
  try {
    
    const { userId, nombre_completo, rut, celular, carreraId, nombre_puesto } = emprendedor;

   //Verificar que el usuario exista
    const user = await User.findById(userId);
    if (!user) return [null, "El usuario no existe"];

    //verificar que el user no tenga un emprendedor asociado
    const EmprendedorUser = await Emprendedor.findOne({ userId: userId });
    if (EmprendedorUser) return [null, "El usuario ya tiene un emprendedor asociado"];
   
    //Verificar que no exista un emprendedor con el mismo rut
    const EmprendedorFound = await Emprendedor.findOne({ rut });
    if (EmprendedorFound) return [null, "Ya existe un emprendedor con el mismo rut"];

    //Verificar que la carrera exista
    const carrera = await Carrera.findById(carreraId);
    if (!carrera) return [null, "La carrera no existe"];

    // Crear un nuevo emprendedor
    const newEmprendedor = new Emprendedor({
      userId,
      nombre_completo,
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
    const {userId ,nombre_completo, rut, celular, carreraId, nombre_puesto,  } = emprendedor;

    //verificar que el usuario exista
    const user = await User.findById(userId);
    if (!user) return [null, "El usuario no existe"];

    //Verificar el emprendedor exista   
    const EmprendedorFound = await Emprendedor.findById(id);
    if (!EmprendedorFound) return [null, "El emprendedor no existe"];

    // Asegurarnos de que se se actualiza el emprendedor del mismo usuario
    if (userId !== EmprendedorFound.userId.toString()) {
      return [null, "No se puede actualizar el emprendedor a un usuario distinto"];
    }
    //verificar que no exista un emprendedor con el mismo rut
    const EmprendedorDuplicate = await Emprendedor.findOne({ rut });
    if (EmprendedorDuplicate && EmprendedorDuplicate.id.toString() !== id) return [null, "Error, el rut ya existe en otro emprendedor"];

    //Verificar que la carrera exista
    const carrera = await Carrera.findById(carreraId);
    if (!carrera) return [null, "La carrera no existe"];

    const updatedEmprendedor = await Emprendedor.findByIdAndUpdate(
      id,
      {
        nombre_completo,
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
  getEmprendedorByUserId,
  createEmprendedor,
  updateEmprendedor,
  deleteEmprendedorById,
  deleteFullEmprendedorById,
};