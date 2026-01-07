import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Users,
  Clock,
  Award,
  Check,
} from "lucide-react";
import { useCart } from "../components/Navbar/CartContext";
import { useAuth } from "../components/Login/AuthContext";
import { getCourseById } from "../Api/course.api";
import CourseContent from "../components/Courses/CourseContent";

// Sample reviews
const REVIEWS = [
  {
    name: "Priya Sharma",
    role: "Software Engineer",
    rating: 5,
    comment: "Amazing course! The explanations were clear and super helpful.",
    img: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Raj Patel",
    role: "Frontend Developer",
    rating: 4,
    comment: "Very informative and practical with real-world projects.",
    img: "https://i.pravatar.cc/150?img=15",
  },
  {
    name: "Aisha Khan",
    role: "Data Scientist",
    rating: 5,
    comment: "Hands-on assignments boosted my confidence a lot!",
    img: "https://i.pravatar.cc/150?img=47",
  },
];

// HERO CAROUSEL - New simpler version
function HeroCarousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrentIndex((i) => (i + 1) % slides.length),
      4000
    );
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[360px] lg:h-[420px] overflow-hidden rounded-t-2xl">
      <img
        src={slides[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-full h-full object-cover transition duration-700"
      />
      <button
        onClick={() =>
          setCurrentIndex((i) => (i === 0 ? slides.length - 1 : i - 1))
        }
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/30 p-2 rounded-full hover:bg-black/50 text-white"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => setCurrentIndex((i) => (i + 1) % slides.length)}
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/30 p-2 rounded-full hover:bg-black/50 text-white"
      >
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-[#eaf9ff] scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// COURSE DETAILS PAGE
export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, openLogin } = useAuth();
  const { addToCart, cart } = useCart();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const alreadyInCart = cart.some((c) => c.id === course?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadCourse();
  }, [id, isAuthenticated, user?.id]);

  const loadCourse = async () => {
    setLoading(true);
    try {
      const data = await getCourseById(id, isAuthenticated ? user?.id : null);

      if (!data) {
        setCourse(null);
        setLoading(false);
        return;
      }

      // MAP BACKEND → UI
      setCourse({
        ...data,
        image: data.thumbnailUrl
          ? data.thumbnailUrl.startsWith("http")
            ? data.thumbnailUrl
            : `https://cdaxx-backend.onrender.com/${data.thumbnailUrl.replace(
                /^\/?/,
                ""
              )}`
          : "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800",
        author: data.instructor || "CDax Professionals",
        rating: 4.6,
        reviews: "2,500",
        price: data.price || 299,
        originalPrice: data.originalPrice || 1999,
      });
    } catch (err) {
      console.error("Failed to load course:", err);
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = () => {
    if (!isAuthenticated) {
      openLogin();
      return;
    }

    // Already purchased → start learning
    if (course.purchased) {
      navigate(`/learn/${course.id}`);
      return;
    }

    // Add to cart if not already added
    if (!alreadyInCart) {
      addToCart({
        id: course.id,
        title: course.title,
        price: course.price,
        image: course.image,
      });

      setPopupMessage("Course added to cart");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate("/cart");
      }, 800);
    } else {
      navigate("/cart");
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      openLogin();
      return;
    }

    if (!alreadyInCart) {
      addToCart({
        id: course.id,
        title: course.title,
        price: course.price,
        image: course.image,
      });
      setPopupMessage("Course added to cart!");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }

    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eaf9ff] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#eaf9ff] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Course Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The course you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  const heroSlides = [
    course.image,
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    "https://www.rushu.rush.edu/sites/default/files/legacy/images/news-articles/online-class-note-taking-news.jpg",
    "https://img.freepik.com/free-photo/books-laptop-assortment_23-2149765831.jpg?semt=ais_se_enriched&w=740&q=80",
  ];

  // Calculate total duration
  const calculateTotalDuration = () => {
    if (!course.modules || !Array.isArray(course.modules)) return "0h 0m";

    let totalSeconds = 0;
    course.modules.forEach((module) => {
      if (module.videos && Array.isArray(module.videos)) {
        module.videos.forEach((video) => {
          totalSeconds += video.duration || 0;
        });
      }
    });

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-[#eaf9ff] text-gray-900 pt-10 pb-10 relative">
      {/* Popup */}
      {showPopup && (
        <div className="fixed top-5 right-5 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-fade-in">
          <Check size={20} />
          <span className="font-semibold">{popupMessage}</span>
        </div>
      )}

      <section className="max-w-[1200px] mx-auto pt-8 bg-white rounded-2xl shadow-lg overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* HERO - New simpler version */}
        <HeroCarousel slides={heroSlides} />

        {/* Course Content */}
        <div className="p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {course.category && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {course.category}
                  </span>
                )}
                {course.level && (
                  <span className="px-3 py-1 bg-green-100 text-blue-700 rounded-full text-sm font-medium">
                    {course.level}
                  </span>
                )}
                {course.tags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                {course.title}
              </h1>
              <p className="text-gray-600 text-base sm:text-lg mb-4">
                by {course.author}
              </p>

              <div className="flex items-center gap-2 text-yellow-500 mb-4">
                {Array.from({ length: Math.round(course.rating) }).map(
                  (_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  )
                )}
                <span className="text-gray-600 text-sm ml-2">
                  {course.rating} ({course.reviews} reviews)
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{calculateTotalDuration()} total length</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{course.reviews} students enrolled</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                Course Overview
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {course.description ||
                  "Learn with expert mentors and hands-on projects. Get industry-level skills and job-ready experience with real world assignments."}
              </p>
            </div>

            {/* Student Reviews - New grid layout */}
            <div className="mt-10">
              <h3 className="text-xl sm:text-2xl font-semibold mb-6">
                Student Reviews
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {REVIEWS.map((rev, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 p-5 rounded-xl border border-blue-100 shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={rev.img}
                        alt={rev.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{rev.name}</p>
                        <p className="text-gray-600 text-sm">{rev.role}</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-500 mb-3">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star key={idx} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content Component */}
            <CourseContent course={course} />
          </div>

          {/* RIGHT CARD - Updated with new styling */}
          <div className="bg-white border rounded-xl shadow-lg h-fit sticky top-32 overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                onError={(e) =>
                  (e.target.src =
                    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800")
                }
              />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between text-xl font-bold mb-4">
                <span className="text-gray-900">₹{course.price}</span>
                {course.originalPrice &&
                  course.originalPrice > course.price && (
                    <span className="line-through text-gray-400">
                      ₹{course.originalPrice}
                    </span>
                  )}
              </div>

              <div className="space-y-4 mb-6">
                {course.isPurchased ? (
                  <button
                    onClick={handleEnroll}
                    className="mt-4 w-full py-3 bg-blue-700 text-white font-semibold rounded-lg"
                  >
                    {course.purchased ? "Continue Learning" : "Enroll Now"}
                  </button>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {course.purchased ? (
                        <button
                          onClick={() => navigate(`/learn/${course.id}`)}
                          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                        >
                          Continue Learning
                        </button>
                      ) : (
                        <button
                          onClick={handleEnroll}
                          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                        >
                          {alreadyInCart ? "Go to Cart" : "Start Learning"}
                        </button>
                      )}
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="w-full py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50"
                    >
                      {alreadyInCart ? "Go to Cart" : "Add to Cart"}
                    </button>
                  </>
                )}
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Award size={20} />
                  This Course Includes
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check size={14} className="text-blue-600" />
                    </div>
                    <span>Lifetime access</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check size={14} className="text-blue-600" />
                    </div>
                    <span>Certificate of Completion</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check size={14} className="text-blue-600" />
                    </div>
                    <span>Downloadable Resources</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Check size={14} className="text-blue-600" />
                    </div>
                    <span>Access on Mobile & Web</span>
                  </li>
                </ul>
              </div>

              {/* Course Info */}
              <div className="mt-6 border-t pt-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span className="font-medium">
                      {calculateTotalDuration()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Modules:</span>
                    <span className="font-medium">
                      {course.modules?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Level:</span>
                    <span className="font-medium">
                      {course.level || "All Levels"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last Updated:</span>
                    <span className="font-medium">Recently</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
