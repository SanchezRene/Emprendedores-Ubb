"use strict";
const { verify } = require("jsonwebtoken");
// Importa el modelo de datos 'carerra'
const Carrera = require("../models/carrera.model");
const Emprendedor = require("../models/emprendedor.model");
const { handleError } = require("../utils/errorHandler");

// Funciones con lógica de interacción con la base de datos en MongoDB

/*  
    - Async: operaciones que tardan tiempo en completarse sin bloquear el hilo de ejecución principal.
    - Await: Esperar a que la promesa se resuelva y devuelva el resultado.
    - Promesas: objetos que representan el resultado eventual (éxito o fracaso)
*/

async function getCarreras() {
  try {
    //devuelve un array con los documentos de la colección "Carrera"
    const carreras = await Carrera.find();
    //si el array está vacío, devuelve un mensaje de error
    if (carreras == 0) return [null, "No hay carreras"];

    return [carreras, null];
  } catch (error) {
    handleError(error, "carreras.service -> getCarreras");
  }
}

async function getCarreraById(id) {
  try {
    //se realiza una búsqueda por el identificador único, pasando el valor del identificador directamente como argumento.
    const carrera = await Carrera.findById(id);
    if (!carrera) return [null, "Carrera no encontrada"];

    return [carrera, null];
  } catch (error) {
    handleError(error, "carreras.service -> getCarreraById");
  }
}

async function getCarreraByEmprendedorId(emprendedorId) {
  try {

    const emprendedor = await Emprendedor.findById(emprendedorId);
    if (!emprendedor) return [null, "Emprendedor no encontrado"];

    const carrera = await Carrera.findOne({emprendedorId: emprendedorId });
    if (!carrera) return [null, "Emprendedor sin carrera"];

    return [carrera, null];
  } catch (error) {
    handleError(error, "carreras.service -> getCarreraByEmprendedorId");
  }
}

async function createCarrera(carrera) {
  try {
    //se pasa un objeto "carrera" como argumento, luego se desestructura para obtener los campos "titulo", "facultad" y "sede"
    const { titulo, facultad, sede } = carrera;

    const carreraFound = await Carrera.findOne({ nombre: carrera.titulo });
    if (carreraFound) return [null, "La carrera ya existe"];

    const newCarrera = new Carrera({
      titulo,
      facultad,
      sede,
    });
    await newCarrera.save();

    return [newCarrera, null];
  } catch (error) {
    handleError(error, "carreras.service -> createCarrera");
  }
}

async function updateCarreraById(id, updatedCarrera) {
  try {
    const carreraFound = await Carrera.findById(id);
    if (!carreraFound) return [null, "Carrera no encontrada"];

    //Devuelve el documento modificado después de la actualización.
    const carrera = await Carrera.findByIdAndUpdate(id, updatedCarrera, {
      new: true,
    });
    if (!carrera) return [null, "Carrera no modificada"];

    return [carrera, null];
  } catch (error) {
    handleError(error, "carreras.service -> updateCarreraById");
  }
}

async function deleteCarreraById(id) {
  try {
    const carreraFound = await Carrera.findById(id);
    if (!carreraFound) return [null, "Carrera no encontrada"];

    //verificar que no haya emprendedores asociados a la carrera
    const emprendedor = await Emprendedor.findOne({ carreraId: id });
    if (emprendedor) return [null, "Carrera tiene emprendedores asociados"];

    const carrera = await Carrera.findByIdAndDelete(id);
    if (!carrera) return [null, "Carrera no eliminada"];

    return [carrera, null];
  } catch (error) {
    handleError(error, "carreras.service -> deleteCarreraById");
  }
}

module.exports = {
  getCarreras,
  getCarreraById,
  getCarreraByEmprendedorId,
  createCarrera,
  updateCarreraById,
  deleteCarreraById,
};
