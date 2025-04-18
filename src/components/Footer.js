// src/components/Footer.js
import React from "react";
import "./Footer.css";  // If you want to style your footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="contact-info">
        <p>Contact us at: support@academiccounseling.com</p>
      </div>
      <div className="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
      <p>&copy; 2025 Academic Counseling System. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
