// main feature of the application
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function Sightings() {
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/sightings')
      .then((res) => setSightings(res.data))
      .catch(() => setError('❌ Failed to load sightings.'))
      .finally(() => setLoading(false));
  }, []);

  const goToSpeciesDetails = (speciesName) => {
    navigate(`/species?name=${encodeURIComponent(speciesName)}`);
  };

  const resolveImageUrl = (url) => {
    if (!url) return '/default-avatar.png';
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? url : '/default-avatar.png';
    } catch {
      if (url.startsWith('/')) return `http://localhost:5000${url}`;
      return `http://localhost:5000/uploads/${url}`;
    }
  };

  if (loading)
    return <div className="text-center text-white mt-10">Loading sightings...</div>;
  if (error)
    return <div className="text-center text-red-400 mt-10">{error}</div>;

  return (
    <div className="px-4 py-10 min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-700 text-white">
      <h2 className="text-3xl font-bold text-center mb-10">🌊 Recent Sucessful  Sightings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sightings.map((s) => (
          <div
            key={s._id}
            onClick={() => goToSpeciesDetails(s.species)}
            className="bg-white/10 backdrop-blur p-3 rounded-xl shadow-lg hover:scale-[1.02] transition-transform cursor-pointer"
          >
            <div className="text-xs text-cyan-300 font-medium mb-2">
              👤 {s.reporter?.name || 'Unknown'}
            </div>
            <img
              src={resolveImageUrl(s.photoUrl)}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-avatar.png';
              }}
              alt={s.species}
              className="rounded-lg w-full h-48 object-cover mb-3 shadow-md"
            />
            <h3 className="text-lg font-bold text-white">{s.species}</h3>
            <div className="text-sm text-white/90">🐋 Count: {s.count}</div>
            <div className="text-sm text-white/90">🌀 Behavior: {s.behavior}</div>
            <div className="text-xs text-cyan-200 mt-1">
              📍 {s.location?.lat}, {s.location?.lng}
            </div>
            <div className="text-xs text-cyan-400 mt-1">
              🕒 {s.createdAt ? new Date(s.createdAt).toLocaleString() : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
