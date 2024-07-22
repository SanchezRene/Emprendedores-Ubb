// src/services/emprendedor.service.js
import instance from "./axios.service";
import { getUserByEmail } from "./user.service";

// Obtener todos los emprendedores
export const getEmprendedores = async () => {
  try {
    const response = await instance.get("/emprendedor");
    const { status, data } = response;
    if (status === 200 || status === 201) {
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
    if (status === 200 || status === 201) {
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

// Obtener productos por emprendedor
export const getProductosByEmprendedor = async (id) => {
  try {
    const response = await instance.get(`/emprendedor/${id}/productos`);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error(
        `Error fetching productos for emprendedor con ID ${id}:`,
        response
      );
      return [];
    }
  } catch (error) {
    console.error(
      `Error fetching productos for emprendedor con ID ${id}:`,
      error
    );
    return [];
  }
};

// Obtener ayudantes por emprendedor
export const getAyudantesByEmprendedor = async (id) => {
  try {
    const response = await instance.get(`/emprendedor/${id}/ayudantes`);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error(
        `Error fetching ayudantes for emprendedor con ID ${id}:`,
        response
      );
      return [];
    }
  } catch (error) {
    console.error(
      `Error fetching ayudantes for emprendedor con ID ${id}:`,
      error
    );
    return [];
  }
};

// Crear un nuevo emprendedor
export const createEmprendedor = async (emprendedor) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user.email;

    // Obtener el userId usando el correo electrónico
    const userData = await getUserByEmail(email);
    const userId = userData._id;

    // Agregar userId al objeto emprendedor
    const emprendedorData = {
      userId,
      ...emprendedor,
    };

    const response = await instance.post("/emprendedor/", emprendedorData);

    if (response.status === 200 || response.status === 201) {
      return response; // enviar status y data para manejar el resto del formulario
    }
  } catch (error) {
    console.error("Error creando el emprendedor:", error.response?.data);
    return error.response;
  }
};

// Actualizar un emprendedor
export const updateEmprendedor = async (id, emprendedor) => {
  try {
    const response = await instance.put(`/emprendedor/${id}`, emprendedor);
    const { status, data } = response;
    if (status === 200 || status === 201) {
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
    if (status === 200 || status === 201) {
      return data.data;
    }
  } catch (error) {
    console.error(`Error eliminando emprendedor con ID ${id}:`, error);
  }
};
