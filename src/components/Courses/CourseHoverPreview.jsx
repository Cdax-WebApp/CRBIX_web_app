import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../Navbar/CartContext";
import { useNavigate } from "react-router-dom";

export default function CourseHoverPreview({ course }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute z-50 left-full top-0 ml-4 w-[360px] bg-white rounded-xl shadow-2xl overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* ================= IMAGE ================= */}
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-sm mb-1 line-clamp-2">
          {course.title}
        </h3>

        {/* Badge + Update */}
        <div className="flex items-center gap-2 text-xs mb-2">
          {course.badge && (
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-semibold">
              {course.badge}
            </span>
          )}
          <span className="text-gray-500">
            {course.updated || "Updated recently"}
          </span>
        </div>

        {/* Meta */}
        <p className="text-xs text-gray-600 mb-2">
          {course.hours || "40+ hours"} •{" "}
          {course.level || "All Levels"} •{" "}
          {course.subtitles || "Subtitles"}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-3 line-clamp-3">
          {course.description ||
            "Learn with real-world projects and practical examples."}
        </p>

        {/* Learnings */}
        {course.learnings && (
          <ul className="space-y-2 mb-4">
            {course.learnings.slice(0, 3).map((item, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <Check
                  size={16}
                  className="text-green-600 mt-0.5"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              addToCart(course);
              navigate("/cart");
            }}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
          >
            Add to cart
          </button>

          <button
            onClick={() => navigate(`/course/${course.id}`)}
            className="flex-1 border border-blue-300 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100"
          >
            Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}