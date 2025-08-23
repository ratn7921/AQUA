
//Need to work more on this page
import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function Crimes() {
  const [crimes, setCrimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewedIds, setReviewedIds] = useState(() => new Set());

  useEffect(() => {
    axios.get('/incidents')
      .then(res => setCrimes(res.data))
      .catch(() => setError('Failed to load crimes.'))
      .finally(() => setLoading(false));
  }, []);

  const markAsReviewed = (id) => {
    setReviewedIds(prev => new Set(prev).add(id));
  };

  if (loading) return <div className="text-center text-white mt-10">Loading incidents...</div>;
  if (error) return <div className="text-center text-red-400 mt-10">{error}</div>;

  return (
    <div className="px-4 py-10 min-h-screen bg-gradient-to-br from-red-900 via-rose-800 to-pink-700 text-white">
      <h2 className="text-3xl font-bold text-center mb-10">🚨 Reported Whale Hunting Incidents</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {crimes.map((crime) => (
          <div
            key={crime._id}
            className="bg-white/10 backdrop-blur p-4 rounded-xl shadow-md"
          >
            <div className="text-xs text-rose-200 font-medium mb-2">
              👤 Reporter: {crime.reporter?.name || 'Unknown'}
            </div>

            {crime.photoUrl && (
              <img
                src={`http://localhost:5000${crime.photoUrl}`}
                alt="Illegal Hunting Evidence"
                className="rounded-lg w-full h-48 object-cover mb-3"
              />
            )}

            {crime.shipImageUrl && (
              <img
                src={`http://localhost:5000${crime.shipImageUrl}`}
                alt="Whale Hunting Ship"
                className="rounded-lg w-full h-32 object-cover mb-3"
              />
            )}

            <div className="text-white font-semibold">🛥 Ship: {crime.shipName || 'N/A'}</div>
            <div className="text-white">🔢 Ship No: {crime.shipNumber || 'N/A'}</div>
            <div className="text-white">
              📍 Location: {crime.location?.lat}, {crime.location?.lng}
            </div>
            <div className="text-white text-sm mt-1">📄 {crime.description}</div>
            <div className="text-cyan-200 mt-2 text-xs">🕒 {new Date(crime.createdAt).toLocaleString()}</div>

            <div className="mt-4 border-t border-white/20 pt-3">
              <h4 className="font-bold text-sm mb-2 text-rose-100">🔍 Expert Action Panel</h4>
              {reviewedIds.has(crime._id) ? (
                <div className="text-green-400 font-semibold">✅ Reviewed</div>
              ) : (
                <>
                  <button
                    onClick={() => markAsReviewed(crime._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-1 px-3 rounded-md transition"
                  >
                    Mark as Reviewed
                  </button>
                  <p className="text-xs text-white/80 mt-2">
                    🧠 Based on ship data and images, marine experts can notify coastal patrol or log the ship’s ID for tracking. This helps in identifying repeat offenders and allows early alerts to naval authorities.
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
