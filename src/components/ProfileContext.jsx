import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

/* 🔥 DUMMY PROFILE DATA */
const DUMMY_PROFILE = {
  id: 1,
  name: "Omkar Karale",
  email: "omkar.karale@cdax.com",
  phone: "+91 98765 43210",
  subscribed: true,
};

const DUMMY_STREAKS = [
  true, true, false, true, true, true, false,
  true, false, true, true, false, true, true,
];

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [streaks, setStreaks] = useState([]);

  const fetchProfile = async () => {
    console.log("🧪 Using DUMMY profile data");

    // simulate API delay
    setTimeout(() => {
      setProfile(DUMMY_PROFILE);
      setStreaks(DUMMY_STREAKS);
    }, 500);
  };

  const clearProfile = () => {
    setProfile(null);
    setStreaks([]);
  };

  return (
    <ProfileContext.Provider
      value={{ profile, streaks, fetchProfile, clearProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
