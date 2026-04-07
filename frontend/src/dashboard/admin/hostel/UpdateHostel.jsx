import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllHostelsQuery,
  useUpdateHostelMutation,
} from "../../../redux/admin/adminAPI";
import { ArrowLeft, Building2, Save, MapPin, Phone, Home } from "lucide-react";

const ADMIN_BASE = "/admin-dashboard";

const UpdateHostel = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const hostelId = useMemo(() => Number(id), [id]);

  const {
    data: hostels = [],
    isLoading: loadingHostels,
    isError,
  } = useGetAllHostelsQuery();

  const hostelToEdit = useMemo(
    () => hostels.find((h) => h.hostel_id === hostelId),
    [hostels, hostelId]
  );

  const [updateHostel, { isLoading, isSuccess, isError: updateError, error }] =
    useUpdateHostelMutation();

  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState({
    host_name: "",
    address: "",
    contact_no: "",
    type: "Boys",
  });

  useEffect(() => {
    if (!hostelToEdit) return;
    setFormData({
      host_name: hostelToEdit.host_name || "",
      address: hostelToEdit.address || "",
      contact_no: hostelToEdit.contact_no || "",
      type: hostelToEdit.type || "Boys",
    });
  }, [hostelToEdit]);

  const handleChange = (e) => {
    setServerError("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    try {
      await updateHostel({ id: hostelId, updatedData: formData }).unwrap();
      alert("✅ Hostel updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Update failed:", err);
      setServerError(err?.data?.message || "❌ Failed to update hostel. Try again.");
    }
  };

  if (loadingHostels) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />
        <div className="p-6 sm:p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-7 w-52 bg-white/10 rounded-xl" />
            <div className="h-11 w-full bg-white/10 rounded-2xl" />
            <div className="h-11 w-full bg-white/10 rounded-2xl" />
            <div className="h-11 w-full bg-white/10 rounded-2xl" />
          </div>
          <p className="mt-6 text-white/60 text-sm">Loading hostel details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 px-6 py-5 text-rose-200 font-semibold">
        Failed to load hostel details. Please try again.
      </div>
    );
  }

  if (!hostelToEdit) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-6 sm:p-8">
        <div className="text-white font-extrabold">Hostel not found</div>
        <p className="mt-1 text-white/70 text-sm">
          The hostel ID <span className="font-bold text-white">{id}</span> doesn’t exist.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white/5 border border-white/10
                     text-white/85 font-semibold hover:bg-white/10 transition"
        >
          <ArrowLeft size={18} />
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            <Building2 className="text-emerald-200" />
            Update Hostel
          </h1>
          <p className="mt-1 text-white/70">
            Editing:{" "}
            <span className="font-extrabold text-white">{hostelToEdit.host_name}</span>
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white/5 border border-white/10
                     text-white/85 font-semibold hover:bg-white/10 transition"
          type="button"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Form Card */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Hostel Name */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2">
              Hostel Name
            </label>
            <div className="relative">
              <Home
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
                size={18}
              />
              <input
                type="text"
                name="host_name"
                value={formData.host_name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                           pl-10 pr-4 py-3 outline-none transition
                           focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2">
              Address
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
                size={18}
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                           pl-10 pr-4 py-3 outline-none transition
                           focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
              />
            </div>
          </div>

          {/* Contact + Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Contact Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
                  size={18}
                />
                <input
                  type="text"
                  name="contact_no"
                  value={formData.contact_no}
                  onChange={handleChange}
                  maxLength={15}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                             pl-10 pr-4 py-3 outline-none transition
                             focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                />
              </div>
              <p className="mt-2 text-xs text-white/55">
                You can include country code (ex: +94).
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white
                           outline-none transition
                           focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
              >
                <option className="bg-slate-900" value="Boys">
                  Boys
                </option>
                <option className="bg-slate-900" value="Girls">
                  Girls
                </option>
                <option className="bg-slate-900" value="Mixed">
                  Mixed
                </option>
              </select>
            </div>
          </div>

          {/* Errors */}
          {(serverError || (updateError && error)) && (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200 text-sm font-semibold">
              {serverError || error?.data?.message || "Something went wrong. Please try again."}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 text-slate-950 py-3 font-extrabold
                       shadow-sm hover:bg-emerald-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {isLoading ? "Saving..." : "Save Changes"}
          </button>

          {/* Status */}
          {isSuccess && (
            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-emerald-200 text-sm font-semibold">
              Hostel updated successfully.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateHostel;