import React from 'react';
import './Cards.css';
import { Link } from 'react-router-dom';


function Cards() {
    const handleClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    document.querySelector('.container').classList.toggle('show-rates');
  };
    return (
        <div className="cards">
            <Link to="/rates" className="card-link">
                <div className="card" onClick={handleClick}>
                    <h2>Rates</h2>
                    <p>Get realtime construction rates</p>

                </div>
            </Link>
            <a href="https://django-server-production-5811.up.railway.app/commerce/" className="card-link">
                <div className="card">
                    <h2>Shop with Us</h2>
                    <p>Buy from hardwares near you</p>
                    <button>Shop Now</button>
                </div>
            </a>
        </div>
    );
}

export default Cards;
