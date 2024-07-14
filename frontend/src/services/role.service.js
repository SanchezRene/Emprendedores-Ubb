// src/services/role.service.js

import instance from "./axios.service";

// Obtener todos los roles
export const getRoles = async () => {
  try {
    const response = await instance.get("/roles");
    const { status, data } = response;
    if (status === 200) {
      return data.data;
    } else {
      console.error("Error fetching roles:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
};

export default {
  getRoles,
};
