import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">About</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Email:</strong> info@teckblog.com
              </p>
              <p>
                <strong>Phone:</strong> 880 123 456 789
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Link</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Archived
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Author
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Category */}
          <div>
            <h3 className="font-bold text-lg mb-4">Category</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Travel
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Economy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary">
                  Sports
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Weekly Newsletter</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get blog articles and offers via email
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
              <button
                type="submit"
                className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <span className="font-bold text-gray-800">
              Teck<span className="text-primary">blog</span>
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">
              Terms of Use
            </Link>
            <span className="hidden md:inline">|</span>
            <Link to="/" className="hover:text-primary">
              Privacy Policy
            </Link>
            <span className="hidden md:inline">|</span>
            <Link to="/" className="hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 text-sm text-gray-500">
          © 2026 Teckblog. All rights reserved. Built with React & Laravel.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
