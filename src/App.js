import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer";
import HomeSections from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import { CartProvider } from "./components/CartContext";
import Cart from "./pages/Cart";
import CourseDetails from "./pages/CourseDetails";
<<<<<<< HEAD
import AuthModal from "./components/AuthModal";
import PrivacyPolicy from "./pages/privacyPolicy";
=======
import AuthModal from "./components/AuthModel";

>>>>>>> 1e34fb5397762df4e30f5e0c48f5ab8ce4b446f4

function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />

        <div className="min-h-screen flex flex-col">
          {/* NAVBAR */}
          <Navbar
            openLogin={() => {
              setAuthMode("login");
              setAuthOpen(true);
            }}
            openSignup={() => {
              setAuthMode("signup");
              setAuthOpen(true);
            }}
          />

          {/* PAGE CONTENT */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomeSections />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </main>

          {/* FOOTER */}
          <Footer />

          {/* AUTH MODAL */}
          <AuthModal
            isOpen={authOpen}
            onClose={() => setAuthOpen(false)}
            mode={authMode}
          />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;