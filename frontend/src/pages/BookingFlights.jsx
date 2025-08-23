//not part of main Application 
// ---------- src/pages/BookingFlights.jsx ----------
import React, { useState } from 'react';
import { searchFlights } from '../api/aviationApi'; // ✅ Correct import

export default function BookingFlights() {
  const [origin, setOrigin] = useState('NYC');
  const [dest, setDest] = useState('LON');
  const [maxPrice, setMaxPrice] = useState(500); // optional use
  const [flightResults, setFlightResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const allFlights = await searchFlights();
      const filtered = allFlights.filter(
        (f) =>
          f.departure?.iata === origin.toUpperCase() &&
          f.arrival?.iata === dest.toUpperCase()
      );
      setFlightResults(filtered);
    } catch (err) {
      console.error('Flight search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Book Flights</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          placeholder="Origin (IATA)"
          className="border p-2"
        />
        <input
          value={dest}
          onChange={(e) => setDest(e.target.value)}
          placeholder="Destination (IATA)"
          className="border p-2"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max Price"
          className="border p-2 w-32"
        />
        <button
          onClick={handleSearch}
          className="bg-cyan-700 text-white px-4 py-2"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading flights...</p>}

      {flightResults && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Flight Results</h3>
          <pre className="bg-gray-100 p-2 overflow-x-auto text-sm">
            {JSON.stringify(flightResults, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
