// App.js
import React, { useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import MapDirections from "./MapDirections";
import "bootstrap/dist/css/bootstrap.min.css";
import MapDirectionsApi from "./goApiCall";

const apiKey = 'AIzaSyDpMGWebCqbGtD7SJHts4EKRQJaw6kzoPU';

function App() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (origin === '' || destination === '') {
      console.error('Both origin and destination are required');
      return;
    }

    console.log('Origin:', origin);
    console.log('Destination:', destination);

    setButtonClicked(true);
  };

  const handleMapUpdate = () => {
    setButtonClicked(false);
  };

  return (
      <div className="container mt-5">
      <h1 className="text-center">Team Tony Hawk</h1>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="origin">Origin:</label>
              <input
                type="text"
                className="form-control"
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="destination">Destination:</label>
              <input
                type="text"
                className="form-control"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Get Route
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <MapDirections
            apiKey={apiKey}
            origin={origin}
            destination={destination}
            buttonClicked={buttonClicked}
            onMapUpdate={handleMapUpdate}
          />
        </div>

        <div className="col-md-6">
          <MapDirectionsApi
            apiKey={apiKey}
            origin={origin}
            destination={destination}
            buttonClicked={buttonClicked}
            onMapUpdate={handleMapUpdate}
          />
        </div>

      </div>
    </div>
  );
}

export default App;