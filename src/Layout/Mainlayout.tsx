
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { useUserProfile } from '@/hooks/user/auth/useUserProfile';
import { useEffect } from 'react';

const MainLayout = () => {
  const { setUserProfile } = useAuth();
  const { data: userProfile } = useUserProfile();

  useEffect(() => {
    setUserProfile(userProfile);
  }, [userProfile]);

  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/products');

  return (
    <div className="">
      <Navbar />
      <main className={`md:px-6 py-4 ${isProductPage ? 'min-h-[calc(100vh-80px)]' : 'min-h-[calc(100vh-250px)]'}`}>
        <Outlet />
      </main>
      {/* {!isProductPage && <Footer />} */}
    </div>
  );
};

export default MainLayout;
