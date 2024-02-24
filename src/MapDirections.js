import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const MapDirections = ({ apiKey }) => {
  const [response, setResponse] = useState(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const directionsCallback = (res) => {
    if (res !== null) {
      setResponse(res);
    }
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleDirectionsRequest = () => {
    if (origin !== '' && destination !== '') {
      const directionsServiceOptions = {
        destination,
        origin,
        travelMode: 'DRIVING',
      };

      // Send request only if both origin and destination are provided
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(directionsServiceOptions, directionsCallback);
    }
  };

  const mapContainerStyle = {
    width: '50vh',
    height: "50vh",
    margin: '100px', // Adjust the margin to control the spacing around the map
  };

  const center = {
    lat: 30.601433,
    lng: -96.314464,
  };

  return (
    <div>
      <div>
        <label>Start Address:</label>
        <input type="text" value={origin} onChange={(e) => handleInputChange(e, setOrigin)} />
      </div>
      <div>
        <label>End Address:</label>
        <input type="text" value={destination} onChange={(e) => handleInputChange(e, setDestination)} />
      </div>
      <button onClick={handleDirectionsRequest}>Get Directions</button>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
          {response !== null && <DirectionsRenderer options={{ directions: response }} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapDirections;
