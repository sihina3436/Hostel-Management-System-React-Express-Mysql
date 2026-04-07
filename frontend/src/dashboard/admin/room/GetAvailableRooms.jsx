import React, { useMemo, useState } from "react";
import { useGetAvailableRoomsQuery } from "../../../redux/admin/adminAPI";
import { useNavigate } from "react-router-dom";
import Card from "../../../Components/ui/Card";
import PageHeader from "../../../Components/ui/PageHeader";
import { ArrowLeft, Search, X, DoorOpen } from "lucide-react";

const GetAvailableRooms = () => {
  const navigate = useNavigate();
  const { data: rooms = [], isLoading, isError } = useGetAvailableRoomsQuery();

  const [query, setQuery] = useState("");

  const stats = useMemo(() => {
    const total = rooms.length;
    const totalSlots = rooms.reduce(
      (sum, r) => sum + (Number(r.available_slots) || 0),
      0
    );
    return { total, totalSlots };
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rooms;

    return rooms.filter((r) => {
      return (
        String(r.room_id).includes(q) ||
        (r.room_no || "").toLowerCase().includes(q) ||
        String(r.floor_no ?? "").includes(q) ||
        String(r.hostel_id ?? "").includes(q) ||
        String(r.occupied ?? "").includes(q) ||
        String(r.available_slots ?? "").includes(q)
      );
    });
  }, [rooms, query]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Available Rooms"
          subtitle="Find rooms with free slots and assign students faster."
          right={
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white/5 border border-white/10
                         text-white/85 font-semibold hover:bg-white/10 transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          }
        />
        <Card className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-11 bg-white/10 rounded-2xl" />
            <div className="h-64 bg-white/10 rounded-3xl" />
          </div>
          <p className="mt-6 text-white/60 text-sm">Loading available rooms...</p>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Available Rooms"
          subtitle="Find rooms with free slots and assign students faster."
          right={
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white/5 border border-white/10
                         text-white/85 font-semibold hover:bg-white/10 transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>
          }
        />
        <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 px-6 py-5 text-rose-200 font-semibold">
          Failed to fetch available rooms.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Available Rooms"
        subtitle="Search rooms that still have free slots."
        right={
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white/5 border border-white/10
                       text-white/85 font-semibold hover:bg-white/10 transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        }
      />

      {/* Controls */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
              size={18}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by room id, room no, floor, hostel id..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                         pl-10 pr-10 py-3 outline-none transition
                         focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/45 hover:text-white"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 text-white/80 px-3 py-1 text-xs font-extrabold">
              <DoorOpen size={14} />
              Rooms: {stats.total}
            </span>

            <span className="inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-200 px-3 py-1 text-xs font-extrabold">
              Total slots: {stats.totalSlots}
            </span>
          </div>
        </div>

        <div className="mt-3 text-xs text-white/55">
          Showing{" "}
          <span className="font-extrabold text-white">{filteredRooms.length}</span>{" "}
          results
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/70 sticky top-0">
              <tr>
                {[
                  "Room ID",
                  "Room No",
                  "Floor No",
                  "Hostel ID",
                  "Occupied",
                  "Available Slots",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-4 text-left font-semibold border-b border-white/10 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <tr
                    key={room.room_id}
                    className="border-b border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="px-5 py-4 text-white/70">{room.room_id}</td>
                    <td className="px-5 py-4 font-extrabold text-white">
                      {room.room_no}
                    </td>
                    <td className="px-5 py-4 text-white/70">{room.floor_no}</td>
                    <td className="px-5 py-4 text-white/70">{room.hostel_id}</td>

                    <td className="px-5 py-4">
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold border",
                          Number(room.occupied) > 0
                            ? "bg-amber-500/15 border-amber-500/20 text-amber-200"
                            : "bg-emerald-500/15 border-emerald-500/20 text-emerald-200",
                        ].join(" ")}
                      >
                        {room.occupied}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold border",
                          Number(room.available_slots) === 0
                            ? "bg-rose-500/15 border-rose-500/20 text-rose-200"
                            : "bg-emerald-500/15 border-emerald-500/20 text-emerald-200",
                        ].join(" ")}
                      >
                        {room.available_slots}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-white/60">
                    No available rooms found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default GetAvailableRooms;