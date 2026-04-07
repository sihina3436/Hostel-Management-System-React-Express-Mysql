import React from "react";
import { useSelector } from "react-redux";
import { useGetRoomDetailsQuery } from "../../../redux/student/studentAPI";
import {
  RiBuilding4Line,
  RiMapPin2Line,
  RiDoorLine,
  RiHome4Line,
  RiGroupLine,
  RiMailLine,
  RiPhoneLine,
} from "react-icons/ri";

const RoomDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const studentId = user?.stud_id;

  const { data, error, isLoading } = useGetRoomDetailsQuery(
    { studentId },
    { skip: !studentId }
  );

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-6 sm:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-7 w-44 bg-white/10 rounded-xl" />
          <div className="h-28 bg-white/10 rounded-3xl" />
          <div className="h-7 w-36 bg-white/10 rounded-xl" />
          <div className="h-40 bg-white/10 rounded-3xl" />
        </div>
        <p className="mt-6 text-sm text-white/60">Loading room details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 px-6 py-5 text-rose-200 font-semibold">
        Error fetching room: {error?.data?.message || "Unknown error"}
      </div>
    );
  }

  const { myRoom, roommates } = data?.data || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Room Details
          </h2>
          <p className="mt-1 text-sm text-white/70">
            Hostel and room information with roommate list.
          </p>
        </div>

        {myRoom?.room_no && (
          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm font-bold text-white/85">
            <RiDoorLine className="text-lg" />
            Room {myRoom.room_no}
          </span>
        )}
      </div>

      {/* Room Card */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />

        <div className="p-6 sm:p-8">
          {!myRoom ? (
            <div className="text-white/70 font-semibold">
              You are not assigned to a room yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InfoItem
                icon={<RiHome4Line className="text-xl text-emerald-200" />}
                label="Hostel"
                value={myRoom.hostel_name}
              />
              <InfoItem
                icon={<RiMapPin2Line className="text-xl text-sky-200" />}
                label="Address"
                value={myRoom.hostel_address}
              />
              <InfoItem
                icon={<RiDoorLine className="text-xl text-violet-200" />}
                label="Room No"
                value={String(myRoom.room_no)}
              />
              <InfoItem
                icon={<RiBuilding4Line className="text-xl text-amber-200" />}
                label="Floor"
                value={String(myRoom.floor_no)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Roommates */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="p-6 sm:p-8 flex items-end justify-between gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <RiGroupLine className="text-xl text-emerald-200" />
              Roommates
            </h3>
            <p className="mt-1 text-sm text-white/70">
              People currently assigned to your room.
            </p>
          </div>

          <span className="text-xs text-white/60 font-semibold">
            Total:{" "}
            <span className="text-white/85 font-bold">
              {roommates?.length || 0}
            </span>
          </span>
        </div>

        <div className="px-6 sm:px-8 pb-8">
          {roommates?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roommates.map((mate) => (
                <RoommateCard key={mate.student_id} mate={mate} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/70 font-semibold">
              No roommates found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 grid place-items-center">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-white/55 font-semibold">{label}</div>
        <div className="text-white font-extrabold truncate">{value || "-"}</div>
      </div>
    </div>
  </div>
);

const RoommateCard = ({ mate }) => {
  const avatar =
    "https://cdn-icons-png.flaticon.com/512/236/236832.png";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-5">
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={mate.student_name}
          className="w-14 h-14 rounded-2xl border border-white/10 object-cover bg-white/5"
        />
        <div className="min-w-0">
          <div className="text-white font-extrabold truncate">
            {mate.student_name}
          </div>
          <div className="mt-1 flex flex-col gap-1 text-sm text-white/65">
            <div className="inline-flex items-center gap-2 truncate">
              <RiMailLine className="text-base" />
              <span className="truncate">{mate.email || "No email"}</span>
            </div>
            <div className="inline-flex items-center gap-2 truncate">
              <RiPhoneLine className="text-base" />
              <span className="truncate">{mate.phone_no || "No phone"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;