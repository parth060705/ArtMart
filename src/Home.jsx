import React from 'react';
import { Link } from 'react-router-dom';

import profileIcon from './assets/profile-circle-svgrepo-com.svg';


const Home = ({ sidebarVisible }) => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-200 to-purple-300 text-white flex flex-col overflow-x-hidden">

      {/* Content Area */}
      <div className={`flex flex-1 md:flex-row`}>
        {/* Sidebar */}
        {sidebarVisible && (
          <aside className="w-full md:w-50 bg-transparent text-black p-4 md:block text-sm">
            {/* <h4 className="font-medium mb-3">Options (Sidebar)</h4> */}
            <div className="space-y-2">
              <button className='hover:bg-white transition duration-200 cursor-pointer px-4 py-2 rounded-lg w-full text-left'>Search artist</button>
              <button className='hover:bg-white transition duration-200 cursor-pointer px-4 py-2 rounded-lg w-full text-left'>B</button>
              <button className='hover:bg-white transition duration-200 cursor-pointer px-4 py-2 rounded-lg w-full text-left'>C</button>
              <button className='hover:bg-white transition duration-200 cursor-pointer px-4 py-2 rounded-lg w-full text-left'>D</button>
            </div>
            <div className='mt-18'>
              <Link to="/profile" aria-label="View profile">
                <img src={profileIcon} alt="profile" className="w-15 h-15 rounded-full hover:w-16 hover:h-16 transition duration-200" />
              </Link>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 bg-transparent text-slate-900 p-4">
          <h1 className="text-2xl font-bold mb-4">Main Content</h1>
          <p>This is the main area of your application.</p>
        </main>
      </div>
    </div>
  );
};

export default Home;
