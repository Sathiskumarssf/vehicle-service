 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">MyApp</Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              ></path>
            </svg>
          </button>
        </div>
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'} w-full md:w-auto`}>
          <ul className="md:flex md:items-center">
            
            <li className="md:ml-4">
              <Link
                to="/about"
                className="block text-white py-2 px-4 hover:bg-blue-700 rounded"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
            <li className="md:ml-4">
              <Link
                to="/services"
                className="block text-white py-2 px-4 hover:bg-blue-700 rounded"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
            </li>
            <li className="md:ml-4">
              <Link
                to="/contact"
                className="block text-white py-2 px-4 hover:bg-blue-700 rounded"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
