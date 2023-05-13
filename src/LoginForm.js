import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css'; // Import the CSS file for the LoginForm component

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://django-server-production-5811.up.railway.app/apis/login/', {
        username: username,
        password: password,
      });

      console.log(response.data); // Handle success response
    } catch (error) {
      console.log(error.response.data); // Handle error response
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
      <div className="reg-item">
        <button><Link to="/register">No account? Click to register</Link></button>
      </div>
    </div>
  );
};

export default LoginForm;
