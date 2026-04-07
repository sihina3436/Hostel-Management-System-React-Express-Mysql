import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiHome4Fill, RiMenu3Line, RiCloseLine } from "react-icons/ri";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    [
      "px-4 py-2 rounded-2xl text-sm font-semibold transition",
      isActive
        ? "bg-white/10 text-white"
        : "text-white/75 hover:text-white hover:bg-white/5",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-slate-950/70 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-2xl bg-emerald-500 text-slate-950 grid place-items-center shadow-sm">
              <RiHome4Fill className="text-xl" />
            </span>
            <div className="leading-tight">
              <div className="text-xs text-white/55 font-semibold">Hostel</div>
              <div className="text-lg font-extrabold text-white">
                Management System
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/register" className={linkClass}>
              Student Register
            </NavLink>
            <NavLink to="/login" className={linkClass}>
              Student Login
            </NavLink>
            <NavLink to="/admin/login" className={linkClass}>
              Admin
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden h-11 w-11 rounded-2xl bg-white/5 border border-white/10 text-white grid place-items-center hover:bg-white/10 transition"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {open ? (
              <RiCloseLine className="text-xl" />
            ) : (
              <RiMenu3Line className="text-xl" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-white/10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-col gap-2">
              <NavLink
                to="/"
                className={linkClass}
                end
                onClick={() => setOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/register"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                Student Register
              </NavLink>
              <NavLink
                to="/login"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                Student Login
              </NavLink>
              <NavLink
                to="/admin/login"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                Admin
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;