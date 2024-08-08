import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import History from './pages/History/History';
import NotFound from './pages/NotFound/NotFound';

import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
        <Route path="/history" element={<ProtectedRoute component={History} />} />
        <Route path="/" element={<NavigateIfAuthenticated />} /> {/* Default redirect to login */}
        <Route path="*" element={<NotFound />} /> {/* 404 Not Found route */}
      </Routes>
    </Router>
  );
};

export default App;

const ProtectedRoute = ({ component: Component }) => {
  // Check if token exists in localStorage
  const token = localStorage.getItem('token');

  if (token) {
    // Render the passed component or protected content
    return <Component />;
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