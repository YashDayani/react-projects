import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar'
import Main from '../components/Main/Main'
import './Dasboard.css'

const Dashboard = () => {

  return (
    <div className='MainPage'>
      <Sidebar />
      <Main />
    </div>
  );
};

export default Dashboard;
