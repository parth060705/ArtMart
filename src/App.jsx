import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Loginpage from './Loginpage';
import cartIcon from './assets/shopping-cart-01-svgrepo-com.svg';
import SearchBar from './Searchbar';
import Cart from './Cart';
import Profile from './Profile';


function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Add your filtering logic here
  };

  return (
    <BrowserRouter>

      {/* Navbar */}
      <header className="bg-white text-black flex justify-between items-center px-4 py-2 shadow-md">
        
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-2xl px-3 py-1 border-none"
            onClick={() => setSidebarVisible(!sidebarVisible)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <h2 className="text-xl font-bold">ArtMart</h2>
        </div>

        <nav className="flex gap-6 text-sm font-medium">
          <Link className="hover:underline cursor-pointer" to="/">Home</Link>
          <Link className="hover:underline cursor-pointer" to="/">About</Link>
        </nav>

        <div className="flex items-center gap-4">
           <SearchBar placeholder="Search artworks..." onSearch={handleSearch} />

          <Link to="/loginpage">
            <button
              type="button"
              className="bg-gradient-to-br from-blue-300 to-purple-400 text-white text-sm px-3 py-1 rounded-full"
            >
              Login
            </button>
          </Link>

          <Link to="/Cart">
            <button type="button" aria-label="View cart">
              <img src={cartIcon} alt="Cart" className="w-6 h-6" />
            </button>
          </Link>
        </div>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home sidebarVisible={sidebarVisible} />} />
        <Route path="/Loginpage" element={<Loginpage />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-gray-100 text-black py-6 px-6 flex flex-col md:flex-row md:justify-around gap-6">
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

    </BrowserRouter >
  );
}

export default App;
