
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
    <div className="relative md:pl-[15vw]">
      <Navbar />
      <main className={``}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
