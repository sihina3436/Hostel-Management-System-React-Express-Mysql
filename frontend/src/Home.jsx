import React from "react";
import { RiHomeSmileLine, RiUser3Line, RiToolsLine } from "react-icons/ri";
import Hero from "./Assets/hero.svg";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">

      {/* Hero Section */}
      <header className="flex-1 flex flex-col md:flex-row items-center justify-center px-8 md:px-16 py-20 bg-gradient-to-r from-emerald-50 to-emerald-50">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <p className="text-emerald-700 font-semibold uppercase tracking-wide animate-pulse">
            Welcome to Your Smart Hostel
          </p>
          <h2 className="text-3xl md:text-6xl font-bold text-emerald-600 leading-tight animate-fade-in">
            Simplify Hostel Management <br /> with Ease
          </h2>
          <p className="text-gray-700 text-lg md:text-xl">
            Manage rooms, students, and maintenance seamlessly. Make your hostel
            operations smarter, faster, and more efficient.
          </p>
          <div className="mt-4">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-300">
              Get Started
            </button>
          </div>
        </div>

        <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center animate-bounce-slow">
          <img
            src={Hero}
            alt="Hostel illustration"
            className="w-100 md:w-100 rounded-lg"
          />
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white text-center">
        <h3 className="text-3xl font-bold text-emerald-700 mb-12">
          Key Features
        </h3>

        <div className="grid gap-8 md:grid-cols-3 px-8 md:px-16">
          <div className="bg-emerald-50 p-6 rounded-3xl shadow hover:shadow-lg transition transform hover:-translate-y-2 duration-300">
            <RiHomeSmileLine className="mx-auto mb-4 text-emerald-600 w-16 h-16" />
            <h4 className="text-xl font-semibold mb-2 text-emerald-700">
              Room Management
            </h4>
            <p>
              Effortlessly assign, track, and manage hostel rooms and capacities.
            </p>
          </div>

          <div className="bg-emerald-50 p-6 rounded-3xl shadow hover:shadow-lg transition transform hover:-translate-y-2 duration-300">
            <RiUser3Line className="mx-auto mb-4 text-emerald-600 w-16 h-16" />
            <h4 className="text-xl font-semibold mb-2 text-emerald-700">
              Student Management
            </h4>
            <p>
              Maintain complete student records with automated updates and search.
            </p>
          </div>

          <div className="bg-emerald-50 p-6 rounded-3xl shadow hover:shadow-lg transition transform hover:-translate-y-2 duration-300">
            <RiToolsLine className="mx-auto mb-4 text-emerald-600 w-16 h-16" />
            <h4 className="text-xl font-semibold mb-2 text-emerald-700">
              Maintenance Tracking
            </h4>
            <p>
              Track maintenance requests and monitor issue resolution efficiently.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
