import React from "react";
import { RiFacebookFill, RiLinkedinBoxFill, RiMailLine, RiPhoneLine, RiMapPin2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-emerald-600 text-white py-6 shadow-inner mt-12">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">

        {/* About Section */}
        <div className="space-y-2 text-center sm:text-left">
          <h4 className="text-md font-bold text-white">Hostel Management</h4>
          <p className="text-s text-white/90">
            Simplify hostel operations with our smart management system. Manage rooms, students, and maintenance efficiently.
          </p>
            <div className="flex pt-10 space-x-6 text-2xl">
                      <a href="#" className="hover:text-emerald-200 transition-colors transform hover:scale-110 duration-300">
                          <RiFacebookFill />
                      </a>
                      <a href="#" className="hover:text-emerald-200 transition-colors transform hover:scale-110 duration-300">
                          <RiLinkedinBoxFill />
                      </a>
            </div>

        </div>

        {/* Quick Links */}
        <div className="space-y-2 text-center sm:text-left">
          <h4 className="text-md font-bold text-white">Quick Links</h4>
          <ul className="space-y-1 text-white/90">
            <li><Link to="/" className="hover:text-emerald-200 transition-colors">Home</Link></li>
            <li><Link to="/rooms" className="hover:text-emerald-200 transition-colors">Rooms</Link></li>
            <li><Link to="/students" className="hover:text-emerald-200 transition-colors">Students</Link></li>
            <li><Link to="/about" className="hover:text-emerald-200 transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-200 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-center sm:text-left">
          <h4 className="text-md font-bold text-white">Contact Us</h4>
          <p className="flex items-center justify-center sm:justify-start gap-2 text-white/90"><RiMailLine /> info@hostelms.com</p>
          <p className="flex items-center justify-center sm:justify-start gap-2 text-white/90"><RiPhoneLine /> +94 71 123 4567</p>
          <p className="flex items-center justify-center sm:justify-start gap-2 text-white/90"><RiMapPin2Line /> Matara, Sri Lanka</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-6 border-t border-white/20 pt-3 text-center text-xs text-white/80">
        &copy; {new Date().getFullYear()} Hostel Management System | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
