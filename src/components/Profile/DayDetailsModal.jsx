export default function DayDetailsModal({ day, onClose }) {
  const videos = Object.values(day.videoDetails || []);

  // 👉 Sirf watched videos
  const watchedVideos = videos.filter(
    (v) => (v.watchedSeconds || 0) > 0
  );

  const dateLabel = new Date(day.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-[#eaf9ff] text-black rounded-2xl w-full max-w-sm p-4">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-yellow-200 text-black font-bold rounded-lg w-10 h-10 flex items-center justify-center">
            {new Date(day.date).getDate()}
          </div>
          <div>
            <p className="font-semibold">{dateLabel}</p>
            <p className="text-xs text-green-400">Active Day</p>
          </div>
        </div>

        {/* DAY PROGRESS */}
        <div className="bg-white rounded-xl p-3 mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Progress</span>
            <span className="text-gray-400">Watch Time</span>
          </div>

          <div className="flex justify-between font-semibold mb-2">
            <span>{(day.progressPercentage || 0).toFixed(1)}%</span>
            <span className="text-cyan-400">
              {Math.floor((day.watchedSeconds || 0) / 60)}m
            </span>
          </div>

          <div className="h-1 bg-gray-700 rounded">
            <div
              className="h-1 bg-yellow-300 rounded"
              style={{ width: `${day.progressPercentage || 0}%` }}
            />
          </div>
        </div>

        {/* WATCHED VIDEOS */}
        <p className="text-sm font-semibold mb-2">
          Videos Watched ({watchedVideos.length})
        </p>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {watchedVideos.map((v, i) => {
            const progress = Math.round(v.videoProgress || 0);

            return (
              <div key={i} className="bg-[#020617] rounded-xl p-3">
                
                {/* VIDEO TITLE */}
                <p className="text-sm font-medium mb-2">
                  {v.videoTitle}
                </p>

                {/* PROGRESS BAR */}
                <div className="h-1 bg-gray-700 rounded">
                  <div
                    className={`h-1 rounded ${
                      progress === 100 ? "bg-green-400" : "bg-cyan-400"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="text-xs text-gray-400 mt-1">
                  {progress}% watched
                </p>
              </div>
            );
          })}

          {watchedVideos.length === 0 && (
            <p className="text-xs text-gray-400 text-center">
              No videos watched this day
            </p>
          )}
        </div>

        {/* CLOSE */}
         <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}