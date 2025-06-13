import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Loginpage from './Loginpage';
import cartIcon from './assets/shopping-cart-01-svgrepo-com.svg';
import SearchBar from './Searchbar';


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
          <h2 className="text-xl font-bold">Logo</h2>
        </div>

        <nav className="flex gap-6 text-sm font-medium">
          <Link className="hover:underline cursor-pointer" to="/">Home</Link>
          {/* <Link className="hover:underline cursor-pointer" to="/">Contact</Link>
          <Link className="hover:underline cursor-pointer" to="/">About</Link> */}
        </nav>

        <div className="flex items-center gap-4">
           <SearchBar placeholder="Search artworks..." onSearch={handleSearch} />

          <Link to="/loginpage">
            <button
              type="button"
              className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-3 py-1 rounded-full"
            >
              Login
            </button>
          </Link>

          <Link to="/cart">
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
      </Routes>
    </BrowserRouter >
  );
}

export default App;
