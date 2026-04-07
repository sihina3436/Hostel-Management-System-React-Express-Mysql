import React, { useMemo, useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/admin/adminAPI";
import { useNavigate } from "react-router-dom";
import Card from "../../../Components/ui/Card";
import PageHeader from "../../../Components/ui/PageHeader";
import { ArrowLeft, Search, X, Users } from "lucide-react";

const ADMIN_BASE = "/admin-dashboard";

const GetAllStudents = () => {
  const navigate = useNavigate();
  const {
    data: students = [],
    isLoading,
    isError,
    error,
  } = useGetAllStudentsQuery();

  const [query, setQuery] = useState("");

  const filteredStudents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;

    return students.filter((s) => {
      return (
        String(s.stud_id).includes(q) ||
        (s.name || "").toLowerCase().includes(q) ||
        (s.phone_no || "").toLowerCase().includes(q) ||
        (s.email || "").toLowerCase().includes(q) ||
        (s.address || "").toLowerCase().includes(q) ||
        (s.Room?.room_no || "").toLowerCase().includes(q) ||
        String(s.Room?.floor_no ?? "").includes(q)
      );
    });
  }, [students, query]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="All Students"
          subtitle="View student details and assigned rooms."
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
          title="All Students"
          subtitle="View student details and assigned rooms."
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
        title="All Students"
        subtitle="Search students and view their room assignment."
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

      {/* Search + count */}
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
              placeholder="Search by name, ID, phone, email, room..."
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

          <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 text-white/80 px-3 py-2 text-xs font-extrabold whitespace-nowrap">
            <Users size={14} />
            {filteredStudents.length} student(s)
          </span>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/70 sticky top-0">
              <tr>
                {["ID", "Name", "Phone", "Email", "Address", "Room No", "Floor"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-5 py-4 text-left font-semibold border-b border-white/10 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-white/60">
                    No students found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr
                    key={student.stud_id}
                    className="border-b border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="px-5 py-4 text-white/70">{student.stud_id}</td>
                    <td className="px-5 py-4 font-extrabold text-white">
                      {student.name}
                    </td>
                    <td className="px-5 py-4 text-white/70">{student.phone_no}</td>
                    <td className="px-5 py-4 text-white/70">{student.email}</td>
                    <td className="px-5 py-4 text-white/70">{student.address}</td>

                    <td className="px-5 py-4">
                      <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 text-white/80 px-3 py-1 text-xs font-extrabold">
                        {student.Room?.room_no || "N/A"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-white/70">
                      {student.Room?.floor_no ?? "N/A"}
                    </td>
                  </tr>
                ))
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

export default GetAllStudents;