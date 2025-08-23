
//not part of main Application 


import React, { useEffect, useState } from 'react';
import { fetchDiveAndFishing } from '../api/openTripMapApi';

export default function BookingDiving() {
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        fetchDiveAndFishing(longitude, latitude)
          .then(data => setSpots(data))
          .finally(() => setLoading(false));
      },
      () => {
        // fallback to Seattle if location access denied
        fetchDiveAndFishing(-122.3321, 47.6062)
          .then(data => setSpots(data))
          .finally(() => setLoading(false));
      }
    );
  }, []);

  if (loading) return <div className="p-4">Loading diving spots...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Diving & Fishing Spots</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {spots.map(s => (
          <div key={s.properties.xid} className="border rounded p-3 shadow">
            <h4 className="font-semibold">{s.properties.name}</h4>
            <p className="text-sm text-gray-600">{s.properties.kinds}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
