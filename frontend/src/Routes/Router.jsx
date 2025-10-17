import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Home';
import App from '../App';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '/', element: <Home /> },
        ],
    }
]);

export default Router;