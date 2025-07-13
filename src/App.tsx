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
import ProductDetail from './pages/product/ProductDetail';
import ProtectedRoute from './components/ProtectedRoutes';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import Home from './pages/Home';
import ProductListingPage from './pages/product/ProductListingPage';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/client';
import Profile from './pages/profile/Profile';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UploadProduct from './pages/product/UploadProduct';
import { ProductSearchProvider } from './context/ProductSearchContext';
function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <ProductSearchProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster richColors position="top-center" />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<MainLayout />}>
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
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ProductSearchProvider>
    </ThemeProvider>
  );
}

export default App;
