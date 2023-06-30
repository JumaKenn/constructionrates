import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './LoginForm.css'; // Import the CSS file for the LoginForm component

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://django-server-production-5811.up.railway.app/apis/login/', {
        username: username,
        password: password,
      });
      navigate('/home')


      console.log(response.data); // Handle success response
    } catch (error) {
      if (error.response) {
        console.log(error.response.data); // Handle error response
        setErrorMessage(error.response.data.message); // Store error message in state
      } else {
        console.log('An error occurred:', error.message); // Handle generic error
        setErrorMessage('An error occurred. Please try again.'); // Store generic error message in state
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && ( // Display error message if it exists
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      <div className="reg-item">
        <button><Link to="/register">No account? Click to register</Link></button>
      </div>
      <div className="reg-item">
        <button><Link to="/registershop">Click to register your shop</Link></button>
      </div>
    </div>
  );
};

export default LoginForm;
