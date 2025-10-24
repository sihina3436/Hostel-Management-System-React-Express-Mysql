import React, { useEffect, useState } from "react";

const StudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState(null);
  useEffect(() => {
    // No backend available during development — use dummy data for the UI.
    const dummy = {
      name: "John Doe",
      email: "john.doe@example.com",
      regNo: "REG-2025-001",
      roomNumber: "A-101",
      hostel: {
        name: "Central Boys Hostel",
        contact: "+1 555-123-4567",
      },
      billing: {
        outstanding: "120.00",
        lastPaid: "2025-09-15",
      },
    };

    // Simulate a short network delay so loading state is visible
    const timer = setTimeout(() => {
      setStudent(dummy);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold mb-6">Student Dashboard</h2>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="bg-white p-4 rounded shadow">
            <h3 className="font-medium text-lg mb-3">Your Details</h3>
            {student ? (
              <ul className="text-sm text-gray-700 space-y-2">
                <li>
                  <strong>Name:</strong> {student.name || student.fullName || "-"}
                </li>
                <li>
                  <strong>Email:</strong> {student.email || "-"}
                </li>
                <li>
                  <strong>Registration No:</strong> {student.regNo || student.registrationNo || "-"}
                </li>
                <li>
                  <strong>Room:</strong> {student.room || student.roomNumber || "Not assigned"}
                </li>
              </ul>
            ) : (
              <p className="text-gray-600">No student details available.</p>
            )}
          </section>

          <section className="bg-white p-4 rounded shadow">
            <h3 className="font-medium text-lg mb-3">Hostel</h3>
            <p className="text-sm text-gray-700">
              <strong>Name:</strong> {student?.hostel?.name || "University Hostel"}
            </p>
            <p className="text-sm text-gray-700 mt-2">
              <strong>Contact:</strong> {student?.hostel?.contact || "+000 000 0000"}
            </p>
          </section>

          <section className="bg-white p-4 rounded shadow">
            <h3 className="font-medium text-lg mb-3">Billing</h3>
            {student?.billing ? (
              <div className="text-sm text-gray-700">
                <p>
                  <strong>Outstanding:</strong> {student.billing.outstanding || "0.00"}
                </p>
                <p className="mt-2">
                  <strong>Last Paid:</strong> {student.billing.lastPaid || "-"}
                </p>
              </div>
            ) : (
              <p className="text-gray-600">No billing information available.</p>
            )}
          </section>
        </div>
      )}

      <div className="mt-6 text-xs text-gray-500">
        <p>Note: update the fetch endpoint and data mapping to match your backend responses.</p>
      </div>
    </div>
  );
};

export default StudentDashboard;
