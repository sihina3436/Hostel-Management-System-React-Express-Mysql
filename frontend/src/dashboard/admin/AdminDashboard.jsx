import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [studentQuery, setStudentQuery] = useState("");
  const [selected, setSelected] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // UI state
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    // Dummy admin and lists
    const dummyAdmin = {
      name: "Hostel Admin",
      email: "admin@example.com",
      assignedHostel: { name: "Central Boys Hostel", contact: "+1 555-123-4567" },
    };

    const dummyStudents = Array.from({ length: 8 }).map((_, i) => ({
      id: i + 1,
      name: ["Alice", "Bob", "Carlos", "Diana", "Eve", "Frank", "Grace", "Hassan"][i % 8] + ` ${i + 1}`,
      regNo: `REG-2025-${100 + i}`,
      roomNumber: `B-${100 + i}`,
      hostel: { name: `Central Boys Hostel` },
      billing: {
        outstanding: (Math.round(Math.random() * 200 * 100) / 100).toFixed(2),
        recent: [
          { id: 1, title: "Rent", amount: "20.00", status: i % 2 === 0 ? "Paid" : "Unpaid" },
        ],
      },
      contact: `+1 555-000-${100 + i}`,
    }));

    const dummyStaff = [
      { id: 1, name: "Mr. Supervisor", role: "Warden", assignedHostel: "Central Boys Hostel" },
      { id: 2, name: "Mrs. Manager", role: "Accountant", assignedHostel: "Central Boys Hostel" },
    ];

    const t = setTimeout(() => {
      setAdmin(dummyAdmin);
      setStudents(dummyStudents);
      setStaff(dummyStaff);
      setLoading(false);
    }, 250);

    return () => clearTimeout(t);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
    } catch (e) {}
    navigate("/login");
  };

  const totals = {
    outstanding: students.reduce((s, it) => s + Number(it.billing.outstanding || 0), 0).toFixed(2),
    totalStudents: students.length,
  };

  const openStudent = (s) => {
    setSelectedStudent(s);
    setShowStudentModal(true);
  };

  const closeStudent = () => {
    setShowStudentModal(false);
    setSelectedStudent(null);
  };

  const openEditModal = () => {
    setEditName(admin?.name || "");
    setEditEmail(admin?.email || "");
    setShowEditModal(true);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    setAdmin((p) => ({ ...(p || {}), name: editName, email: editEmail }));
    setTimeout(() => setShowEditModal(false), 300);
  };

  //Notification delete fcuntion
  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
};

  const menuItems = [
    { id: "overview", label: "Overview", icon: "ri-dashboard-line" },
    { id: "students", label: "Students", icon: "ri-group-line" },
    { id: "billing", label: "Billing", icon: "ri-wallet-3-line" },
    { id: "hostels", label: "Hostels", icon: "ri-building-line" },
    { id: "staff", label: "Staff", icon: "ri-team-line" },
    { id: "notifications", label: "Notifications", icon: "ri-notification-line" },
  ];

  const Header = () => (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <p className="text-sm text-gray-500">{admin?.assignedHostel?.name}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-700">{admin?.name}</div>
        <button onClick={openEditModal} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">Edit profile</button>
        <button onClick={handleLogout} className="px-3 py-1 bg-red-50 text-red-700 rounded">Logout</button>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-4 rounded shadow bg-white">
        <h3 className="font-medium">Students</h3>
        <div className="text-2xl font-bold mt-2">{totals.totalStudents}</div>
      </div>
      <div className="p-4 rounded shadow bg-white">
        <h3 className="font-medium">Total Outstanding</h3>
        <div className="text-2xl font-bold mt-2">${totals.outstanding}</div>
      </div>
      <div className="p-4 rounded shadow bg-white">
        <h3 className="font-medium">Assigned Hostel</h3>
        <div className="mt-2">{admin?.assignedHostel?.name}</div>
        <div className="text-sm text-gray-600 mt-1">{admin?.assignedHostel?.contact}</div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="bg-white rounded shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">Students</h3>
        <div className="w-72">
          <input
            type="text"
            value={studentQuery}
            onChange={(e) => setStudentQuery(e.target.value)}
            placeholder="Search by name or reg no"
            className="w-full border rounded px-3 py-1 text-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        {students
          .filter((s) => {
            if (!studentQuery) return true;
            const q = studentQuery.toLowerCase();
            return (
              s.name.toLowerCase().includes(q) ||
              s.regNo.toLowerCase().includes(q) ||
              (s.roomNumber || "").toLowerCase().includes(q)
            );
          })
          .map((s) => (
            <div key={s.id} className="flex items-center justify-between p-3 border rounded">
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-gray-500">{s.regNo} • {s.roomNumber}</div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => openStudent(s)} className="px-3 py-1 bg-emerald-600 text-white rounded">View</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-medium mb-4">Billing (All Students)</h3>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-600">
            <th className="pb-2">Student</th>
            <th className="pb-2">Reg No</th>
            <th className="pb-2">Outstanding</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="py-2">{s.name}</td>
              <td className="py-2">{s.regNo}</td>
              <td className="py-2">${s.billing.outstanding}</td>
              <td className="py-2">{s.billing.recent?.[0]?.status === 'Paid' ? 'Paid' : 'Unpaid'}</td>
              <td className="py-2"><button onClick={() => openStudent(s)} className="px-2 py-1 bg-gray-100 rounded">Details</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderHostels = () => (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-medium mb-3">Hostels</h3>
      <div className="p-3 border rounded">
        <div className="font-medium">{admin?.assignedHostel?.name}</div>
        <div className="text-sm text-gray-600">Contact: {admin?.assignedHostel?.contact}</div>
      </div>
    </div>
  );

  const renderStaff = () => (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-medium mb-3">Staff</h3>
      <ul className="space-y-2">
        {staff.map((s) => (
          <li key={s.id} className="p-2 border rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{s.name}</div>
              <div className="text-sm text-gray-500">{s.role} • {s.assignedHostel}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderNotifications = () => (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-medium mb-3">Notifications</h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target;
          const title = form.title.value.trim();
          const body = form.body.value.trim();
          if (!title && !body) return;
          const n = { id: Date.now(), title: title || 'Notice', body, createdAt: new Date().toISOString() };
          setNotifications((s) => [n, ...s]);
          form.reset();
        }}
        className="space-y-3 mb-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input name="title" placeholder="Title (optional)" className="border rounded px-3 py-2" />
          <input name="body" placeholder="Short message" className="border rounded px-3 py-2" />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded">Post Notification</button>
        </div>
      </form>

      {notifications.length === 0 ? (
        <div className="text-sm text-gray-500">No notifications yet.</div>
      ) : (
        <ul className="space-y-2">
          {notifications.map((n) => (
        <li key={n.id} className="p-3 border rounded flex items-start justify-between">
            <div>
                <div className="font-medium">{n.title}</div>
                <div className="text-sm text-gray-600">{n.body}</div>
                <div className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
            </div>

            <button
                onClick={() => {
                    if (window.confirm("Are you sure you want to delete this notification?")) {
                        deleteNotification(n.id);
                    }}}
                className="ml-4 px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs"
                >
                Delete
            </button>
            </li>
            ))}
        </ul>
      )}
    </div>
  );

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-700">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />

      {/* Edit admin modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black opacity-30" onClick={() => setShowEditModal(false)} />
          <div className="bg-white rounded shadow p-6 z-10 w-full max-w-lg">
            <h3 className="text-lg font-medium mb-4">Edit Profile</h3>
            <form onSubmit={handleEditSave} className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600">Name</label>
                <input className="mt-1 w-full border rounded px-3 py-2" value={editName} onChange={(e) => setEditName(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm text-gray-600">Email</label>
                <input className="mt-1 w-full border rounded px-3 py-2" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 rounded border">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-emerald-600 text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student detail modal */}
      {showStudentModal && selectedStudent && (
        <>
          <div className="fixed inset-0 z-40 bg-black opacity-30" onClick={closeStudent} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded shadow p-6 w-full max-w-2xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">{selectedStudent.name}</h3>
                <button onClick={closeStudent} className="text-gray-500">Close</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Reg No:</strong> {selectedStudent.regNo}</p>
                  <p><strong>Room:</strong> {selectedStudent.roomNumber}</p>
                  <p><strong>Hostel:</strong> {selectedStudent.hostel.name}</p>
                  <p><strong>Contact:</strong> {selectedStudent.contact}</p>
                </div>
                <div>
                  <p className="font-medium mb-2">Billing</p>
                  <p><strong>Outstanding:</strong> ${selectedStudent.billing.outstanding}</p>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Recent</p>
                    <ul className="mt-2 space-y-1">
                      {selectedStudent.billing.recent.map((r) => (
                        <li key={r.id} className="text-sm">{r.title} — ${r.amount} • {r.status}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="flex">
        <aside className={`fixed inset-y-0 left-0 z-40 transform bg-white p-4 shadow transition-all duration-200 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${collapsed ? 'w-20' : 'w-64'} flex flex-col h-screen`}>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500 hidden md:block">Menu</div>
            <div className="hidden md:block">
              <button onClick={() => setCollapsed((c) => !c)} className="p-1 rounded hover:bg-gray-100" aria-label="Toggle sidebar">
                <i className={`ri-arrow-${collapsed ? 'right' : 'left'}-s-line`}></i>
              </button>
            </div>
          </div>
          <nav className="flex-1">
            <ul className="space-y-1 flex flex-col h-full">
              {menuItems.map((m) => (
                <li key={m.id}>
                  <button onClick={() => { setSelected(m.id); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2 rounded ${selected === m.id ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <i className={`${m.icon} text-lg`} />
                    <span className={`font-medium ${collapsed ? 'hidden' : ''}`}>{m.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-4">
            <button onClick={handleLogout} className={`w-full flex items-center gap-3 px-3 py-2 rounded ${collapsed ? 'justify-center' : ''} text-gray-700 hover:bg-gray-100`}>
              <i className="ri-logout-box-line text-lg" />
              <span className={`font-medium ${collapsed ? 'hidden' : ''}`}>Logout</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 ml:ml-64 flex justify-center">
          <div className="w-full max-w-5xl">
            {selected === 'overview' && renderOverview()}
            {selected === 'students' && renderStudents()}
            {selected === 'billing' && renderBilling()}
            {selected === 'hostels' && renderHostels()}
            {selected === 'staff' && renderStaff()}
            {selected === 'notifications' && renderNotifications()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
