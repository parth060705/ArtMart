
import  { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const MainLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  return (
    <>
      <main className='px-6 py-4'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
