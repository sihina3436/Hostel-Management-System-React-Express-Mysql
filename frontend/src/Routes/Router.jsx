import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Home';
import App from '../App';
import Login from '../Login';
import Register from '../Register';
import UserDashboard from '../dashboard/user/main/UserDashboard';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '/', element: <Home /> },
            {path: '/login', element: <Login /> },
            {path: '/register', element: <Register /> },
            {path: '/dashboard', element: <UserDashboard /> },
        ],
    }
]);

export default Router;