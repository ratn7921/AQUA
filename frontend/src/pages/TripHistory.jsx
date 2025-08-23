// cool feature
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function TripHistory() {
  const [trips, setTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/trips')
      .then(res => setTrips(res.data))
      .catch(() => setError('Failed to load trips.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center text-white mt-10">Loading trips...</div>;
  if (error) return <div className="text-center text-red-400 mt-10">{error}</div>;

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">My Trip History</h2>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {trips.map(trip => (
          <div key={trip._id} className="bg-white/10 rounded p-4 shadow flex flex-col mb-4">
            <div className="font-semibold">Trip: {trip._id}</div>
            <div className="text-xs">Start: {trip.startTime ? new Date(trip.startTime).toLocaleString() : 'N/A'}</div>
            <div className="text-xs">End: {trip.endTime ? new Date(trip.endTime).toLocaleString() : 'N/A'}</div>
            <button
              onClick={() => setSelectedTripId(selectedTripId === trip._id ? null : trip._id)}
              className="mt-2 bg-teal-600 px-3 py-1 rounded hover:bg-teal-700"
            >
              {selectedTripId === trip._id ? 'Hide Path' : 'View Path'}
            </button>
            {selectedTripId === trip._id && trip.path && trip.path.length > 0 && (
              <div className="mt-4">
                <MapContainer
                  center={[trip.path[0].lat, trip.path[0].lng]}
                  zoom={15}
                  scrollWheelZoom={true}
                  style={{ height: '300px', width: '100%', borderRadius: '12px' }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {trip.path.length > 1 && (
                    <Polyline positions={trip.path.map(p => [p.lat, p.lng])} color="cyan" />
                  )}
                  {trip.path.map((pos, idx) => (
                    <CircleMarker
                      key={idx}
                      center={[pos.lat, pos.lng]}
                      radius={idx === 0 || idx === trip.path.length - 1 ? 8 : 5}
                      pathOptions={{
                        color: idx === 0 ? 'limegreen' : idx === trip.path.length - 1 ? 'red' : 'blue',
                        fillColor: idx === 0 ? 'limegreen' : idx === trip.path.length - 1 ? 'red' : 'blue',
                        fillOpacity: 0.8
                      }}
                    >
                      <Tooltip direction="top" offset={[0, -5]} opacity={1} permanent>
                        {idx === 0
                          ? 'Start'
                          : idx === trip.path.length - 1
                          ? 'End'
                          : `${pos.lat.toFixed(5)}, ${pos.lng.toFixed(5)}`}
                      </Tooltip>
                    </CircleMarker>
                  ))}
                </MapContainer>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
