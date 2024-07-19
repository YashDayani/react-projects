// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute />} />
        <Route path="/" element={<NavigateIfAuthenticated />} /> {/* Default redirect to login */}
      </Routes>
    </Router>
  );
};

export default App;

const ProtectedRoute = () => {
  // Check if token exists in localStorage
  const token = localStorage.getItem('token');

  if (token) {
    // Render dashboard component or protected content
    return <Dashboard />;
  } else {
    // Redirect to login page if no token found
    return <Navigate to="/login" replace />;
  }
};

const NavigateIfAuthenticated = () => {
  // Check if token exists in localStorage
  const token = localStorage.getItem('token');

  if (token) {
    // Redirect to dashboard or protected route if token is valid
    return <Navigate to="/dashboard" replace />;
  } else {
    // Redirect to login page if no token found
    return <Navigate to="/login" replace />;
  }
};
