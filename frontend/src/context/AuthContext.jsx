import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../services/axios.service';
import { login as authLogin, logout as authLogout } from '../services/auth.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (user && token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
    }
  }, []);

  const login = async (email, password) => {
    try {
      await authLogin({ email, password });
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (user && token) {
        setUser(user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    authLogout();
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
