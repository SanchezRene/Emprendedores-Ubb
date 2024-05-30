"use strict";

const ActividadService = require("../services/actividad.service");
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
    res.json({ message: "Actividad eliminada correctamente" , actividad});
  } catch (error) {
    handleError(error, "actividades.controller -> deleteActividad");
    respondError(req, res, 500, "Error al eliminar la actividad");
  }
}

// función para inscribir emprendedores
async function inscribirEmprendedor(req, res) {
  try {
    const { userId, activityId } = req.body; // Asumimos que los IDs se envían en el cuerpo de la solicitud

    const [actividad, error] = await ActividadService.inscribirEmprendedor(activityId, userId);
    if (error) {
      return respondError(req, res, 400, error);
    }

    // Enviar notificación
    await sendNotification(userId, activityId);

    res.status(200).json(actividad);
  } catch (error) {
    handleError(error, "actividades.controller -> inscribirEmprendedor");
    respondError(req, res, 500, "Error al inscribir emprendedor en la actividad");
  }
}

// función para enviar notificaciones
async function sendNotification(userId, activityId) {
  try {
    const user = await User.findById(userId);
    const activity = await Actividad.findById(activityId);

    if (!user || !activity) {
      throw new Error('Usuario o actividad no encontrados');
    }

    const emailReport = {
      email: user.email,
      mensaje: `Usted está inscrito en la actividad: ${activity.nombre}. Esto es un recordatorio para que asista el ${activity.fechaInicio.toLocaleDateString()} a la hora ${activity.horaInicio.toLocaleTimeString()}.`,
    };
    await enviarCorreo(emailReport);
  } catch (error) {
    console.error('Error al enviar notificación:', error);
  }
}

module.exports = {
  getAllActividades,
  getActividadById,
  createActividad,
  updateActividad,
  deleteActividad,
  inscribirEmprendedor, 
  sendNotification, 
};
