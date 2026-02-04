import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">
              Teck<span className="text-primary">blog</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              Blog
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              Single Post
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              Pages
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              Contact
            </Link>
          </nav>

          {/* Search & Auth */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="text-gray-600 hover:text-primary transition">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* User Menu */}
            {isAuthenticated() ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, <span className="font-semibold">{user?.name}</span>
                </span>
                {isAdmin() && (
                  <Link
                    to="/admin/dashboard"
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 transition text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex flex-wrap gap-4">
          <Link to="/" className="text-gray-700 hover:text-primary text-sm">
            Home
          </Link>
          <Link to="/" className="text-gray-700 hover:text-primary text-sm">
            Blog
          </Link>
          <Link to="/" className="text-gray-700 hover:text-primary text-sm">
            Single Post
          </Link>
          <Link to="/" className="text-gray-700 hover:text-primary text-sm">
            Pages
          </Link>
          <Link to="/" className="text-gray-700 hover:text-primary text-sm">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
