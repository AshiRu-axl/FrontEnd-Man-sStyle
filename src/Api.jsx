import axios from "axios";

const api = axios.create({
    baseURL: "https://www.apimanstyle.somee.com/api", // Usa HTTP (Somee Free no incluye HTTPS)
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;