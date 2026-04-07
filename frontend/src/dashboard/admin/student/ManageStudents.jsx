import React, { useMemo, useState } from "react";
import {
  useGetAllStudentsQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} from "../../../redux/admin/adminAPI";
import { useNavigate } from "react-router-dom";
import Card from "../../../Components/ui/Card";
import PageHeader from "../../../Components/ui/PageHeader";
import { ArrowLeft, Search, X, Pencil, Trash2, Save } from "lucide-react";

const ADMIN_BASE = "/admin-dashboard";

const ManageStudents = () => {
  const navigate = useNavigate();

  const {
    data: students = [],
    isLoading,
    isError,
    error,
  } = useGetAllStudentsQuery();

  const [updateStudent, { isLoading: updating }] = useUpdateStudentMutation();
  const [deleteStudent, { isLoading: deleting }] = useDeleteStudentMutation();

  const [editStudentId, setEditStudentId] = useState(null);
  const [query, setQuery] = useState("");

  const [editFormData, setEditFormData] = useState({
    name: "",
    phone_no: "",
    address: "",
    email: "",
    password: "",
  });

  const filteredStudents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;

    return students.filter((s) => {
      return (
        String(s.stud_id).includes(q) ||
        (s.name || "").toLowerCase().includes(q) ||
        (s.phone_no || "").toLowerCase().includes(q) ||
        (s.email || "").toLowerCase().includes(q) ||
        (s.address || "").toLowerCase().includes(q)
      );
    });
  }, [students, query]);

  const startEdit = (student) => {
    setEditStudentId(student.stud_id);
    setEditFormData({
      name: student.name || "",
      phone_no: student.phone_no || "",
      address: student.address || "",
      email: student.email || "",
      password: "", // don't prefill passwords
    });
  };

  const cancelEdit = () => {
    setEditStudentId(null);
    setEditFormData({
      name: "",
      phone_no: "",
      address: "",
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    setEditFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (id) => {
    try {
      const payload = { ...editFormData };
      if (!payload.password) delete payload.password;

      await updateStudent({ id, updatedData: payload }).unwrap();
      alert("✅ Student updated successfully!");
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert("❌ Error updating student");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await deleteStudent(id).unwrap();
      alert("✅ Student deleted successfully!");
      if (editStudentId === id) cancelEdit();
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting student");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Manage Students"
          subtitle="Edit or remove student records."
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
          <p className="mt-6 text-white/60 text-sm">Loading students...</p>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Manage Students"
          subtitle="Edit or remove student records."
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
          {error?.data?.message || "Something went wrong"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Students"
        subtitle="Search, edit, and delete student accounts."
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
              placeholder="Search by name, ID, phone, email, address..."
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
            <span className="font-extrabold text-white">
              {filteredStudents.length}
            </span>{" "}
            of{" "}
            <span className="font-extrabold text-white">{students.length}</span>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/70 sticky top-0">
              <tr>
                {["Student", "Phone", "Email", "Address", "Actions"].map((h) => (
                  <th
                    key={h}
                    className={[
                      "px-5 py-4 text-left font-semibold border-b border-white/10 whitespace-nowrap",
                      h === "Actions" ? "text-right" : "",
                    ].join(" ")}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-white/60">
                    No students found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const isEditing = editStudentId === student.stud_id;

                  return (
                    <tr
                      key={student.stud_id}
                      className={[
                        "border-b border-white/10 hover:bg-white/5 transition",
                        isEditing ? "bg-emerald-500/10" : "",
                      ].join(" ")}
                    >
                      {/* Student */}
                      <td className="px-5 py-4">
                        <div className="font-extrabold text-white">
                          {isEditing ? (
                            <input
                              type="text"
                              name="name"
                              value={editFormData.name}
                              onChange={handleChange}
                              className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white
                                         outline-none transition
                                         focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                            />
                          ) : (
                            student.name
                          )}
                        </div>
                        <div className="text-xs text-white/50">
                          ID: {student.stud_id}
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-4 text-white/70">
                        {isEditing ? (
                          <input
                            type="text"
                            name="phone_no"
                            value={editFormData.phone_no}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white
                                       outline-none transition
                                       focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                          />
                        ) : (
                          student.phone_no
                        )}
                      </td>

                      {/* Email */}
                      <td className="px-5 py-4 text-white/70">
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={editFormData.email}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white
                                       outline-none transition
                                       focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                          />
                        ) : (
                          student.email
                        )}
                      </td>

                      {/* Address */}
                      <td className="px-5 py-4 text-white/70">
                        {isEditing ? (
                          <input
                            type="text"
                            name="address"
                            value={editFormData.address}
                            onChange={handleChange}
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white
                                       outline-none transition
                                       focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                          />
                        ) : (
                          student.address
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          {isEditing ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleUpdate(student.stud_id)}
                                disabled={updating}
                                className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 bg-emerald-500 text-slate-950 font-extrabold
                                           hover:bg-emerald-400 transition disabled:opacity-60"
                              >
                                <Save size={16} />
                                {updating ? "Saving..." : "Save"}
                              </button>

                              <button
                                type="button"
                                onClick={cancelEdit}
                                className="rounded-2xl px-3 py-2 bg-white/5 border border-white/10 text-white/85 font-semibold
                                           hover:bg-white/10 transition"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => startEdit(student)}
                                className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 bg-white/5 border border-white/10
                                           text-white/85 font-semibold hover:bg-white/10 transition"
                              >
                                <Pencil size={16} />
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDelete(student.stud_id)}
                                disabled={deleting}
                                className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 bg-rose-500 text-slate-950 font-extrabold
                                           hover:bg-rose-400 transition disabled:opacity-60"
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
              )}
            </tbody>
          </table>
        </div>
      </Card>

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

export default ManageStudents;