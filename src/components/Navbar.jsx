import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/cdaxxlogo.png";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";

/* EXPLORE DATA */
const exploreData = {
  "Learn AI": [
    "AI Fundamentals",
    "AI For Professionals",
    "AI For Developers",
    "AI For Creatives",
  ],
  "Launch a new career": [
    "Full Stack Developer",
    "Data Scientist",
    "UI/UX Designer",
    "Cloud Engineer",
  ],
  "Prepare for certification": [
    "AWS Certification",
    "Google Cloud",
    "Azure Fundamentals",
  ],
  "Practice with Role Play": [
    "Interview Practice",
    "Client Simulation",
    "Mock Projects",
  ],
  Development: ["Web Development", "Mobile Development", "Game Development"],
  Business: ["Entrepreneurship", "Management", "Finance"],
  "IT & Software": ["Networking", "Cyber Security", "DevOps"],
  Design: ["UI Design", "UX Research", "Graphic Design"],
  Marketing: ["Digital Marketing", "SEO", "Content Marketing"],
};

export default function Navbar({ openLogin, openSignup }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showExplore, setShowExplore] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full h-[80px]">
      <div className="h-full bg-[#eaf9ff]/95 backdrop-blur border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between relative">
          {/* LOGO */}
          <Link to="/">
            <img src={logo} alt="CDAXX" className="h-14 md:h-16" />
          </Link>

          {/* CENTER */}
          <div className="hidden lg:flex flex-1 items-center gap-8 mx-4">
            <Link to="/">
              <button className="font-medium px-2 py-1 hover:text-blue-600">
                Home
              </button>
            </Link>
            
            {/* EXPLORE MEGA MENU */}
            <div
              className="relative"
              onMouseEnter={() => setShowExplore(true)}
              onMouseLeave={() => {
                setShowExplore(false);
                setActiveCategory(null);
              }}
            >
              <button className="font-medium px-2 py-1 hover:text-blue-600">
                Explore
              </button>

              {/* MEGA MENU */}
              <div
                className={`absolute left-0 top-full mt-3 bg-white shadow-2xl rounded-xl border z-50
                  transition-all duration-200 ${
                    showExplore
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
              >
                <div className="flex">
                  {/* LEFT – MAIN CATEGORIES */}
                  <ul className="w-[320px] border-r">
                    {Object.keys(exploreData).map((category) => (
                      <li
                        key={category}
                        onMouseEnter={() => setActiveCategory(category)}
                        className={`flex items-center justify-between px-5 py-3 cursor-pointer text-sm font-medium
                          ${
                            activeCategory === category
                              ? "bg-blue-50 text-blue-600"
                              : "hover:bg-blue-50"
                          }`}
                      >
                        <span>{category}</span>
                        <HiChevronRight className="text-gray-400" />
                      </li>
                    ))}
                  </ul>

                  {/* RIGHT – SUB CATEGORIES (ONLY ON HOVER) */}
                  {activeCategory && (
                    <div className="w-[320px] p-5">
                      <ul className="space-y-3">
                        {exploreData[activeCategory].map((sub) => (
                          <li
                            key={sub}
                            className="flex items-center justify-between text-sm text-gray-700 hover:text-blue-600 cursor-pointer"
                          >
                            <span>{sub}</span>
                            <HiChevronRight className="text-gray-300" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SEARCH */}
            <form className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search for anything"
                className="w-full px-4 py-2 rounded-full border"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                Search
              </button>
            </form>

            <Link to="/plans-pricing" className="font-medium">
              Plans & Pricing
            </Link>

            <Link to="/privacy-policy" className="font-medium">
              Privacy & Policy
            </Link>
          </div>

          {/* RIGHT */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/cart">
              <motion.button className="flex items-center gap-1 px-4 py-2 rounded-full border text-sm">
                <HiOutlineShoppingCart size={18} />
                Cart
              </motion.button>
            </Link>

            <button
              onClick={openLogin}
              className="px-4 py-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-50"
            >
              Login
            </button>

            <button
              onClick={openSignup}
              className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              Sign up
            </button>
          </div>

          {/* MOBILE */}
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="lg:hidden px-4 pb-6 space-y-4 border-t bg-[#eaf9ff]">
            <Link to="/explore-courses">Explore</Link>
            <Link to="/plans-pricing">Plans & Pricing</Link>
            <Link to="/cart">Cart</Link>
            <button
              onClick={openLogin}
              className="block w-full text-left py-2"
            >
              Login
            </button>
            <button
              onClick={openSignup}
              className="block w-full bg-blue-500 text-white text-center py-2 rounded-full"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}