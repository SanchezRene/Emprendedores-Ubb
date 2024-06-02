"use strict";

const ActividadService = require("../services/actividad.service");
const Emprendedor = require("../models/emprendedor.model");
const User = require("../models/user.model");
const { respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const { enviarCorreo } = require("../utils/email");

async function getAllActividades(req, res) {
  try {
    const [actividades, error] = await ActividadService.getAllActividades();
    if (error) {
      return respondError(req, res, 500, error);
    }
    res.json(actividades);
  } catch (error) {
    handleError(error, "actividades.controller -> getAllActividades");
    respondError(req, res, 500, "Error al obtener las actividades");
  }
}

async function getActividadById(req, res) {
  try {
    const { id } = req.params;
    const [actividad, error] = await ActividadService.getActividadById(id);
    if (error) {
      return respondError(req, res, 404, error);
    }
    res.json(actividad);
  } catch (error) {
    handleError(error, "actividades.controller -> getActividadById");
    respondError(req, res, 500, "Error al obtener la actividad");
  }
}

async function createActividad(req, res) {
  try {
    const { body } = req;
    const [actividad, error] = await ActividadService.createActividad(body);
    if (error) {
      return respondError(req, res, 400, error);
    }
    res.status(201).json(actividad);
  } catch (error) {
    handleError(error, "actividades.controller -> createActividad");
    respondError(req, res, 500, "Error al crear la actividad");
  }
}

async function updateActividad(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;
    const [actividad, error] = await ActividadService.updateActividadById(id, body);
    if (error) {
      return respondError(req, res, 404, error);
    }
    res.json(actividad);
  } catch (error) {
    handleError(error, "actividades.controller -> updateActividad");
    respondError(req, res, 500, "Error al actualizar la actividad");
  }
}

async function deleteActividad(req, res) {
  try {
    const { id } = req.params;
    const [actividad, error] = await ActividadService.deleteActividad(id);
    if (error) {
      return respondError(req, res, 404, error);
    }
    res.json({ message: "Actividad eliminada correctamente", actividad });
  } catch (error) {
    handleError(error, "actividades.controller -> deleteActividad");
    respondError(req, res, 500, "Error al eliminar la actividad");
  }
}

// Función para inscribir emprendedores
async function inscribirYNotificarEmprendedor(req, res) {
  try {
    const { emprendedorId, _id } = req.body;

    const [actividad, error] = await ActividadService.inscribirEmprendedor(_id, emprendedorId);
    if (error) {
      return respondError(req, res, 400, error);
    }

    // Enviar notificación
    const notificacionError = await sendNotification(emprendedorId, actividad);
    if (notificacionError) {
      return respondError(req, res, 500, notificacionError);
    }

    res.status(200).json(actividad);
  } catch (error) {
    handleError(error, "actividades.controller -> inscribirYNotificarEmprendedor");
    respondError(req, res, 500, "Error al inscribir emprendedor en la actividad");
  }
}

// Función para enviar notificaciones
async function sendNotification(emprendedorId, actividad) {
  try {
    const emprendedor = await Emprendedor.findById(emprendedorId).populate('userId');
    if (!emprendedor) {
      throw new Error('Emprendedor no encontrado');
    }

    const user = await User.findById(emprendedor.userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const emailReport = {
      email: 'testemprendedoresubb@gmail.com', // Correo registrado en Resend para pruebas
      mensaje: `Usted está inscrito en la actividad: ${actividad.nombre}. Esto es un recordatorio para que asista el ${new Date(actividad.fechaInicio).toLocaleDateString()} en el horario: ${new Date(actividad.horaInicio).toLocaleTimeString()}.`,
    };
    await enviarCorreo(emailReport);
    return null;
  } catch (error) {
    console.error('Error al enviar notificación:', error);
    return error.message;
  }
}

module.exports = {
  getAllActividades,
  getActividadById,
  createActividad,
  updateActividad,
  deleteActividad,
  inscribirYNotificarEmprendedor,
  sendNotification,
};

//