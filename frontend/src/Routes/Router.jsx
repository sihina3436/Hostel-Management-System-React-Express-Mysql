import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Home";
import Login from "../Components/Login";
import Register from "../Components/Register";

import UserDashboard from "../dashboard/user/main/UserDashboard";

import AdminDashboard from "../dashboard/admin/AdminDashboard";

// Admin auth (standalone pages)
import AdminLogin from "../dashboard/admin/auth/AdminLogin";
import AdminRegister from "../dashboard/admin/auth/AdminRegister";

// Admin pages
import CreateHostel from "../dashboard/admin/hostel/CreateHostel";
import GetAllHostels from "../dashboard/admin/hostel/GetAllHostels";
import UpdateHostel from "../dashboard/admin/hostel/UpdateHostel";

import CreateRoom from "../dashboard/admin/room/CreateRoom";
import GetAllRooms from "../dashboard/admin/room/GetAllRooms";
import GetAvailableRooms from "../dashboard/admin/room/GetAvailableRooms";
import AssignStudentToRoom from "../dashboard/admin/room/AssignStudentToRoom";

import CreateStudent from "../dashboard/admin/student/CreateStudent";
import GetAllStudents from "../dashboard/admin/student/GetAllStudents";
import ManageStudents from "../dashboard/admin/student/ManageStudents";

import CreateStaff from "../dashboard/admin/staff/CreateStaff";
import StaffManagement from "../dashboard/admin/staff/StaffManagement";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Admin auth (NOT nested under admin-dashboard)
      { path: "admin/login", element: <AdminLogin /> },
      { path: "admin/register", element: <AdminRegister /> },

      // User dashboard
      { path: "dashboard", element: <UserDashboard /> },

      // Admin dashboard layout
      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
        children: [
          // Optional: default page when /admin-dashboard opens
          { index: true, element: <GetAllHostels /> },

          // Hostels
          { path: "hostel/create", element: <CreateHostel /> },
          { path: "hostel/all", element: <GetAllHostels /> },

          // If UpdateHostel uses useParams(), route must include :id
          { path: "hostel/update/:id", element: <UpdateHostel /> },

          // Rooms
          { path: "room/create", element: <CreateRoom /> },
          { path: "room/all", element: <GetAllRooms /> },
          { path: "room/available", element: <GetAvailableRooms /> },
          { path: "room/assign", element: <AssignStudentToRoom /> },

          // Students
          { path: "student/add", element: <CreateStudent /> },
          { path: "student/all", element: <GetAllStudents /> },
          { path: "student/manage", element: <ManageStudents /> },

          // Staff
          { path: "staff/add", element: <CreateStaff /> },
          { path: "staff/all", element: <StaffManagement /> },
        ],
      },
    ],
  },
]);

export default Router;