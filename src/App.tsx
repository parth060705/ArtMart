// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './components/ui/theme-provider';
import { Toaster } from 'sonner';
import { useState, useEffect } from 'react';

import MainLayout from './Layout/Mainlayout';
import Loginpage from './pages/auth/Loginpage';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import ProtectedRoute from './components/ProtectedRoutes';
import AuthLayout from './Layout/AuthLayout';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import Home from './pages/Home';
import ProductListingPage from './pages/ProductListingPage';
import { QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import { queryClient } from './query/client';
import Profile from './pages/Profile';
import UploadProduct from './pages/UploadProduct';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">

      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="top-center" />
        <BrowserRouter>
          <Navbar />
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
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="Cart" element={<Cart />} />
              <Route path="profile/:username" element={<Profile />} />
              <Route path="upload" element={<UploadProduct />} />
              {/* <Route path="Artistdashboard" element={<ArtistDashboard />} /> */}
              <Route path="*" element={<NotFound />} />

              {/* Protected Routes Group */}
              {/* <Route element={<ProtectedRoute />}>
            <Route path="Cart" element={<Cart />} />
            <Route path="Profile" element={<Profile />} />
          </Route> */}

            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
