import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

const MapDirectionsApi = React.forwardRef(({ apiKey, origin, destination }, ref) => {
  const [response, setResponse] = useState(null);

  const handleDirectionsRequest = async () => {
    try {
      const url = `http://localhost:8080/directions?start=${encodeURIComponent(origin)}&end=${encodeURIComponent(destination)}`;
      const res = await fetch(url);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching directions:', error);
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
          {response !== null && (
            <DirectionsRenderer
              options={{ directions: response }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
});

export default MapDirectionsApi;
