import api from "./api";

// REGISTER
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response;
};

// LOGIN
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};