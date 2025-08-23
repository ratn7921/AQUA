import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

export default function LocationPicker({ value, onChange }) {
  const [position, setPosition] = useState(value || [32.64, -16.9]);

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onChange && onChange([e.latlng.lat, e.latlng.lng]);
    },
  });

  return (
    <MapContainer center={position} zoom={12} style={{ height: '40vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} />
    </MapContainer>
  );
}
