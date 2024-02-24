// App.js
import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import MapDirections from "./MapDirections";
import "bootstrap/dist/css/bootstrap.min.css";
import MapDirectionsApi from "./goApiCall";
import dangerousRoadsData from "./dangerousRoads.json";

const apiKey = 'AIzaSyDpMGWebCqbGtD7SJHts4EKRQJaw6kzoPU';

function App() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [dangerousRoads, setDangerousRoads] = useState(["Harvey Mitchell"]);
  const [dangerousRoadFound, setDangerousRoadFound] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (origin === '' || destination === '') {
      console.error('Both origin and destination are required');
      return;
    }

    console.log('Origin:', origin);
    console.log('Destination:', destination);

    // Check if the destination is in the list of dangerous roads
    const isDangerousRoad = dangerousRoads.includes(destination);
    setDangerousRoadFound(isDangerousRoad);

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
      </div>
      {dangerousRoadFound ? (
        <p className="text-danger">Dangerous road found!</p>
      ) : (
        <p>No Dangerous roads found along route. Happy traveling!</p>
      )}
    </div>
  );
}

export default App;
