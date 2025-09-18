import axios from "axios";

export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["x-access-token"];
    if (newAccessToken) {
      localStorage.setItem("auth_access", newAccessToken);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      if (
        error.response.status === 401 || 
        error.response.status === 403    
      ) {
        console.error("Unauthorized! Token expired or invalid.");

        // prevent infinite loop
        if (window.location.pathname !== "/login") {
          localStorage.removeItem("auth_access");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
