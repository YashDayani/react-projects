import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import './pages.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('password');
  const [iconClass, setIconClass] = useState('eyeOff');
  const passwordInputRef = useRef(null); // Use useRef to get a reference to the password input element

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
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, formData);
      if (response.data && response.data.token) {
        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);
        // Successful login
        navigate(response.data.redirectUrl || '/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setError(error.response.data.message || 'An error occurred. Please try again.');
      } else if (error.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
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
    // Focus back on the password input element
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  };

  return (
    <div className='login-regis'>
      <h1>Welcome back</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
            ref={passwordInputRef} // Attach the ref to the password input element
          />
          <span>Password</span>
          <div 
            id="password-toggle" 
            className={iconClass} 
            onClick={handleToggle}
          ></div>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className='link-container'>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default Login;
