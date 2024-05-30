const Actividad = require("../models/actividad.model");
const { handleError } = require("../utils/errorHandler");

async function getAllActividades() {
  try {
    const actividades = await Actividad.find();
    if (actividades.length === 0) return [null, "No hay actividades registradas"];

    return [actividades, null];
  } catch (error) {
    handleError(error, "actividad.service -> getAllActividades");
  }
}

async function getActividadById(id) {
  try {
    const actividad = await Actividad.findById(id);
    if (!actividad) return [null, "Actividad no encontrada"];

    return [actividad, null];
  } catch (error) {
    handleError(error, "actividad.service -> getActividadById");
  }
}

async function createActividad(actividadData) {
  try {
    const actividad = new Actividad(actividadData);
    await actividad.save();

    return [actividad, null];
  } catch (error) {
    handleError(error, "actividad.service -> createActividad");
  }
}

async function updateActividadById(id, actividadData) {
  try {
    const updatedActividad = await Actividad.findByIdAndUpdate(
      id,
      actividadData,
      { new: true }
    );

    if (!updatedActividad) return [null, "Actividad no se actualizó"];

    return [updatedActividad, null];
  } catch (error) {
    handleError(error, "actividad.service -> updateActividadById");
  }
}

async function deleteActividad(id) {
  try {
    const deletedActividad = await Actividad.findByIdAndDelete(id);
    if (!deletedActividad) return [null, "Actividad no eliminada"];

    return [deletedActividad, null];
  } catch (error) {
    handleError(error, "actividad.service -> deleteActividad");
  }
}

//función para inscribir emprendedores
async function inscribirEmprendedor(actividadId, userId) {
  try {
    const actividad = await Actividad.findById(actividadId);
    if (!actividad) return [null, "Actividad no encontrada"];

    if (!actividad.emprendedoresId.includes(userId)) {
      actividad.emprendedoresId.push(userId);
      await actividad.save();
    } else {
      return [null, "El usuario ya está inscrito en esta actividad"];
    }

    return [actividad, null];
  } catch (error) {
    handleError(error, "actividad.service -> inscribirEmprendedor");
    return [null, error.message];
  }
}

module.exports = {
  getAllActividades,
  getActividadById,
  createActividad,
  updateActividadById,
  deleteActividad,
  inscribirEmprendedor, 
};
