import logo from './logo.svg';
import './App.css';

import React from "react";
import { Loader } from "@googlemaps/js-api-loader";
import MapDirections from './MapDirections';
const apiKey = 'AIzaSyDpMGWebCqbGtD7SJHts4EKRQJaw6kzoPU';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MapDirections apiKey={apiKey} />
        
      </header>
    </div>
  );
}

export default App;
