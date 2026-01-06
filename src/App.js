// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import HomeSections from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext";
import Cart from "./pages/Cart";
import PrivacyPolicy from "./pages/privacyPolicy";
import CourseDetails from "./pages/CourseDetails";
import AuthModal from "./components/AuthModal";
import { useAuth } from "./components/AuthContext";
import { checkServerStatus } from "./Api/auth.api";
import Payment from "./pages/Payment";
import { FavoritesProvider } from "./components/FavoritesContext";
import FavouritesPage from "./pages/FavouritesPage";
import CoursePlans from "./components/CoursePlans";
import CourseGridSection from "./components/CourseSection";
import TermsAndConditions from "./components/TermsAndConditions";
import Accessibility from "./components/Accessibility";
import TechOnCDaX from "./components/TechOnCDaX";
import HelpSupport from "./components/HelpSupport";
import AboutUs from "./components/aboutUs";
import Careers from "./components/Careers";
import ContactUs from "./components/ContactUs";
import Blogs from "./components/Blogs";
import Investors from "./components/Investors";

function AppContent() {
  const { authOpen, authMode, openLogin, openSignup, closeAuth } = useAuth();

  useEffect(() => {
    // Check server connection on app load
    checkServerStatus().then((isRunning) => {
      if (!isRunning) {
        console.error("Backend server is not running!");
        // Optional: show alert only in development
        if (process.env.NODE_ENV === "development") {
          alert(
            "⚠️ Backend server is not running. Please start the Spring Boot application on port 8080."
          );
        }
      } else {
        console.log(" Backend server is running");
      }
    });
  }, []);

  return (
    <CartProvider>
        <FavoritesProvider>
      <Router>
        <ScrollToTop />

        <div className="min-h-screen flex flex-col">
          {/* NAVBAR */}
          <Navbar openLogin={openLogin} openSignup={openSignup} />

          {/* PAGE CONTENT */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomeSections />} />
              <Route path="/courses" element={<CourseGridSection />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/plans-pricing" element={<CoursePlans />} />
              <Route path="/favourites" element={<FavouritesPage />} /> 
              <Route path="/payment" element={<Payment />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="/tech-on-cdax" element={<TechOnCDaX />} />
              <Route path="/help-support" element={<HelpSupport />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/investors" element={<Investors />} />
            </Routes>
          </main>

          {/* FOOTER */}
          
          <Footer />

          {/* AUTH MODAL */}
          <AuthModal isOpen={authOpen} onClose={closeAuth} mode={authMode} />
        </div>
      </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;