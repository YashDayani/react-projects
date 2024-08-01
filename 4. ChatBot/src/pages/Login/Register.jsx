import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './pages.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('password');
  const [iconClass, setIconClass] = useState('eyeOff');
  const passwordInputRef = useRef(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, formData);
      if (response.status === 201) {
        alert('Registration successful');
        navigate('/login');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Registration failed. Please try again.');
      } else if (error.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    if (type === 'password') {
      setType('text');
      setIconClass('eye');
    } else {
      setType('password');
      setIconClass('eyeOff');
    }
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  return (
    <div className='login-regis'>
      <div className="login-regis-wrapper">
      <h1>Create an account</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='input-box'>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username}
            onChange={handleChange} 
            required 
          />
          <span>Username</span>
        </div>
        <div className='input-box'>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange} 
            required 
          />
          <span>Email</span>
        </div>
        <div className='input-box'>
          <input 
            type={type} 
            id="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange} 
            required 
            minLength="6"
            ref={passwordInputRef}
          />
          <span>Password</span>
          <div 
            id="password-toggle" 
            className={iconClass} 
            onClick={handleToggle}
          ></div>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p className='tosDesc'>By continuing, you agree <a href="terms">Consumer Terms</a> and <br /> <a href="policy">Usage Policy</a> of Mavrick Corp</p>
    </div>
    </div>
  );
};

export default Register;
