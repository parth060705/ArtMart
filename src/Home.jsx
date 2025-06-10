import React from 'react';

const Home = ({ sidebarVisible }) => {
  return (
    <div className="min-h-screen w-screen bg-slate-100 flex flex-col">

      {/* Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {sidebarVisible && (
          <aside className="w-50 bg-slate-500 text-white p-4">
            <h4 className="font-bold mb-3">Options (Sidebar)</h4>
            <div className="space-y-2">
              <p className='hover:bg-white hover:text-black cursor-pointer px-4 py-2 rounded-lg'>A</p>
              <p className='hover:bg-white hover:text-black cursor-pointer px-4 py-2 rounded-lg'>B</p>
              <p className='hover:bg-white hover:text-black cursor-pointer px-4 py-2 rounded-lg'>C</p>
              <p className='hover:bg-white hover:text-black cursor-pointer px-4 py-2 rounded-lg'>D</p>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 bg-slate-100 text-slate-900 p-4">
          <h1 className="text-2xl font-bold mb-4">Main Content</h1>
          <p>This is the main area of your application.</p>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-300 py-6 px-10 flex flex-wrap justify-around">
        <div>
          <p>Content 1</p>
          <p>Content 2</p>
          <p>Content 3</p>
          <p>Content 4</p>
        </div>
        <div>
          <p>A</p>
          <p>B</p>
          <p>C</p>
          <p>D</p>
        </div>
        <div>
          <p>LINK 1</p>
          <p>LINK 2</p>
          <p>LINK 3</p>
          <p>LINK 4</p>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="bg-slate-950 text-gray-400 text-sm text-center py-3">
        &copy; 2025 YourCompany. All rights reserved.
      </div>
    </div>
  );
};

export default Home;
