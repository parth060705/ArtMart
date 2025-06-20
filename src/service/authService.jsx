// src/services/authService.js
import api from './api';

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const logout = () => api.post('/auth/logout');
export const getCurrentUser = () => api.get('/auth/me');

// Optional helper to refresh user from outside the hook
export const refreshUser = async () => {
  const res = await getCurrentUser();
  return res.data;
};
