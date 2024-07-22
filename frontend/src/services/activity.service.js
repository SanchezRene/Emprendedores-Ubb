// src/services/activity.service.js
import instance from "./axios.service";

// Obtener todas las actividades
export const getAllActividades = async () => {
  try {
    const response = await instance.get("/actividad");
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data;
    } else {
      console.error("Error fetching actividades:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching actividades:", error);
    return [];
  }
};

// Obtener una actividad por ID
export const getActividadById = async (id) => {
  try {
    const response = await instance.get(`/actividad/${id}`);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error(`Error fetching actividad with ID ${id}:`, response);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching actividad with ID ${id}:`, error);
    return null;
  }
};

export const createActividad = async (actividad) => {
  try {
    const response = await instance.post("/actividad", actividad);
    const { status, data } = response;
    if (status === 201) {
      return data;
    } else {
      console.error("Error creating actividad:", response);
      return null;
    }
  } catch (error) {
    console.error("Error creating actividad:", error);
    throw error;
  }
};

export const deleteActividad = async (id) => {
  try {
    const response = await instance.delete(`/actividad/${id}`);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    }
  } catch (error) {
    console.error(`Error deleting actividad with ID ${id}:`, error);
  }
};

// Actualizar una actividad
export const updateActividad = async (id, actividad) => {
  try {
    const response = await instance.put(`/actividad/${id}`, actividad);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error(`Error updating actividad with ID: ${id}`, response);
      return null;
    }
  } catch (error) {
    console.error(`Error updating actividad with ID: ${id}`, error);
    throw error;
  }
};

// Inscribir emprendedor en una actividad
export const inscribirEmprendedorEnActividad = async (
  emprendedorId,
  actividadId
) => {
  try {
    const response = await instance.post("/actividad/inscribir", {
      emprendedorId,
      _id: actividadId,
    });
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data;
    } else {
      console.error("Error inscribiendo emprendedor en actividad:", response);
      return null;
    }
  } catch (error) {
    console.error("Error inscribiendo emprendedor en actividad:", error);
    throw error;
  }
};

export default {
  getAllActividades,
  getActividadById,
  createActividad,
  updateActividad,
  deleteActividad,
};
