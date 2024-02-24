// MapDirections.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const MapDirections = React.forwardRef(({ apiKey, origin, destination, buttonClicked, onMapUpdate }, ref) => {
  const [response, setResponse] = useState(null);

  const directionsCallback = (res) => {
    if (res !== null) {
      setResponse(res);
      // Additional callback logic if needed
    }
  };

  const handleDirectionsRequest = () => {
    if (origin !== '' && destination !== '') {
      const directionsServiceOptions = {
        destination,
        origin,
        travelMode: 'DRIVING',
      };

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(directionsServiceOptions, directionsCallback);
    }
  };

  useEffect(() => {
    if (buttonClicked) {
      // Call handleDirectionsRequest only when buttonClicked is true
      handleDirectionsRequest();
      // Reset buttonClicked state to false after processing
      onMapUpdate();
    }
  }, [origin, destination, buttonClicked, onMapUpdate]);

  const mapContainerStyle = {
    width: '50vh',
    height: '50vh',
    margin: '100px',
  };

  const center = {
    lat: 30.601433,
    lng: -96.314464,
  };

  return (
    <div>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
          {response !== null && (
            <DirectionsRenderer
              options={{ directions: response, panel: document.getElementById('directions-panel') }}
            />
          )}
        </GoogleMap>
      </LoadScript>
      <div id="directions-panel" style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc' }}></div>
    </div>
  );
});

export default MapDirections;
