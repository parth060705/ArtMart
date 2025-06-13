import React from 'react';

const Home = ({ sidebarVisible }) => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-200 to-purple-300 text-white flex flex-col overflow-x-hidden">

      {/* Content Area */}
      <div className={`flex flex-1 md:flex-row`}>
        {/* Sidebar */}
        {sidebarVisible && (
          <aside className="w-full md:w-40 bg-transparent text-black p-4 md:block text-sm">
            <h4 className="font-medium mb-3">Options (Sidebar)</h4>
            <div className="space-y-2">
              <button className='hover:bg-white transition duration-200 cursor-pointer px-4 py-2 rounded-lg w-full text-left'>A</button>
              <button className='hover:bg-white transition duration-200 cursor-pointer px-4 py-2 rounded-lg w-full text-left'>B</button>
              <button className='hover:bg-white transition duration-200 cursor-pointer px-4 py-2 rounded-lg w-full text-left'>C</button>
              <button className='hover:bg-white transition duration-200 cursor-pointer px-4 py-2 rounded-lg w-full text-left'>D</button>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 bg-transparent text-slate-900 p-4">
          <h1 className="text-2xl font-bold mb-4">Main Content</h1>
          <p>This is the main area of your application.</p>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white text-black py-6 px-6 flex flex-col md:flex-row md:justify-around gap-6">
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
      <div className="bg-gray-100 text-gray-900 text-sm text-center py-3">
        &copy; 2025 YourCompany. All rights reserved.
      </div>
    </div>
  );
};

export default Home;
