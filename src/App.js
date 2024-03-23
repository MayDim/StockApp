import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StockApp from './components/StockApp/StockApp';
import StockDetails from './components/StockDetails/StockDetails';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<StockApp />} />
          <Route exact path="/stock/:ticker" element={<StockDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
