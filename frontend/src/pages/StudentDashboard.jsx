import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState("overview");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any client-side auth tokens (adjust keys as needed)
    try {
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
    } catch (e) {
      // ignore
    }
    // Navigate to login page
    navigate("/login");
  };

  // Note: Remix Icon classes (ri-*) require the Remix Icon stylesheet to be loaded.
  // Add to public/index.html inside <head>:
  // <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet">
  // Or use a React icon library (react-icons) and replace the "icon" strings with icon components.
  const menuItems = [
    { id: "overview", label: "Overview", icon: "ri-dashboard-line" },
    { id: "profile", label: "Profile", icon: "ri-user-line" },
    { id: "billing", label: "Billing", icon: "ri-wallet-3-line" },
    { id: "room", label: "Room", icon: "ri-home-4-line" },
    { id: "notifications", label: "Notifications", icon: "ri-notification-line" },
    { id: "apply", label: "Apply Hostel", icon: "ri-edit-box-line" },
  ];

  useEffect(() => {
    // Dummy data
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
        recent: [
          { id: 1, title: "September Rent", amount: "60.00", status: "Paid" },
          { id: 2, title: "Electricity", amount: "30.00", status: "Unpaid" },
        ],
      },
      notifications: [
        { id: 1, text: "Mess will be closed on Friday for cleaning." },
      ],
      verified: false,
    };

    const t = setTimeout(() => {
      setStudent(dummy);
      setLoading(false);
    }, 350);

    return () => clearTimeout(t);
  }, []);

  const initials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  // Edit profile modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRegNo, setEditRegNo] = useState("");
  const [editRoomNumber, setEditRoomNumber] = useState("");
  const [editHostelName, setEditHostelName] = useState("");
  const [editHostelContact, setEditHostelContact] = useState("");
  const [editMessage, setEditMessage] = useState(null);

  const openEditModal = () => {
    // Prefill with current student data (if available)
    setEditName(student?.name || "");
    setEditEmail(student?.email || "");
    setEditRegNo(student?.regNo || "");
    setEditRoomNumber(student?.roomNumber || "");
    setEditHostelName(student?.hostel?.name || "");
    setEditHostelContact(student?.hostel?.contact || "");
    setEditMessage(null);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!editName || !editEmail) {
      setEditMessage({ type: "error", text: "Name and email are required." });
      return;
    }

    // Update local student state (client-side only)
    setStudent((prev) => ({
      ...prev,
      name: editName,
      email: editEmail,
      regNo: editRegNo,
      roomNumber: editRoomNumber,
      hostel: {
        ...(prev?.hostel || {}),
        name: editHostelName,
        contact: editHostelContact,
      },
    }));

    setEditMessage({ type: "success", text: "Profile updated (demo)." });
    setTimeout(() => {
      setShowEditModal(false);
    }, 600);
  };

  // Apply Hostel form state
  const [applyDistance, setApplyDistance] = useState("");
  const [applyIncome, setApplyIncome] = useState("");
  const [applyFile, setApplyFile] = useState(null);
  const [applyMessage, setApplyMessage] = useState(null);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return setApplyFile(null);
    if (f.type !== "application/pdf") {
      setApplyMessage({ type: "error", text: "Please upload a PDF file." });
      setApplyFile(null);
      return;
    }
    setApplyFile(f);
    setApplyMessage(null);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyDistance || !applyIncome || !applyFile) {
      setApplyMessage({ type: "error", text: "Please fill all fields and attach a PDF income statement." });
      return;
    }
    setApplyMessage({ type: "success", text: "Application submitted (demo). We'll contact you soon." });
    setTimeout(() => {
      setApplyDistance("");
      setApplyIncome("");
      setApplyFile(null);
    }, 800);
  };

  const renderApply = () => (
    <div className="p-6 bg-white rounded shadow">
      <h3 className="font-medium text-lg mb-4">Apply for Hostel</h3>

      {applyMessage && (
        <div className={`p-3 rounded ${applyMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {applyMessage.text}
        </div>
      )}

      <form onSubmit={handleApplySubmit} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm text-gray-600">Distance to campus (km)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            value={applyDistance}
            onChange={(e) => setApplyDistance(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="e.g. 2.5"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Monthly Income</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={applyIncome}
            onChange={(e) => setApplyIncome(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="e.g. 1500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Income statement (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="mt-1"
          />
          {applyFile && <div className="mt-2 text-sm text-gray-700">Selected: {applyFile.name}</div>}
        </div>

        <div>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded" type="submit">Submit Application</button>
        </div>
      </form>
    </div>
  );

  const Header = () => {
    const [avatarOpen, setAvatarOpen] = useState(false);

    return (
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 rounded bg-gray-100" onClick={() => setSidebarOpen(true)}>
            <i className="ri-menu-line text-xl"></i>
          </button>
          <div>
            <h2 className="text-2xl font-semibold">Student Dashboard</h2>
            <p className="text-sm text-gray-500">{student?.hostel?.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 relative">
          {/* Verification badge on the top-right */}
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${student?.verified ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}
            title={student?.verified ? 'Verified for hostel' : 'Not verified'}
          >
            <i className={`${student?.verified ? 'ri-shield-check-line' : 'ri-alert-line'} text-lg`} />
            <span>{student?.verified ? 'Hostel Verified' : 'Hostel not verified'}</span>
          </div>

          {/* Avatar that toggles a small logout dropdown */}
          <div className="relative">
            <button
              onClick={() => setAvatarOpen((v) => !v)}
              aria-expanded={avatarOpen}
              className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-medium focus:outline-none"
              title="Account menu"
            >
              {initials(student?.name)}
            </button>

            {avatarOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow p-2 z-50">
                <button
                  onClick={() => {
                    setAvatarOpen(false);
                    openEditModal();
                  }}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm text-gray-700 flex items-center gap-2"
                >
                  <i className="ri-edit-box-line" />
                  Edit profile
                </button>
                <button
                  onClick={() => {
                    setAvatarOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-sm text-gray-700 flex items-center gap-2"
                >
                  <i className="ri-logout-box-line"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (selected === "overview") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-4 rounded shadow bg-white">
            <h3 className="font-medium mb-2">Profile</h3>
            <p className="text-sm text-gray-700"><strong>Name:</strong> {student?.name}</p>
            <p className="text-sm text-gray-700"><strong>Email:</strong> {student?.email}</p>
            <p className="text-sm text-gray-700"><strong>Room:</strong> {student?.roomNumber}</p>
          </div>
          <div className="p-4 rounded shadow bg-white">
            <h3 className="font-medium mb-2">Hostel</h3>
            <p className="text-sm text-gray-700"><strong>Name:</strong> {student?.hostel?.name}</p>
            <p className="text-sm text-gray-700"><strong>Contact:</strong> {student?.hostel?.contact}</p>
          </div>
          <div className="p-4 rounded shadow bg-white">
            <h3 className="font-medium mb-2">Billing</h3>
            <p className="text-sm text-gray-700"><strong>Outstanding:</strong> ${student?.billing?.outstanding}</p>
            <p className="text-sm text-gray-700"><strong>Last Paid:</strong> {student?.billing?.lastPaid}</p>
          </div>
        </div>
      );
    }

    if (selected === "profile") {
      return (
        <div className="p-6 bg-white rounded shadow relative">
          <button
            onClick={openEditModal}
            className="absolute top-3 right-3 p-2 rounded hover:bg-gray-100 text-gray-600"
            aria-label="Edit profile"
            title="Edit profile"
          >
            <i className="ri-edit-line text-lg" />
          </button>

          <h3 className="font-medium text-lg mb-4">Profile</h3>
          <p><strong>Name:</strong> {student?.name}</p>
          <p><strong>Email:</strong> {student?.email}</p>
          <p><strong>Reg No:</strong> {student?.regNo}</p>
        </div>
      );
    }

    if (selected === "billing") {
      return (
        <div className="p-6 bg-white rounded shadow">
          <h3 className="font-medium text-lg mb-4">Billing</h3>
          <p><strong>Outstanding:</strong> ${student?.billing?.outstanding}</p>
          <p className="mt-3 font-medium">Recent Bills</p>
          <ul className="mt-2 space-y-2">
            {student?.billing?.recent?.map((b) => (
              <li key={b.id} className="flex justify-between border p-3 rounded">
                <span>{b.title}</span>
                <span className={`${b.status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>${b.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (selected === "room") {
      return (
        <div className="p-6 bg-white rounded shadow">
          <h3 className="font-medium text-lg mb-4">Room</h3>
          <p><strong>Room Number:</strong> {student?.roomNumber}</p>
          <p><strong>Hostel:</strong> {student?.hostel?.name}</p>
        </div>
      );
    }

    if (selected === "notifications") {
      return (
        <div className="p-6 bg-white rounded shadow">
          <h3 className="font-medium text-lg mb-4">Notifications</h3>
          <ul className="space-y-3">
            {student?.notifications?.map((n) => (
              <li key={n.id} className="p-3 rounded border-l-4 border-emerald-500 bg-emerald-50">{n.text}</li>
            ))}
          </ul>
        </div>
      );
    }

    if (selected === "apply") {
      return renderApply();
    }

    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />

      {/* Edit profile modal */}
      {showEditModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black opacity-40" onClick={closeEditModal} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded shadow-lg p-6">
              <h3 className="text-lg font-medium mb-4">Edit Profile</h3>

              {editMessage && (
                <div className={`p-2 rounded mb-4 ${editMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {editMessage.text}
                </div>
              )}

              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">Name</label>
                    <input value={editName} onChange={(e) => setEditName(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Email</label>
                    <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">Registration No</label>
                    <input value={editRegNo} onChange={(e) => setEditRegNo(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Room Number</label>
                    <input value={editRoomNumber} onChange={(e) => setEditRoomNumber(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">Hostel Name</label>
                    <input value={editHostelName} onChange={(e) => setEditHostelName(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Hostel Contact</label>
                    <input value={editHostelContact} onChange={(e) => setEditHostelContact(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <button type="button" onClick={closeEditModal} className="px-4 py-2 rounded border">Cancel</button>
                  <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      {!loading && !error && (
        <div className="flex">
          {/* Sidebar */}
          <aside className={`fixed inset-y-0 left-0 z-40 transform bg-white p-4 shadow transition-all duration-200 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${collapsed ? 'w-20' : 'w-64'} flex flex-col h-screen`}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500 hidden md:block">Menu</div>
              <div className="hidden md:block">
                <button
                  onClick={() => setCollapsed((c) => !c)}
                  className="p-1 rounded hover:bg-gray-100"
                  aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  <i className={`ri-arrow-${collapsed ? 'right' : 'left'}-s-line`}></i>
                </button>
              </div>
            </div>
            <nav className="flex-1">
              <ul className="space-y-1 flex flex-col h-full">
                {menuItems.map((m) => (
                  <li key={m.id}>
                    <button
                      onClick={() => { setSelected(m.id); setSidebarOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded ${selected === m.id ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                      <i className={`${m.icon} text-lg`} />
                      {/* hide label when collapsed */}
                      <span className={`font-medium ${collapsed ? 'hidden' : ''}`}>{m.label}</span>
                    </button>
                  </li>
                ))}
                {/* push any bottom items here if needed */}
              </ul>
            </nav>
            <div className="mt-auto pt-4">
              <button
                onClick={handleLogout}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded ${collapsed ? 'justify-center' : ''} text-gray-700 hover:bg-gray-100`}
              >
                <i className="ri-logout-box-line text-lg" />
                <span className={`font-medium ${collapsed ? 'hidden' : ''}`}>Logout</span>
              </button>
            </div>
          </aside>

          {/* overlay for small screens */}
          {sidebarOpen && <div className="fixed inset-0 z-30 bg-black opacity-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

          {/* Main content centered */}
          <main className="flex-1 ml:ml-64 flex justify-center">
            <div className="w-full max-w-4xl">{renderContent()}</div>
          </main>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
