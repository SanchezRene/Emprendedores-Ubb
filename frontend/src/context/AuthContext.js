// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../services/axios.service";
import cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    cookies.remove("jwt", { path: "/" });
    setUser(null);
    setIsAuthenticated(false);
    router.push("/auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
