import React, { useState } from "react";
import { useAddStaffMutation } from "../../../redux/admin/adminAPI";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Lock, User2, Save } from "lucide-react";

const ADMIN_BASE = "/admin-dashboard";

const CreateStaff = () => {
  const navigate = useNavigate();
  const [addStaff, { isLoading }] = useAddStaffMutation();

  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact_no: "",
    password: "",
  });

  const handleChange = (e) => {
    setServerError("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    try {
      await addStaff(formData).unwrap();
      alert("✅ Staff created successfully!");
      setFormData({ name: "", address: "", contact_no: "", password: "" });

      // Optional: go to staff list after create (adjust if your route differs)
      navigate(`${ADMIN_BASE}/staff/all`);
    } catch (err) {
      console.error(err);
      setServerError(err?.data?.message || "❌ Error creating staff");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Create Staff
          </h1>
          <p className="mt-1 text-white/70">
            Add staff details for hostel operations and management.
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
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2">
              Name
            </label>
            <div className="relative">
              <User2
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
                size={18}
              />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Kasun Perera"
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
                placeholder="e.g. Matara, Sri Lanka"
                className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                           pl-10 pr-4 py-3 outline-none transition
                           focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
              />
            </div>
          </div>

          {/* Contact + Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Contact No
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
                  required
                  placeholder="e.g. +94 71 123 4567"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                             pl-10 pr-4 py-3 outline-none transition
                             focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                />
              </div>
              <p className="mt-2 text-xs text-white/55">
                Include country code if possible.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
                  size={18}
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a strong password"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                             pl-10 pr-4 py-3 outline-none transition
                             focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                />
              </div>
              <p className="mt-2 text-xs text-white/55">
                Use at least 8 characters for better security.
              </p>
            </div>
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
              onClick={() => navigate(`${ADMIN_BASE}/staff/all`)}
              className="w-full sm:w-auto rounded-2xl px-5 py-3 bg-white/5 border border-white/10
                         text-white/85 font-semibold hover:bg-white/10 transition"
            >
              Back to Staff
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3
                         bg-emerald-500 text-slate-950 font-extrabold hover:bg-emerald-400 transition
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {isLoading ? "Creating..." : "Create Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStaff;