import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BookList from '../components/BookList';
import Login from '../components/Login';
import Register from '../components/Register';
import Profile from '../components/Profile';
import Paid from '../components/Paid';

const AppRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" element={<BookList />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/paid" element={<Paid />} />
            <Route exact path="/logout" element={<div>Logging out...</div>} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
        </Routes>
    );
};

export default AppRoutes;
