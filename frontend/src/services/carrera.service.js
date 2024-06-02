import axios from "./axios.service";

export const getCarreras = async () => {
  try {
    const response = await axios.get("/carrera");
    console.log("response:", response);
    const { status, data } = response;
    if (status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
};
