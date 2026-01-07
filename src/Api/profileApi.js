import api from "src/Api/api.jsx ";

export const fetchProfileApi = async () => {
  const res = await api.get("/profile/me");
  return res.data;
};

export const updateProfileApi = async (profile) => {
  const res = await api.put("/profile", profile);
  return res.data;
};

export const fetchStreakApi = async () => {
  const res = await api.get("/profile/streaks");
  return res.data;
};
