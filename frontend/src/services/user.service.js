// src/services/user.service.js

import instance from "./axios.service";

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const response = await instance.get("/users");
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error("Error fetching users:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  try {
    const response = await instance.get(`/users/${id}`);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error(`Error fetching user with ID ${id}:`, response);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    return null;
  }
};

// Obtener un usuario por correo electrónico
export const getUserByEmail = async (email) => {
  try {
    const response = await instance.get(`/users/email/${email}`);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error(`Error fetching user with email ${email}:`, response);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
    return null;
  }
};

// Crear un nuevo usuario
export const createUser = async (user) => {
  try {
    const response = await instance.post("/users", user);
    return response; // devuelve la respuesta completa
  } catch (error) {
    console.error("Error creating user:", error.response?.data);
    return error.response;
  }
};

// Actualizar un usuario
export const updateUser = async (id, user) => {
  try {
    const response = await instance.put(`/users/${id}`, user);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    } else {
      console.error(`Error updating user with ID: ${id}`, response);
      return null;
    }
  } catch (error) {
    console.error(`Error updating user with ID: ${id}`, error);
    throw error;
  }
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  try {
    const response = await instance.delete(`/users/${id}`);
    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    }
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
  }
};

export default {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
