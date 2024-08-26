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
            basename="/"
            forceRefresh={false}
        >
            <Navbar isLoggedIn={isLoggedIn} />
            <AppRoutes />
        </Router>
    );
};

export default App;
