import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { register } from './serviceWorkerRegistration';
import { useNetworkStatus } from './hooks/useNetworkStatus';
import { useServiceWorkerUpdate } from './hooks/useServiceWorkerUpdate';
import { Routes as AppRoutes } from './lib/routes';

// Providers
import { ThemeProvider } from './components/ui/theme-provider';
import { ProductSearchProvider } from './context/ProductSearchContext';
import { queryClient } from './lib/client';

// Layouts
import MainLayout from './Layout/Mainlayout';
import LoadingSpinner from './components/LoadingSpinner';
import Chat from './pages/chat/Chat';

// Pages
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Home = React.lazy(() => import('./pages/Home'));
const Loginpage = React.lazy(() => import('./pages/auth/Loginpage'));
const Cart = React.lazy(() => import('./pages/Cart'));
const ArtworkDetail = React.lazy(() => import('./pages/product/ArtworkDetails'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage'));
const ResetPasswordPage = React.lazy(() => import('./pages/auth/ResetPasswordPage'));
const Profile = React.lazy(() => import('./pages/profile/Profile'));
const ProfileUpdate = React.lazy(() => import('./pages/profile/ProfileUpdate'));
const SearchProduct = React.lazy(() => import('./pages/product/SearchProduct'));
const ChatWrapper = React.lazy(() => import('./pages/chat/chatWrapper'));
const ChatList = React.lazy(() => import('./pages/chat/ChatList'));
const ArtworksListingPage = React.lazy(() => import('./pages/product/ArtworksListingPage'));
const WishList = React.lazy(() => import('./pages/product/WishList'));
const PublicProfile = React.lazy(() => import('./pages/profile/PublicProfile'));
const ArtistsPage = React.lazy(() => import('./pages/ArtistsPage'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = React.lazy(() => import('./pages/TermsAndConditions'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const UploadArtwork = React.lazy(() => import('./pages/product/UploadArtwork'));

// Admin Pages
const UserManage = React.lazy(() => import('./admin-panel/user_manage'));
const ArtworkManage = React.lazy(() => import('./admin-panel/artwork_manage'));
const OrderManage = React.lazy(() => import('./admin-panel/orders_manage'));
const AdminDashboardSkeleton = React.lazy(() => import('./admin-panel/admin_dashboard'));

// Components
const InstallButton = React.lazy(() => import('@/components/InstallButton'));
// Simple loading spinner component

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="lg" />
  </div>
);

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const { waitingWorker, isUpdateAvailable, updateServiceWorker } = useServiceWorkerUpdate();
  const isOnline = useNetworkStatus();

  // Register service worker
  useEffect(() => {
    register({
      onSuccess: () => {
        console.log('Service worker registered successfully');
      },
    });
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <ProductSearchProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster richColors position="top-center" />
          {/* Update notification is now handled by useServiceWorkerUpdate toast */}
          <Suspense fallback={<PageLoader />}>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route path="/auth" element={<MainLayout />}>
                  <Route index element={<Loginpage />} />
                  <Route path={AppRoutes.AuthLoginPage} element={<Loginpage />} />
                  <Route path={AppRoutes.AuthRegisterPage} element={<RegisterPage />} />
                </Route>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path={AppRoutes.AuthResetPasswordPage} element={<ResetPasswordPage />} />
                  <Route path={AppRoutes.ProductsListingPage} element={<ArtworksListingPage />} />
                  <Route path={`${AppRoutes.ProductDetailPage}/:id`} element={<ArtworkDetail />} />
                  <Route path={AppRoutes.SearchProductPage} element={<SearchProduct />} />
                  <Route path={AppRoutes.CartPage} element={<Cart />} />
                  <Route path={`${AppRoutes.ProfilePage}/:username`} element={<Profile />} />
                  <Route path={AppRoutes.ProfileUpdatePage} element={<ProfileUpdate />} />
                  <Route path={AppRoutes.UploadProductPage} element={<UploadArtwork />} />
                  <Route path={AppRoutes.WishListPage} element={<WishList />} />
                  <Route path={`${AppRoutes.ProfilePublicPage}/:userId`} element={<PublicProfile />} />
                  <Route path={AppRoutes.ArtistsRankingPage} element={<ArtistsPage />} />
                  <Route path={AppRoutes.TermsAndConditionsPage} element={<TermsAndConditions />} />
                  <Route path={AppRoutes.PrivacyPolicyPage} element={<PrivacyPolicy />} />
                  <Route path={AppRoutes.SettingsPage} element={<SettingsPage />} />

                  {/* chat */}
                  <Route path="/chat/:peerId" element={<ChatWrapper />} />
                  <Route path={AppRoutes.ChatPage} element={<ChatList />} />


                  {/* ------------------------------------------------------------------------------------------- */}
                  <Route path="/admin/user_manage" element={<UserManage />} />
                  <Route path="/admin/artwork_manage" element={<ArtworkManage />} />
                  <Route path="/admin/orders_manage" element={<OrderManage />} />
                  <Route path="/admin/admin_dashboard" element={<AdminDashboardSkeleton />} />
                  {/* ------------------------------------------------------------------------------------------- */}

                  <Route path="*" element={<NotFound />} />

                  {/* Protected Routes Group */}
                  {/* <Route element={<ProtectedRoute />}>s
            <Route path={AppRoutes.CartPage} element={<Cart />} />
            <Route path={AppRoutes.ProfilePage} element={<Profile />} />
          </Route> */}

                </Route>
              </Routes>
              <InstallButton />
            </BrowserRouter>
          </Suspense>
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
      </ProductSearchProvider>
    </ThemeProvider>
  );
}

export default App;
