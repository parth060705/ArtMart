import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Loginpage from './Loginpage';
import cartIcon from './assets/shopping-cart-01-svgrepo-com.svg';
import SearchBar from './Searchbar';
import Cart from './Cart';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoutes';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  return (
    <BrowserRouter>
      {/* Navbar */}
      <header className="bg-white shadow-md px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarVisible(!sidebarVisible)}
              aria-label="Toggle sidebar"
              className="text-black text-2xl"
            >
              ☰
            </button>
            <h2 className="text-black text-xl font-bold">ArtMart</h2>
          </div>
          <div className="md:hidden">
            {/* Optional: Add mobile menu toggle logic here */}
          </div>
        </div>

        <nav className="text-black flex flex-col md:flex-row gap-2 md:gap-6 text-sm font-medium items-center">
          <Link className="hover:underline" to="/">Home</Link>
          <Link className="hover:underline" to="/">About</Link>
        </nav>

        <div className="text-black flex flex-col sm:flex-row items-center gap-4">
          <SearchBar placeholder="Search artworks..." onSearch={handleSearch} />
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

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home sidebarVisible={sidebarVisible} />} />
        <Route path="/Loginpage" element={<Loginpage />} />
        {/* Uncomment this block to protect the routes */}
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Profile" element={<Profile />} />
        {/* </Route> */}
      </Routes>

      {/* Footer */}
      <footer className="bg-gray-100 text-black py-6 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center sm:text-left">
        <div>
          <p>Content 1</p>
          <p>Content 2</p>
          <p>Content 3</p>
          <p>Content 4</p>
        </div>
        <div>
          <p>A</p>
          <p>B</p>
          <p>C</p>
          <p>D</p>
        </div>
        <div>
          <p>LINK 1</p>
          <p>LINK 2</p>
          <p>LINK 3</p>
          <p>LINK 4</p>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="bg-gray-200 text-gray-900 text-sm text-center py-3">
        &copy; 2025 YourCompany. All rights reserved.
      </div>
    </BrowserRouter>
  );
}

export default App;
