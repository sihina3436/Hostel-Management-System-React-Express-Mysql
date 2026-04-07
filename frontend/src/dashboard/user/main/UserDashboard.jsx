import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  RiUser3Line,
  RiHomeSmileLine,
  RiMoneyDollarCircleLine,
  RiToolsLine,
  RiLogoutCircleLine,
  RiArrowLeftLine,
} from "react-icons/ri";
import RoomDetails from "../profile/RoomDetails";
import Payments from "../profile/Payments";
import Maintenance from "../profile/Maintenance";
import UpdateProfile from "../profile/UpdateProfile";
import StudentProfile from "../profile/StudentProfile";
import { logout } from "../../../redux/auth/authSlice.js";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [activeSection, setActiveSection] = useState("overview");

  // ---------- Not logged in ----------
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-sky-500/15 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" />
        </div>

        <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <h2 className="text-2xl font-bold text-white">You’re not logged in</h2>
          <p className="mt-2 text-white/70">Please log in to access your dashboard.</p>
          <a
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-emerald-500 text-slate-950 px-6 py-3 font-extrabold hover:bg-emerald-400 transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // ---------- Avatar ----------
  const avatarUrl =
    user.gender === "male"
      ? "https://cdn-icons-png.flaticon.com/512/236/236832.png"
      : "https://cdn-icons-png.flaticon.com/512/6997/6997662.png";

  // ---------- Menu items ----------
  const items = useMemo(
    () => [
      {
        key: "studentProfile",
        title: "My Profile",
        desc: "View your personal profile details.",
        icon: <RiUser3Line className="text-2xl" />,
        accent: "from-emerald-500 to-emerald-400",
      },
      {
        key: "updateProfile",
        title: "Update Profile",
        desc: "Update your personal details and password.",
        icon: <RiToolsLine className="text-2xl" />,
        accent: "from-sky-500 to-sky-400",
      },
      {
        key: "room",
        title: "Room Details",
        desc: "View your allocated room and roommate details.",
        icon: <RiHomeSmileLine className="text-2xl" />,
        accent: "from-violet-500 to-violet-400",
      },
      {
        key: "payments",
        title: "Payments",
        desc: "Check your payment history and pending dues.",
        icon: <RiMoneyDollarCircleLine className="text-2xl" />,
        accent: "from-amber-500 to-amber-400",
      },
      {
        key: "maintenance",
        title: "Maintenance",
        desc: "Submit maintenance requests and track status.",
        icon: <RiToolsLine className="text-2xl" />,
        accent: "from-rose-500 to-rose-400",
      },
    ],
    []
  );

  const renderMain = () => {
    if (activeSection === "overview") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {items.map((it) => (
            <DashboardTile
              key={it.key}
              icon={it.icon}
              title={it.title}
              description={it.desc}
              accent={it.accent}
              onClick={() => setActiveSection(it.key)}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />

        <div className="p-6 sm:p-8">
          <button
            onClick={() => setActiveSection("overview")}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/10 border border-white/10 px-4 py-2 text-white/90 font-semibold hover:bg-white/15 transition"
            aria-label="Back to dashboard overview"
          >
            <RiArrowLeftLine />
            Back to Overview
          </button>

          <div className="mt-6">
            {activeSection === "studentProfile" && <StudentProfile />}
            {activeSection === "updateProfile" && <UpdateProfile />}
            {activeSection === "room" && <RoomDetails />}
            {activeSection === "payments" && <Payments />}
            {activeSection === "maintenance" && <Maintenance />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" />
      </div>

      {/* Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
          {/* Left Profile Card */}
          <aside className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <img
                  src={avatarUrl}
                  alt={`${user.name}'s avatar`}
                  className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 object-cover"
                />
                <div className="min-w-0">
                  <div className="text-white font-bold text-lg truncate">{user.name}</div>
                  <div className="text-white/65 text-sm truncate">{user.email}</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                <InfoRow label="Room No" value={user.room || user.Room?.room_no || "Not assigned"} />
                <InfoRow label="Role" value={user.role || "Student"} />
                <InfoRow label="Phone" value={user.phone_no || "N/A"} />
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={() => setActiveSection("studentProfile")}
                  className="w-full rounded-2xl bg-emerald-500 text-slate-950 py-3 font-extrabold hover:bg-emerald-400 transition"
                >
                  My Profile
                </button>

                <button
                  onClick={() => dispatch(logout())}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 text-white/90 py-3 font-semibold hover:bg-white/10 transition"
                >
                  <RiLogoutCircleLine />
                  Logout
                </button>
              </div>
            </div>
          </aside>

          {/* Right Content */}
          <main>
            {activeSection === "overview" && (
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Welcome back, {user.name}!
                </h1>
                <p className="mt-1 text-white/70">
                  Choose an option below to manage your hostel activities.
                </p>
              </div>
            )}

            {renderMain()}
          </main>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3">
    <div className="text-xs text-white/55 font-semibold">{label}</div>
    <div className="text-sm text-white font-bold mt-0.5">{value}</div>
  </div>
);

const DashboardTile = ({ icon, title, description, onClick, accent }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-left rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6
               shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:bg-white/10 transition
               focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
  >
    <div className="flex items-center justify-between">
      <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${accent} text-slate-950 grid place-items-center`}>
        {icon}
      </div>
      <div className="h-9 w-9 rounded-2xl bg-white/5 border border-white/10 grid place-items-center text-white/70">
        →
      </div>
    </div>

    <div className="mt-4">
      <div className="text-white font-extrabold text-lg">{title}</div>
      <div className="mt-1 text-sm text-white/70 leading-relaxed">{description}</div>
    </div>
  </button>
);

export default UserDashboard;