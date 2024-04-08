const Actividad = require("../models/Actividad");

// Controlador para obtener todas las actividades
const getAllActividades = async (req, res) => {
  try {
    const actividades = await Actividad.find();
    res.json(actividades);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};

// Controlador para crear una nueva actividad
const createActividad = async (req, res) => {
  try {
    const actividad = new Actividad(req.body);
    await actividad.save();
    res.status(201).json(actividad);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para actualizar una actividad por su ID
const updateActividad = async (req, res) => {
  try {
    const actividad = await Actividad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!actividad) {
      return res.status(404).json({ message: "Actividad no encontrada" });
    }
    res.json(actividad);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllActividades,
  getActividadById,
  createActividad,
  updateActividad,
  deleteActividad,
};
