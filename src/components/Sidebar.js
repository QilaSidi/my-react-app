// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center p-4 bg-gray-900">
        <h1 className="text-xl font-semibold">Counselor Dashboard</h1>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex-1 p-4">
        <ul>
          {/* Home Link */}
          <li className="mb-4">
            <Link
              to="/"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Dashboard
            </Link>
          </li>

          {/* Appointments Link */}
          <li className="mb-4">
            <Link
              to="/appointments"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Appointments
            </Link>
          </li>

          {/* Reports Link */}
          <li className="mb-4">
            <Link
              to="/reports"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Reports
            </Link>
          </li>

          {/* Settings Link */}
          <li className="mb-4">
            <Link
              to="/settings"
              className="block py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 bg-gray-900 text-center">
        <p className="text-sm">&copy; 2025 Your Company</p>
      </div>
    </div>
  );
};

export default Sidebar;
