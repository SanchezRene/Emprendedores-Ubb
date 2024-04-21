"use strict";
const Actividad = require("../models/Actividad");
const { actividadBodySchema } = require("../schemas/actividad.schema");
const { respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

// Controlador para obtener todas las actividades
const getAllActividades = async (req, res) => {
  try {
    const actividades = await Actividad.find();
    res.json(actividades);
  } catch (error) {
    handleError(error, "actividades.controller -> getAllActividades");
    res.status(500).json({ error: "Error al obtener las actividades" });
  }
};

// Controlador para obtener una actividad por su ID
const getActividadById = async (req, res) => {
  try {
    const actividad = await Actividad.findById(req.params.id);
    if (!actividad) {
      return res.status(404).json({ message: "Actividad no encontrada" });
    }
    res.json(actividad);
  } catch (error) {
    handleError(error, "actividades.controller -> getActividadById");
    res.status(500).json({ error: "Error al obtener la actividad" });
  }
};

// Controlador para crear una nueva actividad
const createActividad = async (req, res) => {
  try {
    const { error } = actividadBodySchema.validate(req.body);
    if (error) {
      return respondError(req, res, 400, "Error de validación", error.details[0].message);
    }

    const actividad = new Actividad(req.body);
    await actividad.save();
    res.status(201).json(actividad);
  } catch (error) {
    handleError(error, "actividades.controller -> createActividad");
    res.status(500).json({ error: "Error al crear la actividad" });
  }
};

// Controlador para actualizar una actividad por su ID
const updateActividad = async (req, res) => {
  try {
    const { error } = actividadBodySchema.validate(req.body);
    if (error) {
      return respondError(req, res, 400, "Error de validación", error.details[0].message);
    }

    const actividad = await Actividad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actividad) {
      return res.status(404).json({ message: "Actividad no encontrada" });
    }
    res.json(actividad);
  } catch (error) {
    handleError(error, "actividades.controller -> updateActividad");
    res.status(500).json({ error: "Error al actualizar la actividad" });
  }
};

// Controlador para eliminar una actividad por su ID
const deleteActividad = async (req, res) => {
  try {
    const actividad = await Actividad.findByIdAndDelete(req.params.id);
    if (!actividad) {
      return res.status(404).json({ message: "Actividad no encontrada" });
    }
    res.json({ message: "Actividad eliminada correctamente" });
  } catch (error) {
    handleError(error, "actividades.controller -> deleteActividad");
    res.status(500).json({ error: "Error al eliminar la actividad" });
  }
};

module.exports = {
  getAllActividades,
  getActividadById,
  createActividad,
  updateActividad,
  deleteActividad,
};