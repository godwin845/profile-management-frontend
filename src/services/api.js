import axios from "axios";

const api = axios.create({
  baseURL: "https://profile-management-backend-2jxo.onrender.com/api",
});

export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// // Attach JWT token automatically to all requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;