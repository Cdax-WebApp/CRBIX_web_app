import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer";
import HomeSections from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import { CartProvider } from "./components/CartContext";
import Cart from "./pages/Cart";
import CourseDetails from "./pages/CourseDetails";
import AuthModal from "./components/AuthModel";


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