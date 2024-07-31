// src/services/inscripcion.service.js

import instance from "./axios.service";

// obtener todas las inscripciones
export const getInscripciones = async () => {
  try {
    const response = await instance.get("/inscripcion");
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error("Error fetching inscripciones:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching inscripciones:", error);
    return [];
  }
}

// Obtener todas las inscripciones (resumen)
export const getInscripcionesSummary = async () => {
  try {
    const response = await instance.get("/inscripcion/summary");
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error("Error fetching inscripciones:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching inscripciones:", error);
    return [];
  }
};


// Obtener inscripcion por email de usuario
export const getInscripcionByEmail = async (email) => {
  try {
    console.log("email: ", email);
    const response = await instance.post("/inscripcion/email", { email });
    console.log("response: ", response);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error(
        `Error fetching inscripciones for email ${email}:`,
        response
      );
      return [];
    }
  } catch (error) {
    console.error(`Error fetching inscripcion for email ${email}:`, error);
    return [];
  }
};

// Crear una nueva inscripción
export const createInscripcion = async (inscripcion) => {
  try {
    const response = await instance.post("/inscripcion", inscripcion);
    return response; // devuelve la respuesta completa
  } catch (error) {
    console.error("Error creating inscripcion:", error.response?.data);
    return error.response;
  }
};

// Actualizar una inscripción
export const updateInscripcion = async (id, inscripcion) => {
  try {
    const response = await instance.put(`/inscripcion/${id}`, inscripcion);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error(`Error updating inscripcion with ID: ${id}`, response);
      return null;
    }
  } catch (error) {
    console.error(`Error updating inscripcion with ID: ${id}`, error);
    throw error;
  }
};

// Eliminar una inscripción
export const deleteInscripcion = async (id) => {
  try {
    const response = await instance.delete(`/inscripcion/${id}`);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    }
  } catch (error) {
    console.error(`Error deleting inscripcion with ID ${id}:`, error);
  }
};

export default {
  getInscripciones,
  getInscripcionesSummary,
  getInscripcionByEmail,
  createInscripcion,
  updateInscripcion,
  deleteInscripcion,
};
