
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const MainLayout = () => {

  return (
    <div className="">
      <Navbar />
      <main className='px-6 py-4 min-h-[calc(100vh-250px)]'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
