import React, { createContext, useState, useEffect, useContext } from 'react';
import { getProfile, loginUser, registerUser, logoutUser } from '../api/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, try to fetch profile (in case cookie/token is still valid)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getProfile();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    setUser(data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await registerUser({ name, email, password });
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      // ignore — still clear local state
    }
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
