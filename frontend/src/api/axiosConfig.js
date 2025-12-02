import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // puerto 
});

// Adjunta token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Manejo centralizado de respuestas con token expirado
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    const msg = err?.response?.data?.msg || "";
    // Si el token expiró o es inválido, limpiar y redirigir a login
    if (status === 401 && /token|invalid|expir/i.test(msg)) {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } catch {}
      // redirigir al login para que el usuario vuelva a autenticarse
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
