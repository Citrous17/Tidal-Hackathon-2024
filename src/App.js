import logo from './logo.svg';
import './App.css';
<<<<<<< Updated upstream
//fuck
=======

import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const defaultProps = {
  center: {
    lat: 30.601433,
    lng: -96.314464
  },
  zoom: 11
};

>>>>>>> Stashed changes
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          LETS GET THIS BREAD
        </a>
        <div style={{ height: '100vh', width: '25%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDpMGWebCqbGtD7SJHts4EKRQJaw6kzoPU" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={30.6280}
            lng={96.3344}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
      </header>
    </div>
  );
}

export default App;
