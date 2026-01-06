import { createContext, useContext, useState } from "react";
import api from "../Api/api"; // axios instance

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/api/profile"); // ✅ correct endpoint
      setProfile(res.data);
    } catch (err) {
      console.error("❌ Profile fetch failed:", err);
      setError("Failed to load profile");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const clearProfile = () => {
    setProfile(null);
  };

  return (
    <ProfileContext.Provider
      value={{ profile, loading, error, fetchProfile, clearProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
