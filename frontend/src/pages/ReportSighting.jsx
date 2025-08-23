// --- src/pages/ReportSighting.jsx ---
import axios from '../api/axios';
import { useState } from 'react';

export default function ReportSighting() {
  const [form, setForm] = useState({
    species: '',
    count: '',
    behavior: '',
    location: { lat: '', lng: '' },
    photo: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'lat' || name === 'lng') {
      setForm(prev => ({ ...prev, location: { ...prev.location, [name]: value } }));
    } else if (name === 'photo') {
      setForm(prev => ({ ...prev, photo: files[0] }));
      setImagePreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Add this function for live location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm(prev => ({
          ...prev,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        }));
      },
      () => setError('Unable to retrieve your location.')
    );
  };

const handleSubmit = async e => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess('');
  try {
    const data = new FormData();
    data.append('species', form.species);
    data.append('count', form.count);
    data.append('behavior', form.behavior);
    data.append('location[lat]', form.location.lat);  // 🛠️ Important
    data.append('location[lng]', form.location.lng);  // 🛠️ Important
    if (form.photo) data.append('photo', form.photo);

    await axios.post('/sightings', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    setSuccess('Sighting reported!');
    setForm({ species: '', count: '', behavior: '', location: { lat: '', lng: '' }, photo: null });
    setImagePreview(null);
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to report sighting.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl font-bold">Report Sighting</h2>
      <form className="space-y-4 mt-4" onSubmit={handleSubmit} encType="multipart/form-data">
        <input name="species" value={form.species} onChange={handleChange} placeholder="Species Name" className="w-full p-3 rounded bg-white/20 placeholder-white" />
        <input name="count" value={form.count} onChange={handleChange} placeholder="Count" className="w-full p-3 rounded bg-white/20 placeholder-white" />
        <textarea name="behavior" value={form.behavior} onChange={handleChange} placeholder="Behavior" className="w-full p-3 rounded bg-white/20 placeholder-white"></textarea>
        <div className="flex gap-4">
          <input name="lat" value={form.location.lat} onChange={handleChange} placeholder="Latitude" className="w-1/2 p-3 rounded bg-white/20 placeholder-white" />
          <input name="lng" value={form.location.lng} onChange={handleChange} placeholder="Longitude" className="w-1/2 p-3 rounded bg-white/20 placeholder-white" />
        </div>
        <button
          type="button"
          onClick={handleGetLocation}
          className="bg-cyan-700 text-white px-4 py-2 rounded hover:bg-cyan-800 mb-2"
        >
          Use My Current Location
        </button>
        <input type="file" name="photo" accept="image/*" onChange={handleChange} className="text-white" />
        {imagePreview && <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded" />}
        <button className="bg-teal-600 px-4 py-2 rounded" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
        {error && <p className="text-red-400 text-center">{error}</p>}
        {success && <p className="text-green-400 text-center">{success}</p>}
      </form>
    </div>
  );
}