import api from "./api";

export const getProfiles = async () => {
  const res = await api.get("/profile");
  return res.data;
};

export const createProfile = async (data) => {
  const res = await api.post("/profile", data);
  return res.data;
};

export const updateProfile = async (id, data) => {
  const res = await api.put(`/profile/${id}`, data);
  return res.data;
};

export const deleteProfile = async (id) => {
  const res = await api.delete(`/profile/${id}`);
  return res.data;
};