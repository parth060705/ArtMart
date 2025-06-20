// src/layouts/MainLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const MainLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  return (
    <div className="bg-gradient-to-br from-blue-200 to-purple-300 flex flex-col min-h-screen overflow-x-hidden">
      <Navbar
        onToggleSidebar={() => setSidebarVisible((prev) => !prev)}
        onSearch={handleSearch}
      />

      <div className="flex flex-1">
        {sidebarVisible && <Sidebar />}

        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
