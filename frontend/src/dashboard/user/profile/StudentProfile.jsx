import React from "react";
import { useSelector } from "react-redux";
import { useGetstudentProfileQuery } from "../../../redux/student/studentAPI";
import {
  RiMailLine,
  RiPhoneLine,
  RiMapPin2Line,
  RiUser3Line,
  RiHome4Line,
  RiBuilding4Line,
  RiDoorLine,
  RiGroupLine,
  RiContactsLine,
  RiShieldUserLine,
} from "react-icons/ri";

const StudentProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const studentId = user?.stud_id;

  const { data, error, isLoading } = useGetstudentProfileQuery(
    { studentId },
    { skip: !studentId }
  );

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-6 sm:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-7 w-48 bg-white/10 rounded-xl" />
          <div className="h-24 bg-white/10 rounded-3xl" />
          <div className="h-44 bg-white/10 rounded-3xl" />
        </div>
        <p className="mt-6 text-sm text-white/60">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 px-6 py-5 text-rose-200 font-semibold">
        Error fetching profile: {error?.data?.message || "Unknown error"}
      </div>
    );
  }

  // API payload (your code uses data?.data)
  const profile = data?.data || {};

  const avatarUrl =
    profile.gender === "female"
      ? "https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
      : "https://cdn-icons-png.flaticon.com/512/236/236832.png";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            My Profile
          </h2>
          <p className="mt-1 text-sm text-white/70">
            Your personal details and hostel allocation information.
          </p>
        </div>

        {profile.role && (
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm font-bold text-white/85">
            <RiShieldUserLine className="text-lg text-emerald-200" />
            {profile.role}
          </span>
        )}
      </div>

      {/* Identity Card */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />

        <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:items-center">
          <img
            src={avatarUrl}
            alt={profile.student_name || "Student avatar"}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl border border-white/10 bg-white/5 object-cover"
          />

          <div className="flex-1 min-w-0">
            <div className="text-white font-extrabold text-xl sm:text-2xl truncate">
              {profile.student_name || "—"}
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <MiniRow
                icon={<RiMailLine className="text-lg text-sky-200" />}
                label="Email"
                value={profile.email}
              />
              <MiniRow
                icon={<RiPhoneLine className="text-lg text-emerald-200" />}
                label="Phone"
                value={profile.phone_no}
              />
              <MiniRow
                icon={<RiMapPin2Line className="text-lg text-violet-200" />}
                label="Address"
                value={profile.address}
              />
              <MiniRow
                icon={<RiUser3Line className="text-lg text-amber-200" />}
                label="Student ID"
                value={profile.stud_id || studentId}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Allocation Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Room */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
              <RiDoorLine className="text-xl text-emerald-200" />
            </div>
            <div>
              <div className="text-white font-extrabold text-lg">Room</div>
              <div className="text-sm text-white/60">Your room allocation details</div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoPill icon={<RiDoorLine />} label="Room No" value={profile.room_no} />
            <InfoPill icon={<RiBuilding4Line />} label="Floor" value={profile.floor_no} />
            <InfoPill icon={<RiGroupLine />} label="Capacity" value={profile.capacity} />
            <InfoPill icon={<RiHome4Line />} label="Hostel" value={profile.host_name} />
          </div>
        </div>

        {/* Hostel */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
              <RiHome4Line className="text-xl text-sky-200" />
            </div>
            <div>
              <div className="text-white font-extrabold text-lg">Hostel</div>
              <div className="text-sm text-white/60">Hostel contact and type</div>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <LineItem
              icon={<RiHome4Line className="text-lg text-white/70" />}
              label="Name"
              value={profile.host_name}
            />
            <LineItem
              icon={<RiMapPin2Line className="text-lg text-white/70" />}
              label="Address"
              value={profile.hostel_address}
            />
            <LineItem
              icon={<RiContactsLine className="text-lg text-white/70" />}
              label="Contact"
              value={profile.hostel_contact}
            />
            <LineItem
              icon={<RiUser3Line className="text-lg text-white/70" />}
              label="Type"
              value={profile.hostel_type}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const MiniRow = ({ icon, label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 min-w-0">
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-2xl bg-white/5 border border-white/10 grid place-items-center flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-white/55 font-semibold">{label}</div>
        <div className="text-sm text-white font-extrabold truncate">
          {value ?? "—"}
        </div>
      </div>
    </div>
  </div>
);

const InfoPill = ({ icon, label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-center gap-3">
    <div className="h-9 w-9 rounded-2xl bg-white/5 border border-white/10 grid place-items-center text-white/70">
      {icon}
    </div>
    <div className="min-w-0">
      <div className="text-xs text-white/55 font-semibold">{label}</div>
      <div className="text-sm text-white font-extrabold truncate">
        {value ?? "—"}
      </div>
    </div>
  </div>
);

const LineItem = ({ icon, label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 flex items-start gap-3">
    <div className="h-9 w-9 rounded-2xl bg-white/5 border border-white/10 grid place-items-center flex-shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <div className="text-xs text-white/55 font-semibold">{label}</div>
      <div className="text-sm text-white font-extrabold break-words">
        {value ?? "—"}
      </div>
    </div>
  </div>
);

export default StudentProfile;