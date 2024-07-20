// src/services/inscripciones.service.js
import instance from "./axios.service";

// Obtener el resumen de inscripciones
export const getInscripcionesSummary = async () => {
  try {
    const response = await instance.get("/inscripciones/summary");
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error("Error fetching inscripciones summary:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching inscripciones summary:", error);
    return [];
  }
};

// Obtener una inscripción por ID
export const getInscripcionById = async (id) => {
  try {
    const response = await instance.get(`/inscripciones/${id}`);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error(`Error fetching inscripcion con ID ${id}:`, response);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching inscripcion con ID ${id}:`, error);
    return null;
  }
};

// Crear una nueva inscripción
export const createInscripcion = async (inscripcion) => {
  try {
    const response = await instance.post("/inscripciones", inscripcion);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    }
  } catch (error) {
    console.error("Error creando la inscripcion:", error.response.data);
    return error.response;
  }
};

// Actualizar una inscripción
export const updateInscripcion = async (id, inscripcion) => {
  try {
    const response = await instance.put(`/inscripciones/${id}`, inscripcion);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    }
  } catch (error) {
    console.error(`Error al actualizar inscripcion con ID: ${id}:`, error);
  }
};

// Eliminar una inscripción
export const deleteInscripcion = async (id) => {
  try {
    const response = await instance.delete(`/inscripciones/${id}`);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    }
  } catch (error) {
    console.error(`Error eliminando inscripcion con ID ${id}:`, error);
  }
};
