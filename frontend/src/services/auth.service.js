import axios from "./axios.service";
import cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post("auth/login", {
      email,
      password,
    });
    const { status, data } = response;
    if (status === 200) {
      const { email, roles } = jwtDecode(data.data.accessToken);
      const user = { email, roles };
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", data.data.accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.data.accessToken}`;
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  cookies.remove("jwt");
};

export const test = async () => {
  try {
    const response = await axios.get("/users");
    const { status, data } = response;
    if (status === 200) {
      console.log(data.data);
    }
  } catch (error) {
    console.log(error);
  }
};
