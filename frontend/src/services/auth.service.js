"use client";
import { jwtDecode } from "jwt-decode";
import axios from "../services/axios.service";
import cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";

export const useAuthService = () => {
  const { login, logout } = useAuth();

  const loginUser = async ({ email, password }) => {
    try {
      const response = await axios.post("auth/login", { email, password });
      const { status, data } = response;

      if (status === 200) {
        const decoded = jwtDecode(data.data.accessToken);
        const { email, roles } = decoded;

        localStorage.setItem("user", JSON.stringify({ email, roles }));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.accessToken}`;
        cookies.set("jwt", data.data.accessToken, { domain: 'http://localhost:5000/api' });

        login({ email, roles });
        return { email, roles };
      }
    } catch (error) {
      console.error("LoginUser error", error);
    }
  };

  const logoutUser = async () => {
    try {
      const response = await axios.post("auth/logout");
      if (response.status !== 200) {
        throw new Error("Logout failed");
      }
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      cookies.remove("jwt", { path: "/" });
      
    } catch (error) {
      console.error("LogoutUser error", error);
    }
    logout();
  };

  return { loginUser, logoutUser };
};
