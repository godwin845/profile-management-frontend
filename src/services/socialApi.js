import api from "./api";

export const getSocialLinks = async () => {
  const res = await api.get("/social");
  return res.data;
};

export const addSocialLink = async (data) => {
  const res = await api.post("/social", data);
  return res.data;
};

export const updateSocialLink = async (id, data) => {
  const res = await api.put(`/social/${id}`, data);
  return res.data;
};

export const deleteSocialLink = async (id) => {
  const res = await api.delete(`/social/${id}`);
  return res.data;
};