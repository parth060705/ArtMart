// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-100 text-black py-6 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center sm:text-left">
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

      <div className="bg-gray-200 text-gray-900 text-sm text-center py-3">
        &copy; 2025 YourCompany. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
