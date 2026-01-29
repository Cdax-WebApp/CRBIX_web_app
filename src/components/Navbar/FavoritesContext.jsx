import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import {
  getUserFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../../Api/favoriteApi";
import { isCoursePurchased } from "../../Api/course.api";
import { useAuth } from "../Login/AuthContext";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showReminder, setShowReminder] = useState(false);
  const [reminderCourse, setReminderCourse] = useState(null);

  const reminderTimerRef = useRef(null);
  const [lastReminderTime, setLastReminderTime] = useState(0);
  const [reminderCheckInterval, setReminderCheckInterval] = useState(300000);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      setFavorites([]);
      setShowReminder(false);
      setReminderCourse(null);
      return;
    }

    const loadFavorites = async () => {
      try {
        setLoading(true);
        const data = await getUserFavorites(user.id);
        setFavorites(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [isAuthenticated, user?.id]);

  const findCourseForReminder = useCallback(
    async (currentFavorites) => {
      if (!isAuthenticated || !user?.id || currentFavorites.length === 0) {
        return null;
      }

      const now = Date.now();
      if (now - lastReminderTime < reminderCheckInterval) {
        return null;
      }

      const shuffledFavorites = [...currentFavorites].sort(
        () => Math.random() - 0.5,
      );

      for (const favorite of shuffledFavorites) {
        const courseId = favorite.courseId || favorite.id;

        const isStillFavorited = currentFavorites.some(
          (fav) => fav.courseId === courseId || fav.id === courseId,
        );
        if (!isStillFavorited) continue;

        const dismissed = localStorage.getItem(
          `reminder_dismissed_${courseId}`,
        );
        if (dismissed && now - parseInt(dismissed) < 24 * 60 * 60 * 1000) {
          continue;
        }

        const shown = localStorage.getItem(`reminder_shown_${courseId}`);
        if (shown && now - parseInt(shown) < 30 * 1000) {
          continue;
        }

        try {
          const purchased = await isCoursePurchased(courseId);
          if (!purchased) {
            return {
              id: courseId,
              title:
                favorite.title || favorite.courseTitle || `Course ${courseId}`,
              price: favorite.price || 999,
              image: favorite.image || favorite.thumbnailUrl || "",
            };
          }
        } catch (err) {
          continue;
        }
      }

      return null;
    },
    [isAuthenticated, user?.id, lastReminderTime, reminderCheckInterval],
  );

  useEffect(() => {
    if (reminderTimerRef.current) {
      clearInterval(reminderTimerRef.current);
    }

    if (!isAuthenticated || favorites.length === 0) {
      setShowReminder(false);
      setReminderCourse(null);
      return;
    }

    const checkAndShowReminder = async () => {
      const course = await findCourseForReminder(favorites);

      if (course) {
        setReminderCourse(course);
        setShowReminder(true);
        setLastReminderTime(Date.now());
        localStorage.setItem(
          `reminder_shown_${course.id}`,
          Date.now().toString(),
        );

        setTimeout(() => {
          setShowReminder(false);
          setTimeout(() => setReminderCourse(null), 300);
        }, 8000);
      }
    };

    setTimeout(checkAndShowReminder, 1000);
    reminderTimerRef.current = setInterval(
      checkAndShowReminder,
      reminderCheckInterval,
    );

    return () => {
      if (reminderTimerRef.current) {
        clearInterval(reminderTimerRef.current);
        reminderTimerRef.current = null;
      }
    };
  }, [
    isAuthenticated,
    favorites.length,
    reminderCheckInterval,
    findCourseForReminder,
  ]);

  const handleDismissReminder = useCallback((courseId, permanently = false) => {
    setShowReminder(false);

    if (courseId) {
      const key = permanently
        ? `reminder_dismissed_${courseId}`
        : `reminder_shown_${courseId}`;
      localStorage.setItem(key, Date.now().toString());
    }

    setTimeout(() => setReminderCourse(null), 300);
  }, []);

  const handleReminderPurchaseClick = useCallback((course) => {
    setShowReminder(false);
    localStorage.setItem(
      `reminder_purchase_clicked_${course.id}`,
      Date.now().toString(),
    );
    setTimeout(() => setReminderCourse(null), 300);
    return course;
  }, []);

  const toggleFavorite = useCallback(
    async (courseId, courseDetails = null) => {
      if (!isAuthenticated || !user?.id) return;

      const exists = favorites.some(
        (fav) => fav.courseId === courseId || fav.id === courseId,
      );

      try {
        if (exists) {
          await removeFromFavorites(user.id, courseId);
          setFavorites((prev) =>
            prev.filter(
              (fav) => fav.courseId !== courseId && fav.id !== courseId,
            ),
          );

          localStorage.removeItem(`reminder_dismissed_${courseId}`);
          localStorage.removeItem(`reminder_shown_${courseId}`);
          localStorage.removeItem(`reminder_purchase_clicked_${courseId}`);

          if (reminderCourse?.id === courseId) {
            setShowReminder(false);
            setTimeout(() => setReminderCourse(null), 300);
          }
        } else {
          const response = await addToFavorites(user.id, courseId);
          if (response?.favorite) {
            setFavorites((prev) => [
              ...prev,
              {
                ...response.favorite,
                ...(courseDetails || {}),
              },
            ]);

            localStorage.removeItem(`reminder_dismissed_${courseId}`);
            localStorage.removeItem(`reminder_shown_${courseId}`);
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
    [isAuthenticated, user?.id, favorites, reminderCourse],
  );

  const testReminder = useCallback(
    (courseData = null) => {
      if (!isAuthenticated || favorites.length === 0) return;

      if (courseData) {
        setReminderCourse(courseData);
        setShowReminder(true);
        setLastReminderTime(Date.now());
        return;
      }

      const fav = favorites[0];
      const courseId = fav.courseId || fav.id;

      setReminderCourse({
        id: courseId,
        title: fav.title || fav.courseTitle || `Course ${courseId}`,
        price: fav.price || 999,
        image: fav.image || fav.thumbnailUrl || "",
      });
      setShowReminder(true);
      setLastReminderTime(Date.now());
    },
    [isAuthenticated, favorites],
  );

  const forceNextReminder = useCallback(() => {
    setLastReminderTime(0);
  }, []);

  const clearAllReminders = useCallback(() => {
    if (reminderTimerRef.current) {
      clearInterval(reminderTimerRef.current);
    }

    setShowReminder(false);
    setReminderCourse(null);
    setLastReminderTime(0);

    favorites.forEach((fav) => {
      const id = fav.courseId || fav.id;
      localStorage.removeItem(`reminder_dismissed_${id}`);
      localStorage.removeItem(`reminder_shown_${id}`);
    });
  }, [favorites]);

  const updateReminderInterval = useCallback((seconds) => {
    const interval = seconds * 1000;
    setReminderCheckInterval(interval);
    localStorage.setItem("reminder_interval", interval.toString());
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("reminder_interval");
    if (saved) {
      setReminderCheckInterval(parseInt(saved));
    }
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        loading,
        showReminder,
        reminderCourse,
        handleDismissReminder,
        handleReminderPurchaseClick,
        testReminder,
        forceNextReminder,
        clearAllReminders,
        updateReminderInterval,
        reminderCheckInterval,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};