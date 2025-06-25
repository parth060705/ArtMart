// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import { useState, useEffect } from 'react';

import MainLayout from './Layout/Mainlayout';
import Loginpage from './pages/auth/Loginpage';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ArtworkDetail from './pages/ArtworkDetail';
import ProtectedRoute from './components/ProtectedRoutes';
import UploadArtwork from './pages/Uploadartworks';
import ArtistDashboard from './pages/Artistdashbord';
import AuthLayout from './Layout/AuthLayout';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import Home from './pages/Home';
import ProductListingPage from './pages/ProductListingPage';

function App() {
  // Example: using localStorage for auth token
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Loginpage />} />
          <Route path="login" element={<Loginpage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>
        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductListingPage />} />
          <Route path="art/:id" element={<ArtworkDetail />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Uploadartworks" element={<UploadArtwork />} />
          <Route path="Artistdashboard" element={<ArtistDashboard />} />

          {/* Protected Routes Group */}
          {/* <Route element={<ProtectedRoute />}>
            <Route path="Cart" element={<Cart />} />
            <Route path="Profile" element={<Profile />} />
          </Route> */}

        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
