import React from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const Navbar = () => {
  return (
    <nav className="bg-emerald-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <i className="ri-home-4-fill text-3xl text-white"></i>
          <h1 className="text-xl font-bold tracking-wide text-white">
            Hostel Management
          </h1>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <li>
            <Link
              to="/"
              className="text-white hover:text-emerald-200 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/rooms"
              className="text-white hover:text-emerald-200 transition-colors duration-300"
            >
              Rooms
            </Link>
          </li>
          <li>
            <Link
              to="/students"
              className="text-white hover:text-emerald-200 transition-colors duration-300"
            >
              Students
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white hover:text-emerald-200 transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white hover:text-emerald-200 transition-colors duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Login Button */}
        <div className="hidden md:block">
          <Link
            to="/login"
            className="bg-white text-emerald-600 px-6 py-2 rounded-full font-semibold hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 flex items-center gap-2"
          >
            <i className="ri-login-box-line text-xl"></i> Login
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <i className="ri-menu-line text-3xl text-white cursor-pointer"></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
