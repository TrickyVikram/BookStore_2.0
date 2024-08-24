import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const isLoggedIn = !!localStorage.getItem('token');
    
    return (
        
        <Router>
            <Navbar isLoggedIn={isLoggedIn} />
            <div className="container mt-4">
                <Routes>
                <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<BookList />} />
                    {isLoggedIn ? (
                        <>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/logout" element={<div>Logging out...</div>} />
                        </>
                    ) : (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
