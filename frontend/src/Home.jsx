import React from "react";
import { Link } from "react-router-dom";
import { RiHomeSmileLine, RiUser3Line, RiToolsLine } from "react-icons/ri";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import Hero from "./Assets/Hero.svg"; // ✅ make sure case matches your real file name

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" />
      </div>

      {/* Hero */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80">
              <Sparkles size={16} className="text-emerald-300" />
              Welcome to your Smart Hostel
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Hostel Management System
              <span className="block text-white/70 text-2xl sm:text-3xl mt-3 font-bold">
                Smarter rooms. Faster operations.
              </span>
            </h1>

            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-xl">
              Manage rooms, students, payments, and maintenance seamlessly. Build a
              modern hostel workflow that’s reliable, fast, and easy to use.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link to="/login">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 text-slate-950 px-6 py-3 font-extrabold hover:bg-emerald-400 transition">
                  Get Started
                  <ArrowRight size={18} />
                </button>
              </Link>

              <Link to="/admin/login">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-6 py-3 font-semibold text-white/90 hover:bg-white/10 transition">
                  Admin Login
                </button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge icon={<Zap size={16} />} text="Fast CRUD workflow" />
              <Badge icon={<ShieldCheck size={16} />} text="Secure access" />
              <Badge icon={<Sparkles size={16} />} text="Modern UI" />
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_30px_90px_rgba(0,0,0,0.55)] overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />
              <div className="p-6 sm:p-8">
                <img
                  src={Hero}
                  alt="Hostel illustration"
                  className="w-full h-auto rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="absolute -z-10 -inset-6 rounded-[2rem] bg-gradient-to-r from-emerald-500/10 to-sky-500/10 blur-2xl" />
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pb-16 sm:pb-24">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Key Features
            </h2>
            <p className="mt-2 text-white/70">
              Everything you need to run a hostel smoothly.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={<RiHomeSmileLine className="w-7 h-7" />}
            title="Room Management"
            desc="Assign, track, and manage rooms with capacity and availability."
            accent="from-emerald-500 to-emerald-400"
          />
          <FeatureCard
            icon={<RiUser3Line className="w-7 h-7" />}
            title="Student Management"
            desc="Maintain student profiles with quick updates and search."
            accent="from-sky-500 to-sky-400"
          />
          <FeatureCard
            icon={<RiToolsLine className="w-7 h-7" />}
            title="Maintenance Tracking"
            desc="Submit requests and monitor resolution status efficiently."
            accent="from-violet-500 to-violet-400"
          />
        </div>
      </section>
    </div>
  );
};

const Badge = ({ icon, text }) => (
  <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-white/80">
    <span className="text-emerald-200">{icon}</span>
    {text}
  </span>
);

const FeatureCard = ({ icon, title, desc, accent }) => (
  <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:bg-white/10 transition">
    <div className="flex items-center justify-between">
      <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${accent} text-slate-950 grid place-items-center`}>
        {icon}
      </div>
      <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 grid place-items-center text-white/70">
        →
      </div>
    </div>

    <h3 className="mt-5 text-lg font-extrabold text-white">{title}</h3>
    <p className="mt-2 text-sm text-white/70 leading-relaxed">{desc}</p>
  </div>
);

export default Home;