import api from "./api";

export const getCareerVision = async () => {
  const res = await api.get("/career-vision");
  return res.data;
};

export const createCareerVision = async (data) => {
  const res = await api.post("/career-vision", data);
  return res.data;
};

export const updateCareerVision = async (id, data) => {
  const res = await api.put(`/career-vision/${id}`, data);
  return res.data;
};