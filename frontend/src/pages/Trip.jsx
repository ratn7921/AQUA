// part of the main cool feature
// --- src/pages/Trip.jsx ---
import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function CenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 16);
  }, [position, map]);
  return null;
}

export default function Trip() {
  const [path, setPath] = useState([]);
  const [watchId, setWatchId] = useState(null);
  const [tripId, setTripId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [livePos, setLivePos] = useState(null);
  const [showCoords, setShowCoords] = useState(false);
  const mapRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    return () => navigator.geolocation.clearWatch(watchId);
  }, [watchId]);

  const startTrip = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            setLivePos([latitude, longitude]);
            setPath([[latitude, longitude]]);
            setShowCoords(false);
            const res = await axios.post('/trips/start', {
              startLocation: {
                lat: latitude,
                lng: longitude,
                timestamp: new Date(),
              },
            });
            setTripId(res.data._id);
            setMessage('Trip started!');
          },
          () => setError('Unable to get location.'),
          { enableHighAccuracy: true }
        );
      } else {
        setError('Geolocation not supported');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to start trip.');
    } finally {
      setLoading(false);
    }
  };

  const startTracking = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported');
    setShowCoords(true);
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLivePos([latitude, longitude]);
        setPath((prev) => [...prev, [latitude, longitude]]);
      },
      () => setError('Unable to get live location.'),
      { enableHighAccuracy: true }
    );
    setWatchId(id);
  };

  const stopTracking = async () => {
    navigator.geolocation.clearWatch(watchId);
    setShowCoords(false);
    await endTrip();
    navigate('/trip-history');
  };

  const endTrip = async () => {
    setLoading(true);
    setError('');
    setMessage('');
    try {
      if (tripId && path.length > 0) {
        await axios.put(`/trips/${tripId}/path`, {
          path: path.map(([lat, lng]) => ({ lat, lng, timestamp: new Date() }))
        });
      }
      await axios.put(`/trips/end/${tripId}`);
      setTripId(null);
      setMessage('Trip ended!');
      setTimeout(() => navigate('/trip-history'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to end trip.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="aqua-section text-white px-4 py-6 max-w-6xl mx-auto relative">
      {/* Live Coordinates */}
      {showCoords && livePos && (
        <div className="absolute top-4 left-4 bg-black/80 px-4 py-2 rounded-md text-green-400 text-sm shadow-md z-10">
          <strong>Live:</strong> {livePos[0].toFixed(6)}, {livePos[1].toFixed(6)}
        </div>
      )}

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-4">⛴️ Ship Tracker</h2>

      {/* Message and Error */}
      {message && (
        <div className="text-green-400 text-center font-medium mb-2">{message}</div>
      )}
      {error && (
        <div className="text-red-400 text-center font-medium mb-2">{error}</div>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {!tripId ? (
          <button
            onClick={startTrip}
            className="btn-main px-6 py-2"
            disabled={loading}
          >
            {loading ? 'Starting...' : 'Start Trip'}
          </button>
        ) : (
          <>
            <button
              onClick={startTracking}
              className="btn-main px-6 py-2"
            >
              Start Tracking
            </button>
            <button
              onClick={stopTracking}
              className="btn-main px-6 py-2 bg-yellow-600 hover:bg-yellow-700"
            >
              Stop Tracking
            </button>
            <button
              onClick={endTrip}
              className="btn-main px-6 py-2 bg-red-600 hover:bg-red-700"
              disabled={loading}
            >
              {loading ? 'Ending...' : 'End Trip'}
            </button>
          </>
        )}
      </div>

      {/* Map */}
      <div className="rounded-lg overflow-hidden shadow-xl border border-gray-700 relative z-0">
        <MapContainer
          center={livePos || [32.64, -16.9]}
          zoom={16}
          scrollWheelZoom={true}
          style={{ minHeight: '400px', height: '65vh', width: '100%', position: 'relative', zIndex: 0 }}
          ref={mapRef}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {livePos && <CenterMap position={livePos} />}
          {path.map((pos, idx) => <Marker key={idx} position={pos} />)}
          {path.length > 1 && <Polyline positions={path} color="cyan" />}
        </MapContainer>
      </div>
    </div>
  );
}
