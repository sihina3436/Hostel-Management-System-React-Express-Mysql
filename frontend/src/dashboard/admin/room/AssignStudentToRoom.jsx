import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetAllStudentsQuery,
  useAssignStudentsToRoomMutation,
} from "../../../redux/admin/adminAPI";
import { ArrowLeft, UserPlus, Search, DoorOpen } from "lucide-react";

const ADMIN_BASE = "/admin-dashboard";

const AssignStudentToRoom = () => {
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const [studentSearch, setStudentSearch] = useState("");

  const {
    data: students = [],
    isLoading: loadingStudents,
    isError: studentsError,
  } = useGetAllStudentsQuery();

  const [assignStudent, { isLoading: assigning }] =
    useAssignStudentsToRoomMutation();

  const filteredStudents = useMemo(() => {
    const q = studentSearch.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) => {
      return (
        String(s.stud_id).includes(q) ||
        (s.name || "").toLowerCase().includes(q) ||
        (s.email || "").toLowerCase().includes(q) ||
        (s.phone_no || "").toLowerCase().includes(q)
      );
    });
  }, [students, studentSearch]);

  const selectedStudent = useMemo(
    () => students.find((s) => String(s.stud_id) === String(studentId)),
    [students, studentId]
  );

  const handleAssign = async (e) => {
    e.preventDefault();
    setError("");

    if (!studentId || !roomId) {
      setError("Please select a student and enter a room ID.");
      return;
    }

    try {
      await assignStudent({
        student_id: studentId,
        room_id: roomId,
      }).unwrap();

      alert("✅ Student assigned to room successfully!");
      setStudentId("");
      setRoomId("");
      setStudentSearch("");
    } catch (err) {
      setError(err?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Assign Student to Room
          </h2>
          <p className="mt-1 text-white/70">
            Choose a student, enter a room ID, and assign instantly.
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

        <form onSubmit={handleAssign} className="p-6 sm:p-8 space-y-6">
          {/* Student */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-semibold text-white/90">
                Select Student
              </label>
              <span className="text-xs text-white/55">
                {loadingStudents
                  ? "Loading..."
                  : `${filteredStudents.length} student(s)`}
              </span>
            </div>

            {/* Search student */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
                size={18}
              />
              <input
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Search by name, ID, email, phone..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                           pl-10 pr-4 py-3 outline-none transition
                           focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
              />
            </div>

            {/* Select */}
            {studentsError ? (
              <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200 text-sm font-semibold">
                Failed to load students.
              </div>
            ) : (
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white
                           outline-none transition
                           focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                disabled={loadingStudents}
              >
                <option className="bg-slate-900" value="">
                  {loadingStudents
                    ? "Loading students..."
                    : "-- Select Student --"}
                </option>
                {filteredStudents.map((student) => (
                  <option
                    className="bg-slate-900"
                    key={student.stud_id}
                    value={student.stud_id}
                  >
                    {student.name} (ID: {student.stud_id})
                  </option>
                ))}
              </select>
            )}

            {/* Selected student preview */}
            {selectedStudent && (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-sm font-extrabold text-white">
                  {selectedStudent.name}{" "}
                  <span className="text-white/55 font-semibold">
                    (ID: {selectedStudent.stud_id})
                  </span>
                </div>
                <div className="text-xs text-white/60 mt-1">
                  {selectedStudent.email || "No email"} ·{" "}
                  {selectedStudent.phone_no || "No phone"}
                </div>
              </div>
            )}
          </div>

          {/* Room ID */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2">
              Room ID
            </label>
            <div className="relative">
              <DoorOpen
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/45"
                size={18}
              />
              <input
                type="number"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="e.g. 12"
                className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/35
                           pl-10 pr-4 py-3 outline-none transition
                           focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
              />
            </div>
            <p className="mt-2 text-xs text-white/55">
              Enter the room ID you want to assign.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200 text-sm font-semibold">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(`${ADMIN_BASE}/room/all`)}
              className="w-full sm:w-auto rounded-2xl px-5 py-3 bg-white/5 border border-white/10
                         text-white/85 font-semibold hover:bg-white/10 transition"
            >
              Back to Rooms
            </button>

            <button
              type="submit"
              disabled={assigning}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3
                         bg-emerald-500 text-slate-950 font-extrabold hover:bg-emerald-400 transition
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <UserPlus size={18} />
              {assigning ? "Assigning..." : "Assign Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignStudentToRoom;