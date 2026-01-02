import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import React, { useState, useEffect } from "react";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

export default function AuthModal({ isOpen, onClose, mode = "login" }) {
  const [isPanelActive, setIsPanelActive] = useState(mode === "signup");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    cPass: "",
  });

  // When mode changes, update the panel
  useEffect(() => {
    setIsPanelActive(mode === "signup");
  }, [mode, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Register data:", formData);
    // Add your registration logic here
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", {
      email: formData.email,
      password: formData.password,
    });
    // Add your login logic here
  };

  // Blue color scheme
  const darkBlue = "#1a237e";
  const fancyBlue = "#2196f3";
  const blueGradient = `linear-gradient(135deg, ${darkBlue} 0%, ${fancyBlue} 100%)`;

  /* =========================
        STYLES
  ========================== */

  const wrapperStyles = {
    backgroundColor: "#fff",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    position: "relative",
    overflow: "hidden",
    width: "850px",
    maxWidth: "100%",
    minHeight: "550px",
  };

  const formBoxStyles = {
    position: "absolute",
    top: 0,
    height: "100%",
    transition: "all 0.6s ease-in-out",
  };

  const loginBox = {
    ...formBoxStyles,
    left: 0,
    width: "50%",
    zIndex: 2,
    transform: isPanelActive ? "translateX(100%)" : "translateX(0)",
  };

  const registerBox = {
    ...formBoxStyles,
    left: 0,
    width: "50%",
    opacity: isPanelActive ? 1 : 0,
    zIndex: isPanelActive ? 5 : 1,
    transform: isPanelActive ? "translateX(100%)" : "translateX(0)",
  };

  const slideWrapper = {
    position: "absolute",
    top: 0,
    left: "50%",
    width: "50%",
    height: "100%",
    overflow: "hidden",
    transition: "transform 0.6s ease-in-out",
    transform: isPanelActive ? "translateX(-100%)" : "translateX(0)",
    zIndex: 100,
  };

  const slide = {
    background: blueGradient,
    color: "#fff",
    position: "relative",
    left: "-100%",
    height: "100%",
    width: "200%",
    transform: isPanelActive ? "translateX(50%)" : "translateX(0)",
    transition: "transform 0.6s ease-in-out",
  };

  const panel = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 50px",
    textAlign: "center",
    top: 0,
    height: "100%",
    width: "50%",
    transition: "transform 0.6s ease-in-out",
  };

  const panelLeft = {
    ...panel,
    transform: isPanelActive ? "translateX(0)" : "translateX(-20%)",
  };

  const panelRight = {
    ...panel,
    right: 0,
    transform: isPanelActive ? "translateX(20%)" : "translateX(0)",
  };

  const form = {
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0 50px",
    height: "100%",
    textAlign: "center",
  };

  const input = {
    backgroundColor: "#f3f4f6",
    border: "2px solid transparent",
    borderRadius: "12px",
    padding: "10px 14px",
    margin: "6px 0",
    width: "100%",
    fontSize: "14px",
    transition: "all 0.3s ease",
    fontFamily: "'Poppins', sans-serif",
  };

  const button = {
    borderRadius: "25px",
    border: "none",
    background: blueGradient,
    color: "#FFFFFF",
    fontSize: "13px",
    fontWeight: "600",
    padding: "14px 50px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    transition: "all 0.3s ease",
    cursor: "pointer",
    boxShadow: `0 4px 15px rgba(33, 150, 243, 0.4)`,
    marginTop: "10px",
    fontFamily: "'Poppins', sans-serif",
  };

  const ghostBtn = {
    ...button,
    background: "transparent",
    border: "2px solid #FFFFFF",
    boxShadow: "none",
  };

  const social = {
    border: `2px solid ${fancyBlue}`,
    borderRadius: "50%",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    height: "45px",
    width: "45px",
    transition: "all 0.3s ease",
    color: fancyBlue,
    fontSize: "18px",
    textDecoration: "none",
    margin: "0 8px",
    cursor: "pointer",
    backgroundColor: "transparent",
  };

  const headingStyle = {
    fontWeight: "700",
    margin: "0 0 0 0",
    fontSize: "28px",
    color: "#333",
    fontFamily: "'Poppins', sans-serif",
  };

  const paragraphStyle = {
    fontSize: "15px",
    fontWeight: "300",
    lineHeight: "24px",
    letterSpacing: "0.5px",
    margin: "20px 0 30px",
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
  };

  const panelHeadingStyle = {
    fontWeight: "700",
    margin: "0",
    fontSize: "28px",
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[9998] backdrop-blur-sm"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.25,
              type: "spring",
              damping: 20,
              stiffness: 300,
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          >
            <div className="relative w-full max-w-[850px]">
              {/* CLOSE BUTTON */}
              <button
                onClick={onClose}
                className="absolute -top-10 -right-1 bg-white rounded-full p-2 shadow-xl hover:bg-gray-100 z-[10000] transition-all duration-300"
                style={{
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                }}
              >
                <HiX size={20} className="text-gray-700" />
              </button>

              {/* AUTH FORM */}
              <div style={wrapperStyles}>
                {/* REGISTER FORM */}
                <div style={registerBox}>
                  <form style={form} onSubmit={handleRegisterSubmit}>
                    <h1 style={headingStyle}>Create Account</h1>

                    <div style={{ margin: "10px 0 15px 0", display: "flex", gap: "12px" }}>
                      <button type="button" style={social}>
                        <FaFacebookF />
                      </button>
                      <button type="button" style={social}>
                        <FaGoogle />
                      </button>
                      <button type="button" style={social}>
                        <FaLinkedinIn />
                      </button>
                    </div>

                    <input
                      name="firstName"
                      style={input}
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <input
                      name="lastName"
                      style={input}
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    <input
                      name="email"
                      type="email"
                      style={input}
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <input
                      name="phoneNo"
                      type="tel"
                      style={input}
                      placeholder="Phone Number"
                      value={formData.phoneNo}
                      onChange={handleInputChange}
                    />
                    <input
                      name="password"
                      type="password"
                      style={input}
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <input
                      name="cPass"
                      type="password"
                      style={input}
                      placeholder="Confirm Password"
                      value={formData.cPass}
                      onChange={handleInputChange}
                    />

                    <button style={button} type="submit">
                      Sign Up
                    </button>
                  </form>
                </div>

                {/* LOGIN FORM */}
                <div style={loginBox}>
                  <form style={form} onSubmit={handleLoginSubmit}>
                    <h1 style={headingStyle}>Sign In</h1>

                    <div style={{ margin: "10px 0 15px 0", display: "flex", gap: "15px" }}>
                      <button type="button" style={social}>
                        <FaFacebookF />
                      </button>
                      <button type="button" style={social}>
                        <FaGoogle />
                      </button>
                      <button type="button" style={social}>
                        <FaLinkedinIn />
                      </button>
                    </div>

                    <input
                      name="email"
                      type="email"
                      style={input}
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <input
                      name="password"
                      type="password"
                      style={input}
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />

                    <a
                      href="#"
                      style={{
                        color: fancyBlue,
                        fontSize: "14px",
                        textDecoration: "none",
                        margin: "15px 0",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Forgot your password?
                    </a>

                    <button style={button} type="submit">
                      Sign In
                    </button>
                  </form>
                </div>

                {/* SLIDE PANEL */}
                <div style={slideWrapper}>
                  <div style={slide}>
                    <div style={panelLeft}>
                      <h1 style={panelHeadingStyle}>Welcome Back!</h1>
                      <p style={paragraphStyle}>
                        Stay connected by logging in with your credentials and continue your experience
                      </p>
                      <button style={ghostBtn} onClick={() => setIsPanelActive(false)}>
                        Sign In
                      </button>
                    </div>

                    <div style={panelRight}>
                      <h1 style={panelHeadingStyle}>Hey There!</h1>
                      <p style={paragraphStyle}>
                        Begin your amazing journey by creating an account with us today
                      </p>
                      <button style={ghostBtn} onClick={() => setIsPanelActive(true)}>
                        Sign Up
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}