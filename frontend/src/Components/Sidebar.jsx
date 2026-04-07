import React, { useMemo, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  RiBuilding2Fill,
  RiHotelFill,
  RiUser3Fill,
  RiTeamFill,
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiMenuFold2Line,
  RiMenuUnfold2Line,
  RiLogoutCircleLine,
} from "react-icons/ri";

const ADMIN_BASE = "/admin-dashboard";

const Sidebar = () => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [openSection, setOpenSection] = useState(0);

  const menu = useMemo(
    () => [
      {
        title: "Hostel",
        key: "hostel",
        icon: <RiBuilding2Fill className="text-xl" />,
        links: [
          { name: "Create Hostel", path: `${ADMIN_BASE}/hostel/create` },
          { name: "All Hostels", path: `${ADMIN_BASE}/hostel/all` },
        ],
      },
      {
        title: "Rooms",
        key: "rooms",
        icon: <RiHotelFill className="text-xl" />,
        links: [
          { name: "Create Room", path: `${ADMIN_BASE}/room/create` },
          { name: "All Rooms", path: `${ADMIN_BASE}/room/all` },
          { name: "Available Rooms", path: `${ADMIN_BASE}/room/available` },
          { name: "Assign Students", path: `${ADMIN_BASE}/room/assign` },
        ],
      },
      {
        title: "Students",
        key: "students",
        icon: <RiUser3Fill className="text-xl" />,
        links: [
          { name: "Add Student", path: `${ADMIN_BASE}/student/add` },
          { name: "All Students", path: `${ADMIN_BASE}/student/all` },
          { name: "Manage Students", path: `${ADMIN_BASE}/student/manage` }, // ✅ matches your router
        ],
      },
      {
        title: "Staff",
        key: "staff",
        icon: <RiTeamFill className="text-xl" />,
        links: [
          { name: "Add Staff", path: `${ADMIN_BASE}/staff/add` },
          { name: "All Staff", path: `${ADMIN_BASE}/staff/all` },
        ],
      },
    ],
    []
  );

  // ✅ Auto-open correct section based on current route (matches theme + UX)
  useEffect(() => {
    if (collapsed) return;

    const idx = menu.findIndex((sec) =>
      sec.links.some((l) => location.pathname.startsWith(l.path))
    );

    if (idx !== -1) setOpenSection(idx);
  }, [location.pathname, collapsed, menu]);

  const toggleSection = (idx) => {
    if (collapsed) return;
    setOpenSection((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <aside
      className={[
        "h-screen sticky top-0 z-40",
        "bg-slate-950/80 backdrop-blur",
        "border-r border-white/10",
        "shadow-[0_20px_60px_rgba(0,0,0,0.35)]",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-80",
      ].join(" ")}
    >
      {/* Accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />

      {/* Brand */}
      <div className="h-20 px-4 flex items-center justify-between gap-3 border-b border-white/10">
        <div
          className={[
            "flex items-center gap-3",
            collapsed ? "justify-center w-full" : "",
          ].join(" ")}
        >
          <div className="h-11 w-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 grid place-items-center flex-shrink-0">
            <RiBuilding2Fill className="text-2xl text-emerald-200" />
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <div className="text-xs text-white/55 font-semibold tracking-wide">
                ADMIN PANEL
              </div>
              <div className="text-base font-extrabold truncate text-white">
                Hostel MS
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed((s) => !s)}
          className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 text-white/80
                     grid place-items-center hover:bg-white/10 hover:text-white transition"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? (
            <RiMenuUnfold2Line className="text-xl" />
          ) : (
            <RiMenuFold2Line className="text-xl" />
          )}
        </button>
      </div>

      {/* Menu */}
      <nav className="px-3 py-4 overflow-y-auto h-[calc(100vh-8.5rem)]">
        {menu.map((section, idx) => {
          const isOpen = openSection === idx;

          return (
            <div key={section.key} className="mb-2">
              <button
                onClick={() => toggleSection(idx)}
                className={[
                  "w-full flex items-center gap-3",
                  "px-3 py-3 rounded-2xl",
                  "bg-white/0 hover:bg-white/5",
                  "border border-transparent hover:border-white/10",
                  "transition",
                  "focus:outline-none focus:ring-2 focus:ring-emerald-500/30",
                ].join(" ")}
                aria-expanded={isOpen}
              >
                <span className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 grid place-items-center flex-shrink-0">
                  <span className="text-white/85">{section.icon}</span>
                </span>

                {!collapsed && (
                  <>
                    <span className="flex-1 text-left font-extrabold text-white/90">
                      {section.title}
                    </span>
                    <span className="text-white/50">
                      {isOpen ? (
                        <RiArrowDownSLine className="text-lg" />
                      ) : (
                        <RiArrowRightSLine className="text-lg" />
                      )}
                    </span>
                  </>
                )}
              </button>

              {!collapsed && isOpen && (
                <div className="mt-2 ml-[52px] flex flex-col gap-1">
                  {section.links.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className={({ isActive }) =>
                        [
                          "px-3 py-2.5 rounded-2xl text-sm font-semibold",
                          "border transition",
                          "focus:outline-none focus:ring-2 focus:ring-emerald-500/30",
                          isActive
                            ? "bg-emerald-500/15 border-emerald-500/20 text-emerald-200"
                            : "bg-white/0 border-white/0 text-white/70 hover:bg-white/5 hover:border-white/10 hover:text-white",
                        ].join(" ")
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="h-16 px-4 border-t border-white/10 flex items-center justify-between">
        {!collapsed ? (
          <div className="text-xs text-white/55 font-semibold">
            © {new Date().getFullYear()} Hostel MS
          </div>
        ) : (
          <div className="text-xs text-white/55 font-semibold">©</div>
        )}

        {/* optional placeholder logout */}
        <button
          type="button"
          className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 text-white/70
                     grid place-items-center hover:bg-rose-500/15 hover:border-rose-500/20 hover:text-rose-200 transition"
          title="Logout"
          aria-label="Logout"
          onClick={() => {
            // hook your admin logout here if you have it
            // dispatch(logoutAdmin());
          }}
        >
          <RiLogoutCircleLine className="text-xl" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;