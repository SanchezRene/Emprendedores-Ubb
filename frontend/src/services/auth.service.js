"use client";

import axios from "../services/axios.service";
import cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post("auth/login", {
      email,
      password,
    });
    const { status, data } = response;

    if (status === 200) {
      const decoded = jwtDecode(data.data.accessToken);
      console.log(decoded);
      const { email, roles } = decoded;

      localStorage.setItem("user", JSON.stringify({ email, roles }));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.data.accessToken}`;

      return { email, roles };
    }
  } catch (error) {
    console.log(error);
    console.log("-> Login error");
  }
};

export const logout = () => {
  localStorage.removeItem("user");
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
