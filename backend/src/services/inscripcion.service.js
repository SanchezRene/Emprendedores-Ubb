"use strict";
const Carrera = require("../models/carrera.model");
const Ayudantes = require("../models/ayudantes.model");
const Productos = require("../models/productos.model");
const Emprendedor = require("../models/emprendedor.model");
const Inscripcion = require("../models/inscripcion.model");
const User = require("../models/user.model");
const { handleError } = require("../utils/errorHandler");

async function getInscripciones() {
  try {
    const inscripciones = await Inscripcion.find();
    if (inscripciones == 0)
      return [null, "La colección de inscripciones está vacía"];

    return [inscripciones, null];
  } catch (error) {
    handleError(error, "inscripcion.service -> getInscripciones");
  }
}

async function getInscripcionById(id) {
  try {
    const inscripcion = await Inscripcion.findById(id);
    if (!inscripcion) return [null, "Inscripción no encontrada"];

    return [inscripcion, null];
  } catch (error) {
    handleError(error, "inscripcion.service -> getInscripcionById");
  }
}

async function getInscripcionesByEmprendedorId(emprendedorId) {
  try {
    const inscripciones = await Inscripcion.find({
      emprendedorId: emprendedorId,
    });
    if (inscripciones.length === 0) {
      return [
        null,
        "No se encontraron inscripciones para el emprendedor especificado",
      ];
    }
    return [inscripciones, null];
  } catch (error) {
    handleError(
      error,
      "inscripcion.service -> getInscripcionesByEmprendedorId",
    );
  }
}

async function getInscripcionesByUserId(userId) {
  try {
    const inscripciones = await Inscripcion.find({ userId: userId });
    if (inscripciones.length === 0) {
      return [
        null,
        "No se encontraron inscripciones para el usuario especificado",
      ];
    }
    return [inscripciones, null];
  } catch (error) {
    handleError(error, "inscripcion.service -> getInscripcionesByUserId");
  }
}

async function createInscripcion(inscripcion) {
  try {
    const { userId, emprendedorId, productosId, ayudantesId } = inscripcion;

    //Verificar que el usuario exista
    const user = await User.findById(userId);
    if (!user) return [null, "El usuario no existe"];

    //Verificar que el emprendedor exista
    const emprendedor = await Emprendedor.findById(emprendedorId);
    if (!emprendedor) return [null, "El emprendedor no existe"];

    //Verificar que los productos existan
    const productos = await Productos.find({ _id: { $in: productosId } });
    if (productos.length !== productosId.length)
      return [null, "Uno o más productos no existen"];

    //Verificar que los ayudantes existan
    const ayudantes = await Ayudantes.find({ _id: { $in: ayudantesId } });
    if (ayudantes.length !== ayudantesId.length)
      return [null, "Uno o más ayudantes no existen"];

    // Crear una nueva inscripción
    const newInscripcion = new Inscripcion({
      userId,
      emprendedorId,
      productosId,
      ayudantesId,
      estado: "pendiente",
    });
    await newInscripcion.save();

    return [newInscripcion, null];
  } catch (error) {
    handleError(error, "inscripcion.service -> createInscripcion");
  }
}

/*==================================================================== */
/**(
 * OJO: se debe modificar esta funcion para que se pueda actualizar el estado de la inscripcion, verificando que el estado cumpla con los valores permitidos (pendiente, aprobado, rechazado) y que es realizada por un rol permitido (admin, encargado). También se debe verificar que un usuario no pueda actualizar la inscripción de otro usuario.
 * ) */
/*==================================================================== */


async function updateInscripcion(id, inscripcion) {
  try {
    const { userId, estado } = inscripcion;

    //Verificar que la inscripción exista y actualizarla
    const updatedInscripcion = await Inscripcion.findByIdAndUpdate
      (id, {
        userId,
        estado,
      },
      { new: true }
    );  
    
    if (!updatedInscripcion) return [null, "Inscripción no se actualizó"];

    return [updatedInscripcion, null];
  } catch (error) {
    handleError(error, "inscripcion.service -> updateInscripcion");
  }
}

async function deleteInscripcion(id) {
  try {
    const inscripcion = await Inscripcion.findByIdAndDelete(id);
    if (!inscripcion) return [null, "Inscripción no encontrada"];

    return [inscripcion, null];
  } catch (error) {
    handleError(error, "inscripcion.service -> deleteInscripcion");
  }
}

module.exports = {
  getInscripciones,
  getInscripcionById,
  getInscripcionesByEmprendedorId,
  getInscripcionesByUserId,
  createInscripcion,
  updateInscripcion,
  deleteInscripcion,
};