import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Home";
import Login from "../Login";
import Register from "../Register";
import UserDashboard from "../dashboard/user/main/UserDashboard";
import AdminDashboard from "../dashboard/admin/AdminDashboard";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/dashboard", element: <UserDashboard /> },
      { path: "/admin-dashboard", element: <AdminDashboard /> },
    ],
  },
]);

export default Router;
