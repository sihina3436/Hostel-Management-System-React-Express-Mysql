import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllHostelsQuery,
  useDeleteHostelMutation,
  useUpdateHostelMutation,
} from "../../../redux/admin/adminAPI";
import {
  ArrowLeft,
  Building2,
  Pencil,
  Trash2,
  Search,
  X,
  Save,
} from "lucide-react";

const ADMIN_BASE = "/admin-dashboard";

const GetAllHostels = () => {
  const navigate = useNavigate();
  const { data: hostels = [], isLoading, isError } = useGetAllHostelsQuery();
  const [deleteHostel] = useDeleteHostelMutation();

  const [editingHostel, setEditingHostel] = useState(null);
  const [query, setQuery] = useState("");

  const filteredHostels = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return hostels;
    return hostels.filter((h) => {
      return (
        String(h.hostel_id).includes(q) ||
        (h.host_name || "").toLowerCase().includes(q) ||
        (h.address || "").toLowerCase().includes(q) ||
        (h.contact_no || "").toLowerCase().includes(q) ||
        (h.type || "").toLowerCase().includes(q)
      );
    });
  }, [hostels, query]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this hostel?")) return;

    try {
      await deleteHostel(id).unwrap();
      alert("✅ Hostel deleted successfully!");
      if (editingHostel?.hostel_id === id) setEditingHostel(null);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to delete hostel.");
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />
        <div className="p-6 sm:p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-7 w-56 bg-white/10 rounded-xl" />
            <div className="h-11 w-full bg-white/10 rounded-2xl" />
            <div className="h-64 w-full bg-white/10 rounded-3xl" />
          </div>
          <p className="mt-6 text-white/60 text-sm">Loading hostels...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-rose-500/30 bg-rose-500/10 px-6 py-5 text-rose-200 font-semibold">
        Failed to load hostels. Please try again.
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
            All Hostels
          </h1>
          <p className="mt-1 text-white/70">
            Search, edit, and manage hostel records.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-white/5 border border-white/10
                       text-white/85 font-semibold hover:bg-white/10 transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.2)] p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
              size={18}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, address, contact, type..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                         pl-10 pr-10 py-3 outline-none transition
                         focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/45 hover:text-white"
                type="button"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="text-sm text-white/60 whitespace-nowrap">
            Showing{" "}
            <span className="font-extrabold text-white">
              {filteredHostels.length}
            </span>{" "}
            of{" "}
            <span className="font-extrabold text-white">{hostels.length}</span>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 text-white/70">
              <tr>
                <th className="px-5 py-4 text-left font-semibold border-b border-white/10">
                  #
                </th>
                <th className="px-5 py-4 text-left font-semibold border-b border-white/10">
                  Hostel
                </th>
                <th className="px-5 py-4 text-left font-semibold border-b border-white/10">
                  Address
                </th>
                <th className="px-5 py-4 text-left font-semibold border-b border-white/10">
                  Contact
                </th>
                <th className="px-5 py-4 text-left font-semibold border-b border-white/10">
                  Type
                </th>
                <th className="px-5 py-4 text-right font-semibold border-b border-white/10">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredHostels.length > 0 ? (
                filteredHostels.map((hostel, index) => {
                  const isSelected =
                    editingHostel?.hostel_id === hostel.hostel_id;

                  return (
                    <tr
                      key={hostel.hostel_id}
                      className={[
                        "border-b border-white/10 hover:bg-white/5 transition",
                        isSelected ? "bg-emerald-500/10" : "",
                      ].join(" ")}
                    >
                      <td className="px-5 py-4 text-white/80 font-bold">
                        {index + 1}
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-extrabold text-white">
                          {hostel.host_name}
                        </div>
                        <div className="text-xs text-white/50">
                          ID: {hostel.hostel_id}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-white/70">
                        {hostel.address}
                      </td>
                      <td className="px-5 py-4 text-white/70">
                        {hostel.contact_no}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold bg-white/5 border border-white/10 text-white/80">
                          {hostel.type}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingHostel(hostel)}
                            className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 bg-emerald-500 text-slate-950 font-extrabold hover:bg-emerald-400 transition"
                            type="button"
                          >
                            <Pencil size={16} />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(hostel.hostel_id)}
                            className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 bg-rose-500 text-slate-950 font-extrabold hover:bg-rose-400 transition"
                            type="button"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-white/60"
                  >
                    No hostels found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inline Edit */}
      {editingHostel && (
        <div className="pt-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Edit Hostel
            </h2>
            <button
              onClick={() => setEditingHostel(null)}
              className="rounded-2xl px-4 py-2 bg-white/5 border border-white/10 text-white/85 font-semibold hover:bg-white/10 transition"
              type="button"
            >
              Close
            </button>
          </div>

          <UpdateHostelInline
            hostel={editingHostel}
            onCancel={() => setEditingHostel(null)}
          />
        </div>
      )}
    </div>
  );
};

/** Inline update form component (dark glass theme) */
const UpdateHostelInline = ({ hostel, onCancel }) => {
  const [formData, setFormData] = useState({
    host_name: hostel.host_name || "",
    address: hostel.address || "",
    contact_no: hostel.contact_no || "",
    type: hostel.type || "Boys",
  });

  const [updateHostel, { isLoading }] = useUpdateHostelMutation();
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setServerError("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    try {
      await updateHostel({
        id: hostel.hostel_id,
        updatedData: formData,
      }).unwrap();

      alert("✅ Hostel updated successfully!");
      onCancel();
    } catch (error) {
      console.error(error);
      setServerError(error?.data?.message || "❌ Failed to update hostel.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden"
    >
      <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />

      <div className="p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2">
              Hostel Name
            </label>
            <input
              type="text"
              name="host_name"
              value={formData.host_name}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35
                         outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition
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

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-white/90 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35
                         outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-white/90 mb-2">
              Contact No
            </label>
            <input
              type="text"
              name="contact_no"
              value={formData.contact_no}
              onChange={handleChange}
              maxLength={15}
              required
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35
                         outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
            />
            <p className="mt-2 text-xs text-white/55">
              You can include country code (ex: +94).
            </p>
          </div>
        </div>

        {serverError && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200 text-sm font-semibold">
            {serverError}
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl px-5 py-3 bg-white/5 border border-white/10 text-white/85 font-semibold hover:bg-white/10 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 bg-emerald-500 text-slate-950 font-extrabold
                       hover:bg-emerald-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default GetAllHostels;