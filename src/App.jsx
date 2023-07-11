import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import "./App.css";
import ComponentSearch from './rates';

import Cards from './cards';
import Example from "./suppliers";
import LoginRegistrationPage from './login&registration/login';
import Register from "./login&registration/register";
import ShopDashboard from "./shop/shopdashboard";
import CreateShopPage from './shop/entry';


export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function App() {

  const location = useLocation();


  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);


  return (
    <div>
      <div className='navigation'><Navigation /></div>
      <div className='othercomponents'>

        <Routes>
          {/* Render Rates component when the URL is "/rates" */}
          <Route path="/rates" element={<ComponentSearch />} />
          <Route path="/ecommerce" element={<Cards />} />
          <Route path="/suppliers" element={<Example />} />
          <Route path='/login' element={<LoginRegistrationPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/shop/*' element={<ShopDashboard />} />
          <Route path='/entry' element={<CreateShopPage />} />

          {/* Render Header component for all other URLs */}
          {location.pathname !== '/rates' && (
            <Route path="/" element={<Header data={landingPageData.Header} />} />
          )}
        </Routes>

        {location.pathname !== '/rates' && location.pathname !== '/ecommerce' && location.pathname !== '/suppliers' && location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/shop' && location.pathname !== '/entry' && (
          <div>

            <About data={landingPageData.About} />
            <Services data={landingPageData.Services} />


            <Team data={landingPageData.Team} />
            <Contact data={landingPageData.Contact} />

          </div>
        )}
      </div>





    </div>

  );
};

export default App;
