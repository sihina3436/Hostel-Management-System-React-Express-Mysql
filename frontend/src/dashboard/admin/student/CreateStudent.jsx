import React, { useState } from "react";
import { useAddStudentMutation } from "../../../redux/admin/adminAPI";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Phone, Save, User2, Lock } from "lucide-react";

const ADMIN_BASE = "/admin-dashboard";

const CreateStudent = () => {
  const navigate = useNavigate();
  const [addStudent, { isLoading, isError, error }] = useAddStudentMutation();

  const [formData, setFormData] = useState({
    name: "",
    phone_no: "",
    address: "",
    email: "",
    role: "student",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(formData).unwrap();
      alert("✅ Student created successfully!");
      // ✅ route fix: go back to admin students list (adjust if your router differs)
      navigate(`${ADMIN_BASE}/student/all`);
    } catch (err) {
      console.error(err);
      alert("❌ Error creating student");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Add New Student
          </h1>
          <p className="mt-1 text-white/70">
            Create a student profile for hostel allocation and management.
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
              Full Name
            </label>
            <div className="relative">
              <User2
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
                size={18}
              />
              <input
                type="text"
                name="name"
                placeholder="e.g. Nimal Perera"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                           pl-10 pr-4 py-3 outline-none transition
                           focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
              />
            </div>
          </div>

          {/* Phone + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
                  size={18}
                />
                <input
                  type="text"
                  name="phone_no"
                  placeholder="e.g. +94 71 123 4567"
                  value={formData.phone_no}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                             pl-10 pr-4 py-3 outline-none transition
                             focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. student@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                             pl-10 pr-4 py-3 outline-none transition
                             focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                />
              </div>
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
                placeholder="e.g. Matara, Sri Lanka"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                           pl-10 pr-4 py-3 outline-none transition
                           focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
              />
            </div>
          </div>

          {/* Password */}
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
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                           pl-10 pr-4 py-3 outline-none transition
                           focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
              />
            </div>
            <p className="mt-2 text-xs text-white/55">
              Use at least 8 characters (recommended).
            </p>
          </div>

          {/* API Error */}
          {isError && (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200 text-sm font-semibold">
              {error?.data?.message || "Something went wrong"}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(`${ADMIN_BASE}/student/all`)}
              className="w-full sm:w-auto rounded-2xl px-5 py-3 bg-white/5 border border-white/10
                         text-white/85 font-semibold hover:bg-white/10 transition"
            >
              Back to Students
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3
                         bg-emerald-500 text-slate-950 font-extrabold hover:bg-emerald-400 transition
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {isLoading ? "Creating..." : "Create Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;