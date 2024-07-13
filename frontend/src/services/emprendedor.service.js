// src/services/emprendedor.service.js
import instance from "./axios.service";

// Obtener todos los emprendedores
export const getEmprendedores = async () => {
  try {
    const response = await instance.get("/emprendedor");
    const { status, data } = response;
    if (status === 200) {
      return data.data;
    } else {
      console.error("Error fetching emprendedores:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching emprendedores:", error);
    return [];
  }
};

// Obtener un emprendedor por ID
export const getEmprendedorById = async (id) => {
  try {
    const response = await instance.get(`/emprendedor/${id}`);
    const { status, data } = response;
    if (status === 200) {
      return data.data;
    } else {
      console.error(`Error fetching emprendedor con ID ${id}:`, response);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching emprendedor con ID ${id}:`, error);
    return null;
  }
};

// Crear un nuevo emprendedor
export const createEmprendedor = async (emprendedor) => {
  try {
    const response = await instance.post("/emprendedor", emprendedor);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    }
  } catch (error) {
    console.error("Error creando el emprendedor:", error.response.data);
    return error.response;
  }
};

// Actualizar un emprendedor
export const updateEmprendedor = async (id, emprendedor) => {
  try {
    const response = await instance.put(`/emprendedor/${id}`, emprendedor);
    const { status, data } = response;
    if (status === 200) {
      return data.data;
    }
  } catch (error) {
    console.error(`Error al actualizar emprendedor con ID: ${id}:`, error);
  }
};

// Eliminar un emprendedor
export const deleteEmprendedor = async (id) => {
  try {
    const response = await instance.delete(`/emprendedor/${id}`);
    const { status, data } = response;
    if (status === 200) {
      return data.data;
    }
  } catch (error) {
    console.error(`Error eliminando emprendedor con ID ${id}:`, error);
  }
};
