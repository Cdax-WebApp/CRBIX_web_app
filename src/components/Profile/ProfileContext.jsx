import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../Login/AuthContext";
import { getDashboardCourses } from "../../Api/course.api";
import axios from "axios";
import api from "../../Api/api";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [profile, setProfile] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // STREAK STATES
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [streakData, setStreakData] = useState(null);
  const [loadingStreak, setLoadingStreak] = useState(false);

  const [loading, setLoading] = useState(false);

  const capitalize = (str = "") =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  /* ================= PROFILE + COURSES ================= */

  const fetchProfile = async () => {
    if (!isAuthenticated || !user) return;

    setLoading(true);

    const userId = user.id || user._id;

    setProfile({
      id: userId,
      name: `${capitalize(user.firstName)} ${capitalize(user.lastName)}`,
      email: user.email,
      phone: user.phoneNumber || "",
      subscribed: false,
    });

    const courses = await getDashboardCourses(userId);
    const enrolled = courses.filter((c) => c.isSubscribed === true);
    setEnrolledCourses(enrolled);

    //  ONLY set course, do NOT call API here
    if (enrolled.length > 0) {
      setSelectedCourseId(enrolled[0].id);
    }

    setLoading(false);
  };

  /* ================= STREAK API ================= */

const loadCourseStreak = async (courseId) => {
  const uid = user?.id || user?._id;
  if (!courseId || !uid) return;

  try {
    setLoadingStreak(true);

    const res = await api.get("/profile/streak", {
  params: {
    userId: uid,
    courseId: courseId,
  },
});

    const apiDays = res.data?.last30Days || [];

    //  MAP for quick lookup
    const dayMap = {};
    apiDays.forEach(d => {
      dayMap[d.date] = d;
    });

    //  ALWAYS generate last 30 days
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const isoDate = date.toISOString().split("T")[0];

      last30Days.push(
        dayMap[isoDate] || {
          date: isoDate,
          isActiveDay: false,
        }
      );
    }

    console.log("✅ FINAL 30 DAYS:", last30Days);
    console.log("📘 COURSE ID:", selectedCourseId);

    setStreakData({
      ...res.data,
      last30Days,
    });
  } catch (err) {
    console.error("STREAK ERROR:", err);
    setStreakData(null);
  } finally {
    setLoadingStreak(false);
  }
};

  /* ================= AUTO LOAD STREAK ================= */

  useEffect(() => {
    if (selectedCourseId && user) {
      loadCourseStreak(selectedCourseId);
    }
  }, [selectedCourseId, user]);

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const clearProfile = () => {
    setProfile(null);
    setEnrolledCourses([]);
    setStreakData(null);
    setSelectedCourseId(null);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        enrolledCourses,
        loading,

        // STREAK
        streakData,
        loadingStreak,
        selectedCourseId,
        setSelectedCourseId,
        loadCourseStreak,

        fetchProfile,
        clearProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
