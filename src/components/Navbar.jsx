// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import cartIcon from '../assets/shopping-cart-01-svgrepo-com.svg';
import SearchBar from './Searchbar';

const Navbar = ({ onToggleSidebar, onSearch }) => {
  return (
    <header className="bg-white shadow-md px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-screen">
      {/* Left Section: Brand and Navigation */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
            className="text-black text-2xl focus:outline-none"
          >
            ☰
          </button>
          <h2 className="text-xl font-bold text-black">ArtMart</h2>
          <Link to="/" className="text-black hover:underline text-sm md:text-base">
            Home
          </Link>
        </div>
      </div>

      {/* Right Section: Search, Login, Cart */}
      <div className="text-black flex flex-col sm:flex-row items-center gap-4 md:gap-6">
        <SearchBar placeholder="Search artworks..." onSearch={onSearch} />

        <Link to="/loginpage">
          <button className="bg-gradient-to-br from-blue-300 to-purple-400 text-white text-sm px-5 py-2 rounded-full hover:opacity-90 transition">
            Login
          </button>
        </Link>

        <Link to="/Cart" aria-label="View cart">
          <img
            src={cartIcon}
            alt="Cart"
            className="w-6 h-6 hover:scale-110 transition-transform duration-150"
          />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
