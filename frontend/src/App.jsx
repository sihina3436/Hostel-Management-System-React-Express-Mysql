import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;