import { useState } from "react";
import { useProfile } from "./ProfileContext";
import DayDetailsModal from "./DayDetailsModal";

export default function StreakGrid() {
  const {
    streakData,
    loadingStreak,
    enrolledCourses,
    selectedCourseId,
    setSelectedCourseId,
  } = useProfile();

  const [selectedDay, setSelectedDay] = useState(null);

  if (loadingStreak)
    return <p className="text-sm text-gray-400">Loading streak...</p>;

  if (!streakData)
    return <p className="text-sm text-gray-400">No streak data</p>;

  const { last30Days = [], currentStreakDays, courseTitle } = streakData;

  // ✅ Today → Past
  const calendarDays = [...last30Days]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 30);

  return (
    <>
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-semibold">{courseTitle}</p>
          <p className="text-xs text-gray-500">
            {currentStreakDays} day streak •{" "}
            {calendarDays.filter(d => d.isActiveDay).length}/30 active
          </p>
        </div>

        {/* 🔽 COURSE DROPDOWN */}
        <select
          value={selectedCourseId || ""}
          onChange={(e) => setSelectedCourseId(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm bg-white"
        >
          {enrolledCourses.map(course => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day) => {
          const progress = day.progressPercentage || 0;
          const isActive = day.isActiveDay;
          const dayNumber = new Date(day.date).getDate();

          const getColor = () => {
            if (!isActive) return "#E5E7EB";
            if (progress < 25) return "#FEF3C7";
            if (progress < 50) return "#FDE68A";
            if (progress < 75) return "#FBBF24";
            if (progress < 100) return "#F59E0B";
            return "#10B981";
          };

          return (
            <div
              key={day.date}
              onClick={() => setSelectedDay(day)}
              className="h-12 w-22 rounded flex items-center justify-center cursor-pointer hover:scale-110 transition font-semibold text-xs"
              style={{
                backgroundColor: getColor(),
                color: isActive ? "#111827" : "#6B7280",
              }}
              title={day.date}
            >
              {dayNumber}
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {selectedDay && (
        <DayDetailsModal
          day={selectedDay}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </>
  );
}
