import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Lock, Play, Check } from "lucide-react";
import { useAuth } from "../Login/AuthContext";
import { completeVideo } from "../../Api/course.api";

function convertToEmbed(url) {
  try {
    if (!url) return "";
    if (url.includes("youtube.com")) {
      const id = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtu.be")) {
      const id = url.split("/").pop();
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  } catch {
    return url;
  }
}

export default function CourseContent({ course, content }) {
  const { user, isAuthenticated, openLogin } = useAuth();
  const [openIndex, setOpenIndex] = useState(null);
  const [openVideo, setOpenVideo] = useState(null);
  const [modules, setModules] = useState([]);

  /* ---------------- MAP BACKEND STATE ---------------- */

useEffect(() => {
  if (!course?.modules) return;

  const mapped = course.modules.map((m, mi) => ({
    id: m.id,
    title: m.title,
    videos: m.videos.map((v, vi) => ({
      id: v.id,
      title: v.title,
      videoUrl: v.videoUrl || v.url,
      completed: v.completed === true,
      locked: !course.purchased
        ? !(mi === 0 && vi === 0)   
        : !(mi === 0 && vi < 3),    
    })),
  }));

  setModules(mapped);
}, [course]);

  /* ---------------- VIDEO CLICK ---------------- */

  const handleVideoClick = (video) => {
    if (!isAuthenticated) return openLogin();
    if (video.locked) return;
    setOpenVideo(video);
  };

  /* ---------------- VIDEO COMPLETE ---------------- */

  const handleVideoComplete = async (video, moduleIndex, videoIndex) => {
    try {
      await completeVideo(user.id, video.id, course.id, modules[moduleIndex].id);

      setModules((prev) =>
        prev.map((m, mi) => {
          if (mi !== moduleIndex) return m;

          return {
            ...m,
            videos: m.videos.map((v, vi) => {
              if (vi === videoIndex) return { ...v, completed: true };
              if (vi === videoIndex + 1) return { ...v, locked: false };
              return v;
            }),
          };
        })
      );
    } catch (err) {
      console.error("Video complete failed:", err);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Course content</h2>

      {modules.map((module, mi) => (
        <div key={module.id} className="border rounded-lg mb-3">
          {/* MODULE HEADER */}
          <div
            onClick={() => setOpenIndex(openIndex === mi ? null : mi)}
            className="flex justify-between items-center p-4 cursor-pointer bg-gray-100"
          >
            <div>
              <p className="font-semibold">{module.title}</p>
              <p className="text-sm text-gray-500">
                {module.videos.length} lectures
              </p>
            </div>
            {openIndex === mi ? <ChevronUp /> : <ChevronDown />}
          </div>

          {/* VIDEO LIST */}
          {openIndex === mi && (
            <div className="bg-white px-4 py-3">
              {module.videos.map((video, vi) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoClick(video)}
                  className={`flex justify-between items-center py-2 border-b text-sm ${
                    video.locked
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {video.completed ? (
                      <Check size={14} className="text-green-600" />
                    ) : video.locked ? (
                      <Lock size={14} className="text-gray-400" />
                    ) : (
                      <Play size={14} className="text-blue-600" />
                    )}

                    <span
                      className={
                        video.locked
                          ? "text-gray-400"
                          : video.completed
                          ? "text-green-700"
                          : "text-gray-800"
                      }
                    >
                      {video.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* VIDEO PLAYER */}
      {openVideo && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="h-12 flex items-center px-4 text-white bg-black">
            <button onClick={() => setOpenVideo(null)}>← Back</button>

            <span className="ml-4 text-sm truncate">{openVideo.title}</span>

            <button
              onClick={() =>
                handleVideoComplete(
                  openVideo,
                  openIndex,
                  modules[openIndex].videos.findIndex(
                    (v) => v.id === openVideo.id
                  )
                )
              }
              className="ml-auto bg-green-600 px-3 py-1 rounded text-xs font-semibold"
            >
              Mark Complete
            </button>
          </div>

          <iframe
            src={convertToEmbed(openVideo.videoUrl)}
            className="w-full flex-1"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
