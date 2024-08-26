import React from 'react';
import { Routes, Route , Navigate } from 'react-router-dom';
import BookList from '../components/BookList';
import Login from '../components/Login';
import Register from '../components/Register';
import Profile from '../components/Profile';
import Paid from '../components/Paid';

const AppRoutes = ({ isLoggedIn }) => {
    return (
        <Routes>
            {/* Common routes */}
            <Route path="/" element={<BookList />} />
            {/* Conditional routes based on login status */}
            <Route path="*" element={<Navigate to="/" />} />
            {isLoggedIn ? (
                <>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/paid" element={<Paid />} />
                </>
            ) : (
                <>
                 
                    <Route path="/logout" element={<div>Logging out...</div>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </>
            )}
        </Routes>
    );
};

export default AppRoutes;
