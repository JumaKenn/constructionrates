import './App.css';
import Navbar from './Navbar';
import Cards from './Cards';
import { Routes, Route } from 'react-router-dom';
import ComponentSearch from './rates';
import { Link } from 'react-router-dom';
import { FaArrowAltCircleUp } from 'react-icons/fa';



function App() {
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
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <div className="container">
        <div className="cards" >
          <Cards />
        </div>
        <div className="rates">
          <FaArrowAltCircleUp className="back-btn" onClick={() => handleClick(null)} />
          <Routes>
            <Route path="rates" element={<ComponentSearch />} />
          </Routes>
        </div>
      </div>


    </div>
  );
}

export default App;
