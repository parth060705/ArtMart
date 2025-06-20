// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import MainLayout from './Layout/Mainlayout';
import Home from './pages/Home';
import Loginpage from './pages/Loginpage';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ArtworkDetail from './pages/ArtworkDetail';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  // Example: using localStorage for auth token
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="Loginpage" element={<Loginpage />} />
          <Route path="art/:id" element={<ArtworkDetail />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Profile" element={<Profile />} />

          {/* Protected Routes Group */}
          {/* <Route element={<ProtectedRoute />}>
            <Route path="Cart" element={<Cart />} />
            <Route path="Profile" element={<Profile />} />
          </Route> */}
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
