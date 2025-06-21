// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://your-api-url.com/api',
  withCredentials: true, // if using cookies for auth
});

export default api;
