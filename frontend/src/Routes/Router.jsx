import { createBrowserRouter } from 'react-router-dom';
import Home from '../Home';
import App from '../App';
import Login from '../Login';
import Register from '../Register';
import StudentDashboard from '../Pages/StudentDashboard';

const Router = createBrowserRouter([
    // Student Dashboard Route
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