// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", 
});

// Inserta el token en cada request si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
