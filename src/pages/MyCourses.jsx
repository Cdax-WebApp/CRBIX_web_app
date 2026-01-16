import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardCourses } from "../Api/course.api";
import { useAuth } from "../components/Login/AuthContext";

export default function MyCourses() {
  const { user, isAuthenticated, openLogin } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    setLoading(true);

    getDashboardCourses(user.id)
      .then((allCourses) => {
        const enrolled = allCourses.filter(
          (c) => c.isSubscribed === true
        );
        setCourses(enrolled);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAuthenticated, user?.id]);

  /* ================= STATES ================= */

  if (!isAuthenticated) {
    return (
      <div className="p-10 text-center bg-[#eaf9ff] dark:bg-gray-900 min-h-screen">
        <button 
          onClick={openLogin} 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
        >
          Login to view your courses
        </button>
      </div>
    );
  }

  if (loading) return <p className="p-10 bg-[#eaf9ff] dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">Loading...</p>;

  if (!courses.length) {
    return (
      <div className="p-10 text-center text-gray-500 dark:text-gray-400 bg-[#eaf9ff] dark:bg-gray-900 min-h-screen">
        You haven’t purchased any courses yet.
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="p-6 bg-[#eaf9ff] dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">My Courses</h1>

      <div className="space-y-4">
        {courses.map((course) => {
          const progress =
            course.progressPercentage ??
            course.progressPercent ??
            0;

          return (
            <div
              key={course.id}
              onClick={() =>
                navigate(`/course/${course.id}`)
              }
              className="w-full bg-white dark:bg-gray-800 rounded-xl shadow dark:shadow-gray-900/50 p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
            >
              {/* Thumbnail */}
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="w-36 h-20 object-cover rounded-lg"
              />

              {/* Middle content */}
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-gray-800 dark:text-white">
                  {course.title}
                </h3>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {progress}% completed
                  </p>
                </div>
              </div>

              {/* Right side */}
              <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                Continue →
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}