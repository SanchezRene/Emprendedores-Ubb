
import axios from "../services/axios.service";

export const getCarreras = async () => {
    try {
        const response = await axios.get("/carrera");
        const { status, data } = response;
        console.log("getCarreras response", response);

        if (status === 200) {
                return response;
        }
        return [];
    } catch (error) {
        console.error("getCarreras error", error);
    }
};
