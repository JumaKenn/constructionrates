import React from 'react';
import './Cards.css';

function Cards() {
    return (
        <div className="cards">
            <a href="/rates" className="card-link">
                <div className="card">
                    <h2>Rates</h2>
                    <p>Get realtime construction rates</p>
                    <button>Learn More</button>
                </div>
            </a>
            <a href="/shop" className="card-link">
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
