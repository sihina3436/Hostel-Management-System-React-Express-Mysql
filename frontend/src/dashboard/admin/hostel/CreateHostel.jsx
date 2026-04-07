import React, { useMemo, useState } from "react";
import { useCreateHostelMutation } from "../../../redux/admin/adminAPI.js";
import { useNavigate } from "react-router-dom";
import { RiBuilding2Line, RiMapPin2Line, RiPhoneLine } from "react-icons/ri";

const ADMIN_BASE = "/admin-dashboard";

const CreateHostel = () => {
  const navigate = useNavigate();
  const [createHostel, { isLoading }] = useCreateHostelMutation();

  const [serverError, setServerError] = useState("");

  const [formData, setFormData] = useState({
    host_name: "",
    address: "",
    contact_no: "",
    type: "",
  });

  const typeOptions = useMemo(() => ["Boys", "Girls", "Mixed"], []);

  const handleChange = (e) => {
    setServerError("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    try {
      await createHostel(formData).unwrap();
      alert("✅ Hostel created successfully!");
      navigate(`${ADMIN_BASE}/hostel/all`); // ✅ match your router
    } catch (error) {
      console.error(error);
      setServerError(error?.data?.message || "❌ Failed to create hostel. Try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Create Hostel
          </h1>
          <p className="mt-1 text-white/70">
            Add a new hostel and manage rooms & students easily.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(`${ADMIN_BASE}/hostel/all`)}
          className="w-full sm:w-auto rounded-2xl px-4 py-2 bg-white/5 border border-white/10
                     text-white/85 font-semibold hover:bg-white/10 transition"
        >
          ← Back
        </button>
      </div>

      {/* Card */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        {/* Accent */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Hostel Name */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2">
              Hostel Name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45">
                <RiBuilding2Line className="text-xl" />
              </span>
              <input
                type="text"
                name="host_name"
                value={formData.host_name}
                onChange={handleChange}
                placeholder="e.g. Sunrise Hostel"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-11 py-3 text-white placeholder:text-white/35
                           outline-none transition
                           focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                required
              />
            </div>
            <p className="mt-2 text-xs text-white/55">
              Use a short, recognizable name.
            </p>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2">
              Address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45">
                <RiMapPin2Line className="text-xl" />
              </span>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g. Matara, Sri Lanka"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-11 py-3 text-white placeholder:text-white/35
                           outline-none transition
                           focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                required
              />
            </div>
          </div>

          {/* Contact + Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Contact No
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45">
                  <RiPhoneLine className="text-xl" />
                </span>
                <input
                  type="text"
                  name="contact_no"
                  value={formData.contact_no}
                  onChange={handleChange}
                  placeholder="e.g. +94 71 123 4567"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-11 py-3 text-white placeholder:text-white/35
                             outline-none transition
                             focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                  required
                />
              </div>
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
                required
              >
                <option className="bg-slate-900" value="">
                  Select type
                </option>
                {typeOptions.map((t) => (
                  <option className="bg-slate-900" key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-white/55">
                This helps with allocation and filtering.
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
          <div className="pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(`${ADMIN_BASE}/hostel/all`)}
              className="w-full sm:w-auto rounded-2xl px-5 py-3 bg-white/5 border border-white/10
                         text-white/85 font-semibold hover:bg-white/10 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto rounded-2xl px-5 py-3 bg-emerald-500 text-slate-950 font-extrabold
                         shadow-sm hover:bg-emerald-400 transition
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Creating..." : "Create Hostel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHostel;