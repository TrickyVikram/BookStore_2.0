import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes'; // Import the routes file
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <Router
            basename="/" // This is the base URL for the app
            forceRefresh={false} // If true, the page will do a full refresh on page navigation
        >
            <Navbar isLoggedIn={isLoggedIn} /> {/* Pass the isLoggedIn prop */}
            <AppRoutes />
        </Router>
    );
};

export default App;
