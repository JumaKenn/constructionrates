import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import Cards from './Cards';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Cards />


      </header>
    </div>
  );
}

export default App;
