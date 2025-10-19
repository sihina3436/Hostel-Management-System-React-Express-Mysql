import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Home';
import App from '../App';
import Login from '../Login';
import Register from '../Register';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '/', element: <Home /> },
            {path: '/login', element: <Login /> },
            {path: '/register', element: <Register /> },
        ],
    }
]);

export default Router;