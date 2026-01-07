import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const dummyCourses = [
  { id: 1, title: "Full Stack Development" },
  { id: 2, title: "Data Science with Python" },
  { id: 3, title: "AI for Professionals" },
];

export default function EnrolledCoursesModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="font-semibold mb-4">Enrolled Courses</h2>

        {dummyCourses.map((c) => (
          <div key={c.id} className="py-2 border-b">
            {c.title}
          </div>
        ))}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
