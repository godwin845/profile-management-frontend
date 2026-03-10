import api from "./api";

export const getCertificates = async () => {
  const res = await api.get("/certificates");
  return res.data;
};

export const addCertificate = async (data) => {
  const res = await api.post("/certificates", data);
  return res.data;
};

export const updateCertificate = async (id, data) => {
  const res = await api.put(`${"/certificates"}/${id}`, data);
  return res.data;
};

export const deleteCertificate = async (id) => {
  const res = await api.delete(`${"/certificates"}/${id}`);
  return res.data;
};