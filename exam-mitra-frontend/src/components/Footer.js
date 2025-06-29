import React from "react";
import "../CSS/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Footer Navigation Links */}
      <div className="footer-links">
        <a href="/">Home</a>
        <a href="/">Features</a>
        <a href="/">How It Works</a>
        <a href="/">Contact</a>
        <a href="/">Terms of Service</a>
        <a href="/">Privacy Policy</a>
      </div>

      {/* Social Media Links */}
      <div className="social-links">
        <a href="/">LinkedIn</a>
        <a href="/">Instagram</a>
      </div>

      {/* Copyright Text */}
      <p className="footer-text">© 2025 ExamMitra. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
