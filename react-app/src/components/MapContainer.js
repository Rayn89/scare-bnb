import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapContainer = () => {
  
  const mapStyles = {        
    height: "500px",
    width: "500px"};
  
  const defaultCenter = {
    lat: 35.2010, lng: -91.8318
  }
  
  return (
    <LoadScript googleMapsApiKey="AIzaSyApQbHfmqkVv0ApEPVVAfWUnRxj45FViF0">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      />
    </LoadScript>
  );
}

export default MapContainer;