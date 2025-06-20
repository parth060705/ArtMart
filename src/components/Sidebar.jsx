// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../assets/user.png'; // Ensure this exists in your assets

const Sidebar = () => {
  return (
    <aside className="w-full md:w-64 bg-white shadow-lg text-gray-800 p-6 space-y-8 text-sm h-screen flex flex-col justify-between">
      {/* Navigation Section */}
      <nav className="space-y-3">
        <Link
          to="/search"
          className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition duration-200 font-medium"
        >
          🔍 Search Artist
        </Link>
        <Link
          to="/shorts"
          className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition duration-200 font-medium"
        >
          🎬 Shorts
        </Link>
        <Link
          to="/menu"
          className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition duration-200 font-medium"
        >
          📋 Menu
        </Link>
        <Link
          to="/upload"
          className="block w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition duration-200 font-medium"
        >
          ⬆️ Upload Arts
        </Link>
      </nav>

      {/* Profile Section */}
      <div className="flex items-center space-x-4 border-t pt-4">
        <Link to="/profile" aria-label="View profile">
          <img
            src={userIcon}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover hover:scale-105 transition-transform duration-200"
          />
        </Link>
        <div>
          <p className="text-base font-semibold">Account</p>
          <p className="text-xs text-gray-500">View profile</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
