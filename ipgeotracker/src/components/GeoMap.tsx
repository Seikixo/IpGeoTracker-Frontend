import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useGeoMap } from '../hooks/useGeoMapContext';
import React from 'react';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});


function GeoMap() {
  const { location, city, region, country } = useGeoMap();
  const coords = location.split(',').map(Number) as [number, number];

  return (
    <MapContainer
      center={coords}
      zoom={13}
      scrollWheelZoom={false}
      className="h-64 w-full rounded"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      <Marker position={coords}>
        <Popup>
          {city}, {region}, {country}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default React.memo(GeoMap);
