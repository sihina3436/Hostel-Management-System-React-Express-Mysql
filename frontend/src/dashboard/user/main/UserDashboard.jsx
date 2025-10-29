import React, { useState } from "react";
import {
  RiUser3Line,
  RiHomeSmileLine,
  RiMoneyDollarCircleLine,
  RiToolsLine,
} from "react-icons/ri";
import RoomDetails from "../profile/RoomDetails";
import Payments from "../profile/Payments";
import Maintenance from "../profile/Maintenance";
import UpdateProfile from "../profile/UpdateProfile";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const user = {
    name: "Sihara Edirisinghe",
    Registration: "TG/2021/1033",
    room: "G-427",
    joined: "January 2025",
    Level: "Level 03",
    gender: "female",
  };

  const avatarUrl =
    user.gender === "male"
      ? "https://cdn-icons-png.flaticon.com/512/236/236832.png"
      : "https://cdn-icons-png.flaticon.com/512/6997/6997662.png";

  const renderRightSection = () => {
    if (activeSection === "overview") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 mb-8">
          <Card
            icon={<RiUser3Line className="text-4xl text-green-600 mb-4" />}
            title="Profile"
            description="Update your personal details and password."
            onClick={() => setActiveSection("profile")}
          />
          <Card
            icon={<RiHomeSmileLine className="text-4xl text-green-600 mb-4" />}
            title="Room Details"
            description="View your allocated room and roommate details."
            onClick={() => setActiveSection("room")}
          />
          <Card
            icon={<RiMoneyDollarCircleLine className="text-4xl text-green-600 mb-4" />}
            title="Payments"
            description="Check your payment history and pending dues."
            onClick={() => setActiveSection("payments")}
          />
          <Card
            icon={<RiToolsLine className="text-4xl text-green-600 mb-4" />}
            title="Maintenance"
            description="Submit maintenance requests and track their status."
            onClick={() => setActiveSection("maintenance")}
          />
        </div>
      );
    }

    return (
      <div className="w-full flex justify-center">
        <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-4xl">
          <button
            onClick={() => setActiveSection("overview")}
            className="mb-6 bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-full font-semibold transition"
            aria-label="Back to dashboard overview"
          >
            ← Back to Overview
          </button>
          {activeSection === "profile" && <UpdateProfile />}
          {activeSection === "room" && <RoomDetails />}
          {activeSection === "payments" && <Payments />}
          {activeSection === "maintenance" && <Maintenance />}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row p-6 md:p-12 gap-8">
      {activeSection === "overview" && (
        <div className="md:w-1/3 bg-white rounded-3xl shadow-lg p-8 mr-10 flex flex-col items-center justify-start border border-green-100">
          <img
            src={avatarUrl}
            alt={`${user.name}'s avatar`}
            className="w-32 h-32 rounded-full border-4 border-green-400 mb-4 shadow-md object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{user.name}</h2>
          <p className="text-gray-600 font-bold">{user.Registration}</p>
          <div className="mt-6 space-y-2 text-center w-full">
            <p className="bg-gray-100 text-green-800 py-2 rounded-lg font-medium">
              Room No: {user.room}
            </p>
            <p className="bg-gray-100 text-green-800 py-2 rounded-lg font-medium">
              Level: {user.Level}
            </p>
            <p className="bg-gray-100 text-green-800 py-2 rounded-lg font-medium">
              Joined: {user.joined}
            </p>
          </div>
          <button
            onClick={() => setActiveSection("profile")}
            className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition"
            aria-label="Edit profile"
          >
            Edit Profile
          </button>
        </div>
      )}

      <div className={activeSection === "overview" ? "flex-1" : "w-full"}>
        {activeSection === "overview" && (
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-gray-800">
              Select an option below to manage your hostel activities.
            </p>
          </div>
        )}
        {renderRightSection()}
      </div>
    </div>
  );
};

const Card = ({ icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    onKeyDown={(e) => e.key === "Enter" && onClick()}
    tabIndex={0}
    className="bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1 border-t-4 border-green-500"
    role="button"
    aria-label={`Open ${title} section`}
  >
    {icon}
    <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default UserDashboard;