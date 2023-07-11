import React from "react";
import { Link } from 'react-router-dom';

export const Navigation = (props) => {
  return (
    <nav id="menu" className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <div className="navbar-header">


          <a className="navbar-brand page-scroll" href="#page-top">
            POSOSTA
          </a>{" "}
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li className="navbar-item"><Link to="/">Home</Link></li>

            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Services
              </a>
            </li>


            <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
            <li className="navbar-item"><Link to="/login">Sign Up / Register</Link></li>
            <li className="navbar-item"><Link to="/shop">Manage Shop</Link></li>


          </ul>
        </div>
        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#bs-example-navbar-collapse-1">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
};
