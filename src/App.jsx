import { useState } from 'react';
import Loginpage from './Loginpage';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="min-h-screen w-screen bg-slate-100 flex flex-col">
      {/* Navbar */}
      <header className="bg-slate-900 text-white flex justify-between items-center px-5 py-3 shadow-md">
        <div className="flex items-center gap-4">
          <button
            className="text-2xl px-3 py-1 border-none"
            onClick={() => setSidebarVisible(!sidebarVisible)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <h2 className="text-xl font-bold">Logo</h2>
        </div>

        <ul className="flex gap-6 text-sm font-medium">
          <li className="hover:underline cursor-pointer">Home</li>
          <li className="hover:underline cursor-pointer">Contact</li>
          <li className="hover:underline cursor-pointer">About</li>
        </ul>
      </header>

      {/* Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {sidebarVisible && (
          <aside className="w-50 bg-slate-800 text-white p-4">
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
        <main className="flex-1 bg-slate-100 text-slate-900">

          <div
            className="w-full h-12 bg-amber-200 overflow-x-auto whitespace-nowrap flex items-center px-4 gap-2 scrollbar-thin"
            role="region"
            aria-label="Suggestion Box"
          >
            <button className="bg-white text-sm px-4 py-1 rounded-full shadow whitespace-nowrap">Suggestion 1</button>
            <button className="bg-white text-sm px-4 py-1 rounded-full shadow whitespace-nowrap">Suggestion 2</button>
            <button className="bg-white text-sm px-4 py-1 rounded-full shadow whitespace-nowrap">Suggestion 3</button>
            <button className="bg-white text-sm px-4 py-1 rounded-full shadow whitespace-nowrap">Suggestion 4</button>
            <button className="bg-white text-sm px-4 py-1 rounded-full shadow whitespace-nowrap">Suggestion 5</button>
            <button className="bg-white text-sm px-4 py-1 rounded-full shadow whitespace-nowrap">Suggestion 6</button>
            <button className="bg-white text-sm px-4 py-1 rounded-full shadow whitespace-nowrap">Suggestion 7</button>
            <button className="bg-white text-sm px-4 py-1 rounded-full shadow whitespace-nowrap">Suggestion 8</button>
          </div>


          {/* <Loginpage /> */}
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
}

export default App;
