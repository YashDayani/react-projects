import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Main from '../components/Main/Main';
import './Dasboard.css';
import axios from 'axios';

const Dashboard = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const fetchSearchHistory = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }
      const response = await axios.get('http://localhost:5000/api/history', {
        headers: {
          'x-auth-token': token
        }
      });
      setSearchHistory(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching search history:', error.response ? error.response.data : error.message);
      setError('Failed to load search history. Please log in again.');
    } finally {
      setLoading(false);
      setUpdateTrigger(prev => prev + 1);
    }
  };

  useEffect(() => {
    fetchSearchHistory();
  }, []);

  const handleNewChat = () => {
    // Logic for starting a new chat
    fetchSearchHistory();
  };

  const handleSendMessage = async (message) => {
    // Logic for sending a message
    await fetchSearchHistory();
  };

  return (
    <div className='MainPage'>
      <Sidebar 
        key={updateTrigger}
        fetchSearchHistory={fetchSearchHistory}
        searchHistory={searchHistory}
        loading={loading}
        error={error}
        onNewChat={handleNewChat}
      />
      <Main onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Dashboard;