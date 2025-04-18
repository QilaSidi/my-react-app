// src/components/Navigation.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navigation.css"; // Create a CSS file for navigation styles if needed

const Navigation = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/student-login">Student Login</Link>
      <Link to="/counselor-login">Counselor Login</Link>
      <Link to="/about">About Us</Link>
      {/* You can add more links here as needed, potentially conditionally rendering
           links based on authentication status if you want a dynamic menu */}
    </nav>
  );
};

export default Navigation;