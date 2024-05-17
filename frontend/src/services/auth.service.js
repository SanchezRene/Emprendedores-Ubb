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
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.data.accessToken}`;
        cookies.set("jwt", data.data.accessToken);

        login({ email, roles });
        return { email, roles };
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const logoutUser = () => {
    logout();
  };

  return { loginUser, logoutUser };
};