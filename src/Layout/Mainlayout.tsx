
import { Outlet } from 'react-router-dom';
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


  return (
    <div className="relative md:pl-[15vw]">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
