import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../components/CartContext";
import CourseContent from "../components/CourseContent";
import { useAuth } from "../components/AuthContext";
import { getCourseById } from "../Api/course.api";


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

// HERO CAROUSEL
function HeroCarousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[360px] lg:h-[420px] overflow-hidden rounded-t-2xl">
      <img
        src={slides[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-full h-full object-cover transition duration-700"
      />
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/30 p-2 rounded-full hover:bg-black/50 text-white"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
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

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadCourse = async () => {
      setLoading(true);

      const data = await getCourseById(id, isAuthenticated ? user.id : null);

      if (!data) {
        setCourse(null);
        setLoading(false);
        return;
      }

      //  MAP BACKEND → UI
      setCourse({
        ...data,
        image:
          data.thumbnailUrl ||
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800",
        author: "CDax Professional's",
        rating: 4.6,
        reviews: "2,500",
        price: 299,
        originalPrice: 1999,
      });

      setLoading(false);
    };

    loadCourse();
  }, [id, isAuthenticated, user?.id]);

  if (loading) {
    return <div className="p-10 text-center">Loading course...</div>;
  }

  if (!course) {
    return (
      <div className="p-10 text-center text-xl font-bold">Course Not Found</div>
    );
  }

  const heroSlides = [
    course.image,
    "https://www.rushu.rush.edu/sites/default/files/legacy/images/news-articles/online-class-note-taking-news.jpg",
    "https://img.freepik.com/free-photo/books-laptop-assortment_23-2149765831.jpg?semt=ais_se_enriched&w=740&q=80",
  ];

  const handleEnroll = () => {
    if (!isAuthenticated) {
      openLogin();
      return;
    }

    const exists = cart.find((item) => item.id === course.id);

    // if (exists) {
    //   setPopupMessage("Course is already in your cart!");
    //   setShowPopup(true);
    //   setTimeout(() => setShowPopup(false), 3000);
    //   navigate("/cart");
    //   return;
    // }

    if (course.purchased) {
      navigate(`/learn/${course.id}`);
      return;
    }

    addToCart({
      id: course.id,
      title: course.title,
      price: course.price,
      image: course.image,
    });

    setPopupMessage("Course added to cart successfully!");
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      navigate("/cart");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#eaf9ff] text-gray-900 pt-10 pb-10 relative">
      {/* Popup */}
      {showPopup && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {popupMessage}
        </div>
      )}

      <section className="max-w-[1200px] mx-auto pt-8 bg-white rounded-2xl shadow-lg overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* HERO */}
        <HeroCarousel slides={heroSlides} />

        {/* Course Content */}
        <div className="p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
              {course.title}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-2">
              by {course.author}
            </p>
            <div className="flex items-center gap-2 text-yellow-500 mb-4">
              {Array.from({ length: Math.round(course.rating) }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
              <span className="text-gray-600 text-sm">
                ({course.reviews} reviews)
              </span>
            </div>
            {course.badge && (
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {course.badge}
              </span>
            )}

            <div className="mt-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                Course Overview
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Learn with expert mentors and hands-on projects. Get
                industry-level skills and job-ready experience with real world
                assignments.
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                Student Reviews
              </h3>
              <div className="flex gap-5 overflow-x-auto pb-3 snap-x">
                {REVIEWS.map((rev, i) => (
                  <div
                    key={i}
                    className="min-w-[250px] sm:min-w-[300px] snap-start bg-gradient-to-br from-blue-50 to-purple-50 p-5 rounded-xl border border-blue-100 shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={rev.img}
                        alt={rev.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-sm sm:text-base">
                          {rev.name}
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          {rev.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-yellow-500 mb-2">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star key={idx} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
            <CourseContent
              content={course.modules.map((m) => ({
                title: m.title,
                totalTime: `${m.videos?.length || 0} videos`,
                videos: m.videos.map((v) => ({
                  name: v.title,
                  locked: v.locked,
                  videoId: v.id,
                })),
              }))}
            />
          </div>

          {/* RIGHT CARD */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm h-fit sticky top-32">
            <div className="h-44 sm:h-56 overflow-hidden rounded-lg">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-lg font-semibold">
              <span>₹{course.price}</span>
              <span className="line-through text-gray-400">
                ₹{course.originalPrice}
              </span>
            </div>

            <button
              onClick={handleEnroll}
              className="mt-4 w-full py-3 bg-blue-700 text-white font-semibold rounded-lg"
            >
              {course.purchased ? "Continue Learning" : "Enroll Now"}
            </button>

            <div className="mt-4">
              <h3 className="font-semibold mb-3 text-base sm:text-lg">
                This Course Includes
              </h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Lifetime access</li>
                <li>• Certificate of Completion</li>
                <li>• Downloadable Resources</li>
                <li>• Access on Mobile & Web</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
