import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const MapDirections = React.forwardRef(({ apiKey, origin, destination }, ref) => {
  const [response, setResponse] = useState(null);

  const directionsCallback = (res) => {
    if (res !== null) {
      setResponse(res);
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
    // Call handleDirectionsRequest whenever origin or destination changes
    handleDirectionsRequest();
  }, [origin, destination]);

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
          {response !== null && <DirectionsRenderer options={{ directions: response }} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
});

export default MapDirections;
