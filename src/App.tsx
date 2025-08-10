// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './components/ui/theme-provider';
import { Toaster } from 'sonner';
import { useState, useEffect } from 'react';

// ---------------------------------------------------------------
import UserManage from './admin-panel/user_manage';
import ArtworkManage from './admin-panel/artwork_manage';
import OrderManage from './admin-panel/orders_manage';
// ------------------------------------------------------------------


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
import ProfileUpdate from './pages/profile/ProfileUpdate';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import UploadProduct from './pages/product/UploadProduct';
import { ProductSearchProvider } from './context/ProductSearchContext';
import SearchProduct from './pages/product/SearchProduct';
import { Routes as AppRoutes } from './lib/routes';
import MainLayout from './Layout/Mainlayout';
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
                <Route path={AppRoutes.AuthLoginPage} element={<Loginpage />} />
                <Route path={AppRoutes.AuthRegisterPage} element={<RegisterPage />} />
                <Route path={AppRoutes.AuthForgotPasswordPage} element={<ForgotPasswordPage />} />
                <Route path={AppRoutes.AuthResetPasswordPage} element={<ResetPasswordPage />} />
              </Route>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path={AppRoutes.ProductsListingPage} element={<ProductListingPage />} />
                <Route path={`${AppRoutes.ProductDetailPage}/:id`} element={<ProductDetail />} />
                <Route path={AppRoutes.SearchProductPage} element={<SearchProduct />} />
                <Route path={AppRoutes.CartPage} element={<Cart />} />
                <Route path={AppRoutes.ProfilePage} element={<Profile />} />
                <Route path={AppRoutes.ProfileUpdatePage} element={<ProfileUpdate />} />
                <Route path={AppRoutes.UploadProductPage} element={<UploadProduct />} />
                <Route path="*" element={<NotFound />} />

{/* ------------------------------------------------------------------------------------------- */}
                <Route path="admin/user_manage" element={<UserManage />} />
                <Route path="admin/artwork_manage" element={<ArtworkManage />} />
                <Route path="admin/orders_manage" element={<OrderManage />} />
{/* ------------------------------------------------------------------------------------------- */}

                {/* Protected Routes Group */}
                {/* <Route element={<ProtectedRoute />}>s
            <Route path={AppRoutes.CartPage} element={<Cart />} />
            <Route path={AppRoutes.ProfilePage} element={<Profile />} />
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
