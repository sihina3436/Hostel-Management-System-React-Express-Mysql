import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Home';
import App from '../App';
import Login from '../Login';
import Register from '../Register';
import StudentDashboard from '../Components/Dashboard/StudentDashboard';

const Router = createBrowserRouter([
    // Student dashboard as a top-level route so it renders without App (no NavBar/Footer)
    { path: '/student-dashboard', element: <StudentDashboard /> },

    // Main app layout (includes NavBar and Footer) with nested routes
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
        ],
    },
]);

export default Router;