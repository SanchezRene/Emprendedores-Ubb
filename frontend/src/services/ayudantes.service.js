// src/services/ayudantes.service.js
import instance from "./axios.service";

// Obtener todos los ayudantes
export const getAyudantes = async () => {
  try {
    const response = await instance.get("/ayudantes");
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error("Error fetching ayudantes:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching ayudantes:", error);
    return [];
  }
};

// Obtener un ayudante por ID
export const getAyudanteById = async (id) => {
  try {
    const response = await instance.get(`/ayudantes/${id}`);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error(`Error fetching ayudante con ID ${id}:`, response);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching ayudante con ID ${id}:`, error);
    return null;
  }
};

// Crear un nuevo ayudante
export const createAyudante = async (ayudante) => {
  try {
    const response = await instance.post("/ayudantes", ayudante);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    }
  } catch (error) {
    console.error("Error creando el ayudante:", error.response.data);
    return error.response;
  }
};

// Actualizar un ayudante
export const updateAyudante = async (id, ayudante) => {
  try {
    const response = await instance.put(`/ayudantes/${id}`, ayudante);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    }
  } catch (error) {
    console.error(`Error al actualizar ayudante con ID: ${id}:`, error);
  }
};

// Eliminar un ayudante
export const deleteAyudante = async (id) => {
  try {
    const response = await instance.delete(`/ayudantes/${id}`);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    }
  } catch (error) {
    console.error(`Error eliminando ayudante con ID ${id}:`, error);
  }
};
