// src/services/carrera.service.js

import axios from "./axios.service";

export const getCarreras = async () => {
  try {
    const response = await axios.get("/carrera");

    const { status, data } = response;
    if (status === 200 || status === 201) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};
