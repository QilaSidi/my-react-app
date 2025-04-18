// src/components/Layout.js
import React from "react";
import "../styles/Layout.css"; // Ensure this points to the correct CSS file

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <main>{children}</main>
      <footer className="footer">
        <p>&copy; 2025 Academic Counseling System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;