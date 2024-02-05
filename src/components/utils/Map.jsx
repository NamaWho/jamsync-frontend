import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ user }) => {
  const position = [user.location.geojson.coordinates[1], user.location.geojson.coordinates[0]];

  return (
    <MapContainer center={position} zoom={13} className='h-64 w-64'>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {user.location.city}, {user.location.country}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
