import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Loginpage from './Loginpage';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <BrowserRouter>
      {/* Navbar */}
      <header className="bg-slate-900 text-white flex justify-between items-center px-4 py-2 shadow-md">
        <div className="flex items-center gap-4">
          <button
            className="text-2xl px-3 py-1 border-none"
            onClick={() => setSidebarVisible(!sidebarVisible)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <h2 className="text-xl font-bold">Logo</h2>
        </div>

        <ul className="flex gap-6 text-sm font-medium">
          <Link className="hover:underline cursor-pointer" to="/">Home</Link>
          <Link className="hover:underline cursor-pointer" to="/Loginpage">Login</Link>
          <Link className="hover:underline cursor-pointer" to="/">Contact</Link>
          <Link className="hover:underline cursor-pointer" to="/">About</Link>
        </ul>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home sidebarVisible={sidebarVisible} />} />
        <Route path="/Loginpage" element={<Loginpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
