// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../assets/user.png';

const Sidebar = () => {
  return (
    <aside className="w-full md:w-50 bg-white shadow-lg text-gray-800 p-6 space-y-8 text-sm transition-all duration-300">
      <nav className="space-y-3">
        {['Search artist', 'Shorts', 'Menu', 'Add'].map((item) => (
          <button
            key={item}
            className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 transition duration-200 font-medium"
          >
            {item}
          </button>
        ))}
      </nav>
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
