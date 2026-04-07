import React, { useMemo, useState } from "react";
import {
  useGetAllStaffQuery,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} from "../../../redux/admin/adminAPI";
import { useNavigate } from "react-router-dom";
import Card from "../../../Components/ui/Card";
import PageHeader from "../../../Components/ui/PageHeader";
import { ArrowLeft, Search, X, Pencil, Trash2, Save } from "lucide-react";

const ADMIN_BASE = "/admin-dashboard";

const StaffManagement = () => {
  const navigate = useNavigate();
  const { data: staffList = [], isLoading, isError } = useGetAllStaffQuery();
  const [updateStaff, { isLoading: updating }] = useUpdateStaffMutation();
  const [deleteStaff, { isLoading: deleting }] = useDeleteStaffMutation();

  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact_no: "",
    password: "",
  });

  const filteredStaff = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return staffList;

    return staffList.filter((s) => {
      return (
        String(s.staff_id).includes(q) ||
        (s.name || "").toLowerCase().includes(q) ||
        (s.address || "").toLowerCase().includes(q) ||
        (s.contact_no || "").toLowerCase().includes(q)
      );
    });
  }, [staffList, query]);

  const handleEdit = (staff) => {
    setEditingId(staff.staff_id);
    setFormData({
      name: staff.name || "",
      address: staff.address || "",
      contact_no: staff.contact_no || "",
      password: "", // don't prefill password
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", address: "", contact_no: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (id) => {
    try {
      const payload = { ...formData };
      if (!payload.password) delete payload.password;

      await updateStaff({ id, updatedData: payload }).unwrap();
      alert("✅ Staff updated successfully!");
      handleCancel();
    } catch (err) {
      console.error(err);
      alert("❌ Error updating staff");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;

    try {
      await deleteStaff(id).unwrap();
      alert("✅ Staff deleted successfully!");
      if (editingId === id) handleCancel();
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting staff");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Staff Management"
          subtitle="Manage staff records, update details, or remove staff."
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
          <p className="mt-6 text-white/60 text-sm">Loading staff...</p>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Staff Management"
          subtitle="Manage staff records, update details, or remove staff."
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
          Error fetching staff!
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Management"
        subtitle="Search, edit, and manage staff details."
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

      {/* Search */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
              size={18}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, address, contact, or staff ID..."
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

          <div className="text-sm text-white/60 whitespace-nowrap">
            Showing{" "}
            <span className="font-extrabold text-white">{filteredStaff.length}</span>{" "}
            of{" "}
            <span className="font-extrabold text-white">{staffList.length}</span>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/70 sticky top-0">
              <tr>
                {["Staff", "Address", "Contact", "Password", "Actions"].map((h) => (
                  <th
                    key={h}
                    className={[
                      "px-5 py-4 text-left font-semibold border-b border-white/10",
                      h === "Actions" ? "text-right" : "",
                    ].join(" ")}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredStaff.length > 0 ? (
                filteredStaff.map((staff) => {
                  const isEditing = editingId === staff.staff_id;

                  return (
                    <tr
                      key={staff.staff_id}
                      className={[
                        "border-b border-white/10 hover:bg-white/5 transition",
                        isEditing ? "bg-emerald-500/10" : "",
                      ].join(" ")}
                    >
                      {/* Staff */}
                      <td className="px-5 py-4">
                        <div className="text-white font-extrabold">
                          {isEditing ? (
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white
                                         outline-none transition
                                         focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                            />
                          ) : (
                            staff.name
                          )}
                        </div>
                        <div className="text-xs text-white/50">
                          ID: {staff.staff_id}
                        </div>
                      </td>

                      {/* Address */}
                      <td className="px-5 py-4 text-white/70">
                        {isEditing ? (
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white
                                       outline-none transition
                                       focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                          />
                        ) : (
                          staff.address
                        )}
                      </td>

                      {/* Contact */}
                      <td className="px-5 py-4 text-white/70">
                        {isEditing ? (
                          <input
                            type="text"
                            name="contact_no"
                            value={formData.contact_no}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white
                                       outline-none transition
                                       focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                          />
                        ) : (
                          staff.contact_no
                        )}
                      </td>

                      {/* Password */}
                      <td className="px-5 py-4 text-white/70">
                        {isEditing ? (
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white
                                       outline-none transition
                                       focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                          />
                        ) : (
                          "••••••"
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => handleUpdate(staff.staff_id)}
                                disabled={updating}
                                className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 bg-emerald-500 text-slate-950 font-extrabold
                                           hover:bg-emerald-400 transition disabled:opacity-60"
                                type="button"
                              >
                                <Save size={16} />
                                {updating ? "Saving..." : "Save"}
                              </button>

                              <button
                                onClick={handleCancel}
                                className="rounded-2xl px-3 py-2 bg-white/5 border border-white/10 text-white/85 font-semibold
                                           hover:bg-white/10 transition"
                                type="button"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(staff)}
                                className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 bg-white/5 border border-white/10
                                           text-white/85 font-semibold hover:bg-white/10 transition"
                                type="button"
                              >
                                <Pencil size={16} />
                                Edit
                              </button>

                              <button
                                onClick={() => handleDelete(staff.staff_id)}
                                disabled={deleting}
                                className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 bg-rose-500 text-slate-950 font-extrabold
                                           hover:bg-rose-400 transition disabled:opacity-60"
                                type="button"
                              >
                                <Trash2 size={16} />
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-white/60">
                    No staff found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bottom back */}
      <button
        onClick={() => navigate(`${ADMIN_BASE}/hostel/all`)}
        className="w-full rounded-2xl py-3 bg-white/5 border border-white/10 text-white/85 font-semibold
                   hover:bg-white/10 transition"
      >
        ← Back to Hostels
      </button>
    </div>
  );
};

export default StaffManagement;