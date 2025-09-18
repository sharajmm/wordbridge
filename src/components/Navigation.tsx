import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation: React.FC = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/vocabulary", label: "Vocabulary" },
    { path: "/grammar", label: "Grammar" },
    { path: "/quiz", label: "Quiz" },
    { path: "/tips", label: "Tips" },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 shadow-2xl border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                WordBridge
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden sm:flex items-center space-x-1">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2
                  ${
                    location.pathname === path
                      ? "text-white"
                      : "text-gray-300 hover:text-purple-400"
                  }`}
              >
                <span className="relative">
                  {label}
                  {location.pathname === path && (
                    <span className="absolute left-0 right-0 -bottom-2 mx-auto h-1 w-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-300" />
                  )}
                </span>
              </Link>
            ))}
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-purple-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
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

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden mt-2 flex flex-col space-y-1 animate-fade-in">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2
                  ${
                    location.pathname === path
                      ? "text-white"
                      : "text-gray-300 hover:text-purple-400"
                  }`}
              >
                <span className="relative">
                  {label}
                  {location.pathname === path && (
                    <span className="absolute left-0 right-0 -bottom-2 mx-auto h-1 w-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-300" />
                  )}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
