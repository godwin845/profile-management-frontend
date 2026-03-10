import api from "./api";

export const getExperiences = async () => {
  const res = await api.get("/experience");
  return res.data;
};

export const addExperience = async (data) => {
  const res = await api.post("/experience", data);
  return res.data;
};

export const updateExperience = async (id, data) => {
  const res = await api.put(`${"/experience"}/${id}`, data);
  return res.data;
};

export const deleteExperience = async (id) => {
  const res = await api.delete(`${"/experience"}/${id}`);
  return res.data;
};