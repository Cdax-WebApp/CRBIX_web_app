import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Footer from "./components/Footer/Footer";
import HomeSections from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar/Navbar";
import { CartProvider } from "./components/Navbar/CartContext";
import { AuthProvider, useAuth } from "./components/Login/AuthContext";
import Cart from "./pages/Cart";
import PrivacyPolicy from "./components/Footer/privacyPolicy";
import CourseDetails from "./pages/CourseDetails";
import Payment from "./pages/Payment";
import { FavoritesProvider, useFavorites } from "./components/Navbar/FavoritesContext";
import { ProfileProvider } from "./components/Profile/ProfileContext";
import ProfilePage from "./pages/ProfilePage";
import Investors from "./components/Footer/Investors";
import Blogs from "./components/Footer/Blogs";
import ContactUs from "./components/Footer/ContactUs";
import Careers from "./components/Footer/Careers";
import AboutUs from "./components/Footer/aboutUs";
import HelpSupport from "./components/Footer/HelpSupport";
import TechOnCDaX from "./components/Footer/TechOnCDaX";
import Accessibility from "./components/Footer/Accessibility";
import TermsAndConditions from "./components/Footer/TermsAndConditions";
import CourseGridSection from "./components/Courses/CourseSection";
import CoursePlans from "./components/Courses/CoursePlans";
import FavouritesPage from "./pages/FavouritesPage";
import AuthModal from "./components/Login/AuthModal";
import MyCourses from "./pages/MyCourses";
import SettingsPage from "./components/Profile/SettingsPage";
import CertificationsPage from "./components/Profile/CertificationsPage";
import PlacementPage from "./components/Profile/PlacementPage";
import { ThemeProvider } from "./components/Profile/ThemeContext";
import Breadcrumb from "./components/Navbar/Breadcrumb";
import ReminderPopup from "./pages/ReminderPopup";

function AppLayout() {
  const location = useLocation();
  const { authOpen, authMode, openLogin, openSignup, closeAuth } = useAuth();
  const hideBreadcrumb = /^\/course\/\d+/.test(location.pathname);
  const { showReminder, reminderCourses, handleDismissReminder, handleReminderPurchaseClick } = useFavorites();

  return (
    <>
      <ScrollToTop />

      <div className="min-h-screen flex flex-col">
        {/* NAVBAR */}
        <Navbar openLogin={openLogin} openSignup={openSignup} />

        {/* BREADCRUMB */}
        {!hideBreadcrumb && <Breadcrumb />}

        {/* PAGE CONTENT */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomeSections />} />
            <Route path="/courses" element={<CourseGridSection />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/profile" element={<ProfilePage />} />
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
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/placement" element={<PlacementPage />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <Footer />

        {/* AUTH MODAL */}
        <AuthModal
          isOpen={authOpen}
          onClose={closeAuth}
          mode={authMode}
        />

        {/* REMINDER POPUP */}
        <ReminderPopup
          isOpen={showReminder}
          courses={reminderCourses}
          onDismiss={(courseId) => handleDismissReminder(courseId, false)}
          onDismissPermanently={(courseId) => handleDismissReminder(courseId, true)}
          onPurchase={handleReminderPurchaseClick}
        />
      </div>
    </>
  );
}

/* MAIN APP */

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ProfileProvider>
          <CartProvider>
            <FavoritesProvider>
              <Router>
                <AppLayout />
              </Router>
            </FavoritesProvider>
          </CartProvider>
        </ProfileProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;