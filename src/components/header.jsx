import React from "react";
import { Link } from 'react-router-dom';
import './Cards.css';

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <div className="cards">
                  <Link to="/rates" className="card-link">
                    <div className="card">
                      <h2>Rates</h2>
                      <p>Get realtime construction rates</p>

                    </div>
                  </Link>
                  <Link to="/ecommerce" className="card-link">
                    <div className="card">
                      <h2>Shop with Us</h2>
                      <p>Buy from hardwares near you</p>
                      <button>Shop Now</button>
                    </div>
                  </Link>
                </div>
                {/* <h1>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                <a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Learn More
                </a>{" "} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
