//The Inforamtion page about species

// src/pages/Species.jsx
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

// ✅ GBIF species search
async function searchSpeciesFromGBIF(name) {
  try {
    const res = await axios.get(`https://api.gbif.org/v1/species/search?q=${encodeURIComponent(name)}`);
    return res.data.results || [];
  } catch (err) {
    console.error('❌ GBIF fetch error:', err.message);
    return [];
  }
}

// ✅ OBIS occurrence records
async function getOccurrencesFromOBIS(scientificName) {
  try {
    const res = await axios.get(`https://api.obis.org/v3/occurrence`, {
      params: { scientificname: scientificName, limit: 50 },
    });
    return res.data.results || [];
  } catch (err) {
    console.error('❌ OBIS fetch error:', err.message);
    return [];
  }
}

export default function Species() {
  const [species, setSpecies] = useState([]);
  const [externalSpecies, setExternalSpecies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('name') || 'Clownfish';

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      setSpecies([]);
      setExternalSpecies([]);

      try {
        const gbifResults = await searchSpeciesFromGBIF(search);

        if (gbifResults.length > 0) {
          const formatted = gbifResults.map((item) => ({
            name: item.vernacularName || item.canonicalName || item.scientificName,
            scientificName: item.scientificName,
            rank: item.rank,
            description: item.kingdom || item.family || '',
            kingdom: item.kingdom,
            family: item.family,
            _source: 'GBIF',
          }));
          setSpecies(formatted);

          const scientificName = gbifResults[0].scientificName;
          const obisData = await getOccurrencesFromOBIS(scientificName);

          const externalFormatted = obisData.map((o) => ({
            name: scientificName,
            habitat: o.environment || '',
            location: o.decimalLatitude && o.decimalLongitude
              ? { lat: o.decimalLatitude, lng: o.decimalLongitude }
              : null,
            createdAt: o.eventDate || '',
            _source: 'OBIS',
          }));

          setExternalSpecies(externalFormatted);
        } else {
          setError(`No results found for "${search}".`);
        }
      } catch {
        setError(`Failed to fetch species for "${search}".`);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [search]);

  const allResults = [...species, ...externalSpecies];
  const noResults = !loading && allResults.length === 0;

  return (
    <div className="p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Species Catalog</h2>
        <span className="bg-cyan-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Total: {allResults.length}
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newSearch = e.target.elements.speciesSearch.value;
          setSearchParams({ name: newSearch });
        }}
        className="mb-6 flex gap-2"
      >
        <input
          type="text"
          name="speciesSearch"
          defaultValue={search}
          placeholder="Search marine species (e.g. Dolphin, Tuna)"
          className="p-2 rounded border border-cyan-400 text-black w-64"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-800"
        >
          Search
        </button>
      </form>

      {loading && <div className="text-center text-white mt-10">Loading species...</div>}
      {error && <div className="text-center text-red-400 whitespace-pre-line mt-10">{error}</div>}
      {noResults && (
        <div className="text-center text-cyan-200 italic mb-8">
          No results found for "{search}". Try another species name.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allResults.map((item, idx) => (
          <div
            key={item._id || item.name + idx}
            className="bg-white/10 rounded-xl p-4 shadow flex flex-col items-center border border-cyan-900/30 hover:shadow-lg transition cursor-pointer"
            onClick={() => setModal(item)}
          >
            <img
              src={item.imageUrl || item.image || '/default-avatar.png'}
              alt={item.name}
              className="w-32 h-32 object-cover rounded mb-2 border-2 border-cyan-400 bg-white/20"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-avatar.png';
              }}
            />
            <h3 className="text-lg font-semibold text-cyan-100 mb-1">{item.name}</h3>
            <div className="text-xs text-cyan-300 italic mb-2">
              {item.scientificName}
            </div>
            <div className="text-sm mb-2 text-cyan-50 text-center">
              {item.description || (item.rank ? `Rank: ${item.rank}` : '')}
            </div>
            <div className="text-xs text-cyan-200 mb-2">
              {item.habitat && `Habitat: ${item.habitat}`}
            </div>
            <span
              className={`mt-2 text-xs px-2 py-0.5 rounded ${
                item._source === 'GBIF' ? 'bg-cyan-800' : 'bg-green-800'
              } text-white`}
            >
              {item._source}
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-8 max-w-lg w-full relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-2xl text-cyan-700"
              onClick={() => setModal(null)}
            >
              &times;
            </button>

            <img
              src={modal.imageUrl || modal.image || '/default-avatar.png'}
              alt={modal.name}
              className="w-40 h-40 object-cover rounded mx-auto mb-4 border-2 border-cyan-400"
            />

            <h2 className="text-2xl font-bold mb-1 text-cyan-800 text-center">{modal.name}</h2>
            <div className="text-sm text-center text-cyan-700 mb-2 italic">
              {modal.scientificName || 'Unknown scientific name'}
            </div>

            <div className="space-y-2 text-sm">
              {modal.rank && <p><strong>Rank:</strong> {modal.rank}</p>}
              {modal.description && <p><strong>Description:</strong> {modal.description}</p>}
              {modal.habitat && <p><strong>Habitat:</strong> {modal.habitat}</p>}
              {modal.kingdom && <p><strong>Kingdom:</strong> {modal.kingdom}</p>}
              {modal.family && <p><strong>Family:</strong> {modal.family}</p>}
            </div>

            <div className="mt-4">
              <p className="font-semibold">Research Links:</p>
              <ul className="list-disc list-inside text-cyan-800 text-xs">
                <li>
                  <a href={`https://www.gbif.org/species/search?q=${modal.scientificName}`} target="_blank" rel="noreferrer">GBIF</a>
                </li>
                <li>
                  <a href={`https://www.marinespecies.org/aphia.php?p=search&q=${modal.scientificName}`} target="_blank" rel="noreferrer">WoRMS</a>
                </li>
                <li>
                  <a href={`https://www.fishbase.se/search.php?what=species&genus=${modal.scientificName?.split(' ')[0]}`} target="_blank" rel="noreferrer">FishBase</a>
                </li>
                <li>
                  <a href={`https://en.wikipedia.org/wiki/${modal.scientificName?.replace(/\s+/g, '_')}`} target="_blank" rel="noreferrer">Wikipedia</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

