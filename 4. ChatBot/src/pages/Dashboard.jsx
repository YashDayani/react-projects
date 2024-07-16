import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from localStorage on logout
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      {/* Dashboard content */}
    </div>
  );
};

export default Dashboard;
