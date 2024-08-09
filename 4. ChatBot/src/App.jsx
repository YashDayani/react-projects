import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import History from './pages/History/History';
import NotFound from './pages/NotFound/NotFound';

import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute component={Main} />} />
        <Route path="/history" element={<ProtectedRoute component={History} />} />
        <Route path="/" element={<NavigateIfAuthenticated />} /> {/* Default redirect to login */}
        <Route path="*" element={<NotFound />} /> {/* 404 Not Found route */}
      </Routes>
    </Router>
  );
};

export default App;

const ProtectedRoute = ({ component: Component }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (token) {
    const showSidebar = location.pathname === '/dashboard' || location.pathname === '/history';

    return (
      <div className='MainPage' style={{ display: 'flex' }}>
        {showSidebar && <Sidebar />}
        <div className='MainPage' style={{ flex: 1 }}>
          <Component />
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
};

const NavigateIfAuthenticated = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};
