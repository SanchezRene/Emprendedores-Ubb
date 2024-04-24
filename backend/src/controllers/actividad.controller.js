"use strict";

const ActividadService = require("../services/actividad.service");
const { respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

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
    res.json({ message: "Actividad eliminada correctamente" });
  } catch (error) {
    handleError(error, "actividades.controller -> deleteActividad");
    respondError(req, res, 500, "Error al eliminar la actividad");
  }
}

module.exports = {
  getAllActividades,
  getActividadById,
  createActividad,
  updateActividad,
  deleteActividad,
};
