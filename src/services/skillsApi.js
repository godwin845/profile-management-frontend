import api from "./api";

export const fetchSkills = async () => {
  try {
    const response = await api.get("/skills");
    return response.data;
  } catch (err) {
    console.error("Error fetching skills:", err);
    throw err;
  }
};

export const saveSkills = async (skills) => {
  try {
    await api.post("/skills", { skills });
  } catch (err) {
    console.error("Error saving skills:", err);
    throw err;
  }
};

export const removeSkill = async (skill) => {
  try {
    await api.delete(`${"/skills"}/${encodeURIComponent(skill)}`);
  } catch (err) {
    console.error("Error deleting skill:", err);
    throw err;
  }
};