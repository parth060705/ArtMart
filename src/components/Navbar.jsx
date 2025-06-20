// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import cartIcon from '../assets/shopping-cart-01-svgrepo-com.svg';
import SearchBar from './Searchbar';

const Navbar = ({ onToggleSidebar, onSearch }) => {
  return (
    <header className="bg-white shadow-md px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-10">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
            className="text-black text-2xl"
          >
            ☰
          </button>
          <h2 className="text-black text-xl font-bold">ArtMart</h2>
          <Link className="text-black hover:underline" to="/">Home</Link>
        </div>
      </div>

      <div className="text-black flex flex-col sm:flex-row items-center gap-4">
        <SearchBar placeholder="Search artworks..." onSearch={onSearch} />
        <Link to="/loginpage">
          <button className="bg-gradient-to-br from-blue-300 to-purple-400 text-white text-sm px-4 py-2 rounded-full w-full sm:w-auto">
            Login
          </button>
        </Link>
        <Link to="/Cart">
          <button aria-label="View cart" className="mt-2 sm:mt-0">
            <img src={cartIcon} alt="Cart" className="w-6 h-6" />
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
