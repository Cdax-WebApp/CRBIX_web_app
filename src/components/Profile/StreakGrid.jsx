import { useProfile } from "./ProfileContext";

export default function StreakGrid() {
  const { streaks = [] } = useProfile();

  const DAYS = 30;

  // last 30 days ke liye array banao
  const last30Days = Array.from({ length: DAYS }, (_, i) => {
    const streakIndex = streaks.length - DAYS + i;
    return streakIndex >= 0 ? streaks[streakIndex] : false;
  });

  return (
    <div className="grid grid-cols-7 gap-6">
      {last30Days.map((active, i) => (
        <div
          key={i}
          className={`h-14 w-22 rounded ${
            active ? "bg-blue-600" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
