import api from "./api";

export const getEducationList = async () => {
  const res = await api.get("/education");
  return res.data;
};

export const addEducation = async (data) => {
  const res = await api.post("/education", data);
  return res.data;
};

export const updateEducation = async (id, data) => {
  const res = await api.put(`${"/education"}/${id}`, data);
  return res.data;
};

export const deleteEducation = async (id) => {
  const res = await api.delete(`${"/education"}/${id}`);
  return res.data;
};