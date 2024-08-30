import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes'; // Import the routes file
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Notification from './components/notification/Notification';

const App = () => {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <>
       <Notification />
            <Router basename="/">
                
                <Navbar isLoggedIn={isLoggedIn} /> {/* Pass the isLoggedIn prop */}
                <AppRoutes isLoggedIn={isLoggedIn} />
            </Router>


        </>
    );
};

export default App;
