"use strict";

const Emprendedor = require("../models/emprendedor.model");
const Inscripcion = require("../models/inscripcion.model");
const User = require("../models/user.model");
const { handleError } = require("../utils/errorHandler");
const moment = require("moment");

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

async function getInscripcionesSummary() {
  try {
    const inscripciones = await Inscripcion.find();
    if (inscripciones.length === 0) {
      return [null, "La colección de inscripciones está vacía"];
    }

    const Data = await Promise.all(
      inscripciones.map(async (inscripcion) => {
        let emprendedor = await Emprendedor.findById(
          inscripcion.emprendedorId.toString(),
        );

        let fechaChilena = moment(inscripcion.fechaInscripcion).format(
          "HH:mm DD-MM-YYYY",
        );

        return {
          nombre: emprendedor.nombre_completo,
          estado: inscripcion.estado,
          inscripcionId: inscripcion._id,
          emprendedorId: inscripcion.emprendedorId,
          fechaInscripcion: fechaChilena,
        };
      }),
    );

    const ArregloInscripciones = [
      { totalInscripciones: Data.length },
      { Data },
    ];

    return [ArregloInscripciones, null];
  } catch (error) {
    handleError(error, "inscripcion.service -> getInscripciones");
    return [null, error.message];
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

async function getInscripcionByEmail(email) {
  try {

    const user = await User.findOne({ email: email });
    if (!user) return [null, "Usuario no encontrado"];
    const inscripciones = await Inscripcion.find({ userId: user._id });
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
    const { email, emprendedorId, estado } = inscripcion;

    //Verificar que el usuario exista
    const user = await User.findOne({ email: email });
    if (!user) return [null, "El usuario no existe"];

    //Verificar que el emprendedor exista
    const emprendedor = await Emprendedor.findById(emprendedorId);
    if (!emprendedor) return [null, "El emprendedor no existe"];

    // verificar que no exista una inscripción para el mismo emprendedor y usuario
    const inscripciones = await Inscripcion.find({
      userId: user._id,
      emprendedorId: emprendedorId,
    });
    if (inscripciones.length > 0) {
      return [null, "Ya existe una inscripción para este emprendedor"];
    }

    //verificar que el emprendedor tenga al menos 1 producto
    if (emprendedor.productosId.length === 0) {
      return [null, "El emprendedor no tiene productos registrados"];
    }

    // Crear una nueva inscripción
    const newInscripcion = new Inscripcion({
      userId: user._id,
      emprendedorId: emprendedorId,
      estado: estado,
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
    const updatedInscripcion = await Inscripcion.findByIdAndUpdate(
      id,
      {
        userId,
        estado,
      },
      { new: true },
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
  getInscripcionByEmail,
  getInscripcionesSummary,
  createInscripcion,
  updateInscripcion,
  deleteInscripcion,
};
