import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://django-server-production-5811.up.railway.app/apis/register/', {
        username: username,
        email: email,
        password: password,
      });
      navigate('/login')

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
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {errorMessage && ( // Display error message if it exists
        <div className="error-message">
          {errorMessage}
        </div>
      )}
    </div>

  );
};

export default RegisterForm;
