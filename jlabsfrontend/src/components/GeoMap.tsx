import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface GeoMapProps {
  location: string; // e.g. "14.5995,120.9842"
  city?: string;
  region?: string;
  country?: string;
}

export default function GeoMap({ location, city, region, country }: GeoMapProps) {
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
