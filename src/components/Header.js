// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";  // Import the header styles

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Academic Counseling</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/student-login">Student Login</Link></li>
          <li><Link to="/counselor-login">Counselor Login</Link></li>
          <li><Link to="/appointment-booking">Book Appointment</Link></li>
          <li><Link to="/chatbot">Chatbot</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
