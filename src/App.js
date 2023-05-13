import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Navbar from './Navbar';
import Cards from './Cards';
import ComponentSearch from './rates';
import { FaArrowAltCircleUp } from 'react-icons/fa';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (!loggedIn) {
      navigate('/login');
    }
    else {
      navigate('/home')
    }
  }, []);

  const handleClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    document.querySelector('.container').classList.toggle('show-rates');
  };

  return (
    <div className="App">
      <Navbar />
      <header className="App-header"></header>
      <div className="container">

        <div className="rates">
          <FaArrowAltCircleUp className="back-btn" onClick={() => handleClick(null)} />
        </div>
        <div className='routess'>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/home" element={<Cards />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/rates" element={<ComponentSearch />} />
          </Routes>
        </div>
      </div>
    </div>

  );
}

export default App;
