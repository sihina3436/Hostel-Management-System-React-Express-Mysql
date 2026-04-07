import React, { useMemo, useState } from "react";
import { useCreateRoomMutation } from "../../../redux/admin/adminAPI";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BedDouble, Building2, Layers, Save } from "lucide-react";

const CreateRoom = () => {
  const navigate = useNavigate();
  const [createRoom, { isLoading }] = useCreateRoomMutation();

  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState({
    room_no: "",
    floor_no: "",
    is_occupied: false,
    hostel_id: "",
  });

  const occupancyLabel = useMemo(
    () => (formData.is_occupied ? "Occupied" : "Available"),
    [formData.is_occupied]
  );

  const handleChange = (e) => {
    setServerError("");
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    try {
      // normalize numeric fields if backend expects numbers
      const payload = {
        ...formData,
        floor_no: Number(formData.floor_no),
        hostel_id: Number(formData.hostel_id),
      };

      await createRoom(payload).unwrap();
      alert("✅ Room created successfully!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      setServerError(err?.data?.message || "❌ Failed to create room. Please check the details.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Create Room
          </h2>
          <p className="mt-1 text-white/70">
            Add a new room and assign it to a hostel.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white/5 border border-white/10
                     text-white/85 font-semibold hover:bg-white/10 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Room No */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2">
              Room Number
            </label>
            <div className="relative">
              <BedDouble
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
                size={18}
              />
              <input
                type="text"
                name="room_no"
                value={formData.room_no}
                onChange={handleChange}
                placeholder="e.g. B103"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                           pl-10 pr-4 py-3 outline-none transition
                           focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
              />
            </div>
            <p className="mt-2 text-xs text-white/55">
              Tip: keep a consistent format like A101, B203, etc.
            </p>
          </div>

          {/* Floor + Hostel ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Floor Number
              </label>
              <div className="relative">
                <Layers
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
                  size={18}
                />
                <input
                  type="number"
                  name="floor_no"
                  value={formData.floor_no}
                  onChange={handleChange}
                  placeholder="e.g. 1"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                             pl-10 pr-4 py-3 outline-none transition
                             focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Hostel ID
              </label>
              <div className="relative">
                <Building2
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
                  size={18}
                />
                <input
                  type="number"
                  name="hostel_id"
                  value={formData.hostel_id}
                  onChange={handleChange}
                  placeholder="e.g. 1"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                             pl-10 pr-4 py-3 outline-none transition
                             focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                />
              </div>
              <p className="mt-2 text-xs text-white/55">
                Use a valid hostel ID from “All Hostels”.
              </p>
            </div>
          </div>

          {/* Occupied toggle */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-extrabold text-white">
                Occupancy Status
              </div>
              <div className="text-xs text-white/60 mt-1">
                Current:{" "}
                <span
                  className={[
                    "font-extrabold",
                    formData.is_occupied ? "text-rose-200" : "text-emerald-200",
                  ].join(" ")}
                >
                  {occupancyLabel}
                </span>
              </div>
            </div>

            <label className="inline-flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                name="is_occupied"
                checked={formData.is_occupied}
                onChange={handleChange}
                className="h-5 w-5 accent-emerald-400"
              />
              <span className="text-sm font-semibold text-white/85">
                Mark as occupied
              </span>
            </label>
          </div>

          {/* Error */}
          {serverError && (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200 text-sm font-semibold">
              {serverError}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto rounded-2xl px-5 py-3 bg-white/5 border border-white/10
                         text-white/85 font-semibold hover:bg-white/10 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3
                         bg-emerald-500 text-slate-950 font-extrabold hover:bg-emerald-400 transition
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {isLoading ? "Creating..." : "Create Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;