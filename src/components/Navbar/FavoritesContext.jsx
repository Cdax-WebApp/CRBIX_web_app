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
  const [reminderCourses, setReminderCourses] = useState([]); 

  const reminderTimerRef = useRef(null);
  
  const POPUP_DELAY = 5 * 60 * 1000; // 5 minutes in milliseconds
  const POPUP_DURATION = 15 * 1000; // 15 seconds
  const REPEAT_INTERVAL = 5 * 60 * 1000; // 5 minutes between reminders
  const DISMISS_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      setFavorites([]);
      setShowReminder(false);
      setReminderCourses([]);
      return;
    }

    const loadFavorites = async () => {
      try {
        setLoading(true);
        const data = await getUserFavorites(user.id);
        setFavorites(Array.isArray(data) ? data : []);
        
        data.forEach((fav) => {
          const courseId = fav.courseId || fav.id;
          const favoritedKey = `favorited_time_${courseId}`;
          if (!localStorage.getItem(favoritedKey)) {
            localStorage.setItem(favoritedKey, Date.now().toString());
          }
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [isAuthenticated, user?.id]);

  const findCoursesForReminder = useCallback(async (currentFavorites) => {
    if (!isAuthenticated || !user?.id || currentFavorites.length === 0) {
      return [];
    }

    const now = Date.now();
    const coursesForReminder = [];

    for (const favorite of currentFavorites) {
      const courseId = favorite.courseId || favorite.id;

      const favoritedTime = localStorage.getItem(`favorited_time_${courseId}`);
      if (!favoritedTime) continue;
      
      const timeSinceFavorited = now - parseInt(favoritedTime);
      
      const lastReminderShown = localStorage.getItem(`reminder_shown_${courseId}`);
      const timeSinceLastReminder = lastReminderShown ? now - parseInt(lastReminderShown) : Infinity;
 
      const dismissed = localStorage.getItem(`reminder_dismissed_${courseId}`);
      if (dismissed && now - parseInt(dismissed) < DISMISS_DURATION) {
        continue;
      }

      if (timeSinceLastReminder < REPEAT_INTERVAL) {
        continue;
      }

      if (timeSinceFavorited >= POPUP_DELAY) {
        try {
          const purchased = await isCoursePurchased(courseId);
          if (!purchased) {
            coursesForReminder.push({
              id: courseId,
              title: favorite.title || favorite.courseTitle || `Course ${courseId}`,
              price: favorite.price || 999,
              image: favorite.image || favorite.thumbnailUrl || "",
              favoritedTime: parseInt(favoritedTime),
            });
          }
        } catch (err) {
          console.error("Error checking purchase status:", err);
        }
      }
    }

    return coursesForReminder;
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    if (reminderTimerRef.current) {
      clearInterval(reminderTimerRef.current);
    }

    if (!isAuthenticated || favorites.length === 0) {
      setShowReminder(false);
      setReminderCourses([]);
      return;
    }

    const checkAndShowReminder = async () => {
      const courses = await findCoursesForReminder(favorites);

      if (courses.length > 0) {
        courses.forEach(course => {
          localStorage.setItem(`reminder_shown_${course.id}`, Date.now().toString());
        });
        
        setReminderCourses(courses);
        setShowReminder(true);

        setTimeout(() => {
          setShowReminder(false);
          setTimeout(() => setReminderCourses([]), 300);
        }, POPUP_DURATION);
      }
    };

    checkAndShowReminder();
    reminderTimerRef.current = setInterval(checkAndShowReminder, REPEAT_INTERVAL);

    return () => {
      if (reminderTimerRef.current) {
        clearInterval(reminderTimerRef.current);
        reminderTimerRef.current = null;
      }
    };
  }, [isAuthenticated, favorites, findCoursesForReminder]);

  const handleDismissReminder = useCallback((courseId = null, permanently = false) => {
    setShowReminder(false);
    
    if (courseId) {
      const key = permanently
        ? `reminder_dismissed_${courseId}`
        : `reminder_shown_${courseId}`;
      localStorage.setItem(key, Date.now().toString());
    } else if (permanently && reminderCourses.length > 0) {
      reminderCourses.forEach(course => {
        localStorage.setItem(`reminder_dismissed_${course.id}`, Date.now().toString());
      });
    }

    setTimeout(() => setReminderCourses([]), 300);
  }, [reminderCourses]);

  const handleReminderPurchaseClick = useCallback((course) => {
    setShowReminder(false);
    localStorage.setItem(
      `reminder_purchase_clicked_${course.id}`,
      Date.now().toString(),
    );
    setTimeout(() => setReminderCourses([]), 300);
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

          localStorage.removeItem(`favorited_time_${courseId}`);
          localStorage.removeItem(`reminder_dismissed_${courseId}`);
          localStorage.removeItem(`reminder_shown_${courseId}`);
          localStorage.removeItem(`reminder_purchase_clicked_${courseId}`);

          setReminderCourses(prev => prev.filter(course => course.id !== courseId));
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

            localStorage.setItem(`favorited_time_${courseId}`, Date.now().toString());
            localStorage.removeItem(`reminder_dismissed_${courseId}`);
            localStorage.removeItem(`reminder_shown_${courseId}`);
          }
        }
      } catch (err) {
        console.error(err);
      }
    },
    [isAuthenticated, user?.id, favorites],
  );

  const testReminder = useCallback(
    (courseData = null) => {
      if (!isAuthenticated || favorites.length === 0) return;

      if (courseData) {
        setReminderCourses([courseData]);
        setShowReminder(true);
        return;
      }

      const courses = favorites.slice(0, 3).map(fav => ({
        id: fav.courseId || fav.id,
        title: fav.title || fav.courseTitle || `Course ${fav.courseId || fav.id}`,
        price: fav.price || 999,
        image: fav.image || fav.thumbnailUrl || "",
        favoritedTime: Date.now() - POPUP_DELAY, 
      }));

      setReminderCourses(courses);
      setShowReminder(true);
    },
    [isAuthenticated, favorites, POPUP_DELAY],
  );

  const forceNextReminder = useCallback(() => {
    favorites.forEach(fav => {
      const courseId = fav.courseId || fav.id;
      localStorage.removeItem(`reminder_shown_${courseId}`);
    });
  }, [favorites]);

  const clearAllReminders = useCallback(() => {
    if (reminderTimerRef.current) {
      clearInterval(reminderTimerRef.current);
    }

    setShowReminder(false);
    setReminderCourses([]);

    favorites.forEach((fav) => {
      const id = fav.courseId || fav.id;
      localStorage.removeItem(`favorited_time_${id}`);
      localStorage.removeItem(`reminder_dismissed_${id}`);
      localStorage.removeItem(`reminder_shown_${id}`);
      localStorage.removeItem(`reminder_purchase_clicked_${id}`);
    });
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        loading,
        showReminder,
        reminderCourses, 
        handleDismissReminder,
        handleReminderPurchaseClick,
        testReminder,
        forceNextReminder,
        clearAllReminders,
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