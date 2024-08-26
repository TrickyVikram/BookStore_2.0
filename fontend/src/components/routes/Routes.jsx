import React from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import BookList from './components/BookList';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Paid from './components/Paid';



const Routess = () => {
    const isLoggedIn = !!localStorage.getItem('token');
  return (

    <BrowserRouter>
    
       <Router>
            <Navbar isLoggedIn={isLoggedIn} />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<BookList />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/paid" element={<Paid />} />
                    <Route path="/logout" element={<div>Logging out...</div>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    </BrowserRouter>
  
  )
}

export default Routess
