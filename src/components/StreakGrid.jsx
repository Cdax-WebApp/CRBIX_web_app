import { useProfile } from "./ProfileContext";

export default function StreakGrid() {
  const { streaks } = useProfile();

  return (
    <div className="grid grid-cols-7 gap-2">
      {streaks.map((active, i) => (
        <div
          key={i}
          className={`h-10 w-30 rounded ${
            active ? "bg-blue-600" : "bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
