import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false); // State for mobile menu toggle

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="font-bold text-xl">iTask</span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            <li className="cursor-pointer hover:underline transition-all">Home</li>
            <li className="cursor-pointer hover:underline transition-all">Your Tasks</li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Row-wise */}
      {open && (
        <div className="md:hidden bg-indigo-700">
          <ul className="flex justify-around px-4 py-2">
            <li className="cursor-pointer hover:underline transition-all">Home</li>
            <li className="cursor-pointer hover:underline transition-all">Your Tasks</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
