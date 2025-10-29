import React from "react";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

const Navbar = () => {
  return (
    <nav className="bg-emerald-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-5 flex justify-center items-center relative">
        {/* Logo Section - Clickable */}
        <Link to="/" className="flex items-center space-x-3">
          <i className="ri-home-4-fill text-3xl text-white"></i>
          <h1 className="text-xl font-bold tracking-wide text-white">
            Hostel Management System
          </h1>
        </Link>

        <div className="absolute right-6">
          <Link
            to="/login"
            className="bg-white text-emerald-600 px-6 py-2 rounded-full font-semibold hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300 flex items-center gap-2"
          >
            <i className="ri-login-box-line text-xl"></i> Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
