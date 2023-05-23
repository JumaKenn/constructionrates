import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Cards from './Cards';
import ComponentSearch from './rates';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import MarketplaceRegistrationForm from './MarketplaceRegistrationForm';
import MarketPlace from './MarketPlace';

import { FaArrowAltCircleUp } from 'react-icons/fa';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (!loggedIn) {
      navigate('/login');
    } else {
      navigate('/home');
    }
  }, []);

  const handleClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    document.querySelector('.container').classList.toggle('show-rates');
  };

  const [isSellerRegistered, setIsSellerRegistered] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  // Check if the seller is registered upon component mount
  // React.useEffect(() => {
  //   const checkSellerRegistration = async () => {
  //     try {
  //       const response = await axios.get('/api/seller-registration');
  //       setIsSellerRegistered(response.data.isRegistered);
  //     } catch (error) {
  //       console.error('Error checking seller registration:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkSellerRegistration();
  // }, []);

  // Render loading state while checking seller registration
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

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
            <Route path="/sellerregistration" element={<MarketplaceRegistrationForm />} />
            <Route path="/marketplace" element={<MarketPlace />} />
           
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
