import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './navigation.css';
import { useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const [isNavbarCollapsed, setNavbarCollapsed] = useState(true);

  useEffect(() => {
    console.log('Location changed');
    // Collapse the navbar when a link is clicked
    setNavbarCollapsed(true);
  }, [location]);

  // Function to toggle the navbar state
  const toggleNavbar = () => {
    setNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <nav id="menu" className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
    <div className="container">
      <div className="navbar-header">
      <a className="navbar-brand"><Link to="/">POSOSTA</Link></a>
      </div>

      <div className={`collapse navbar-collapse${isNavbarCollapsed ? '' : ' show'}`} id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav navbar-right">
          <li className="navbar-item"><Link to="/">Home</Link></li>
          <li><a href="#about" className="page-scroll">About</a></li>
          <li><a href="#services" className="page-scroll">Services</a></li>
          <li><a href="#team" className="page-scroll">Team</a></li>
          <li><a href="#contact" className="page-scroll">Contact</a></li>
          <li className="navbar-item"><Link to="/login">Sign Up / Register</Link></li>
          <li className="navbar-item"><Link to="/shop">Manage Shop</Link></li>
        </ul>
      </div>
      <button type="button" className="navbar-toggler" onClick={toggleNavbar}>
        <span className="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
);
};

export default Navigation;
