//need to be inhanced
import { useState } from 'react';
import axios from '../api/axios';

export default function ReportIncident() {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    photo: null,
    location: { lat: '', lng: '' },
    shipName: '',
    shipNumber: '',
    shipImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get user's current location
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        }));
      },
      () => setError('Unable to retrieve your location.')
    );
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'photo' || name === 'shipImage') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleLocationChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      location: { ...prev.location, [name]: value }
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.type || !formData.description || !formData.location.lat || !formData.location.lng) {
      setError('All fields except photo are required.');
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('type', formData.type);
      data.append('description', formData.description);
      data.append('lat', formData.location.lat);
      data.append('lng', formData.location.lng);
      if (formData.photo) data.append('photo', formData.photo);

      // If illegal hunting, add ship details
      if (formData.type === 'illegal_hunting') {
        data.append('shipName', formData.shipName);
        data.append('shipNumber', formData.shipNumber);
        if (formData.shipImage) data.append('shipImage', formData.shipImage);
      }

      await axios.post('/incidents', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess('Incident reported successfully!');
      setFormData({
        type: '',
        description: '',
        photo: null,
        location: { lat: '', lng: '' },
        shipName: '',
        shipNumber: '',
        shipImage: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to report incident.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 space-y-4 bg-black/10 backdrop-blur-lg p-8 rounded-xl text-black">
      <h2 className="text-2xl font-bold mb-4">Report Incident</h2>
      <select name="type" value={formData.type} onChange={handleChange} required className="w-full p-3 rounded bg-white/20">
        <option value="">Select Type</option>
        <option value="pollution">Pollution</option>
        <option value="injured_animal">Injured Animal</option>
        <option value="dead_animal">Dead Animal</option>
        <option value="illegal_hunting">Illegal Whale Hunting</option>
      </select>
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-3 rounded bg-white/20 placeholder-white" />
      <input
        type="file"
        name="photo"
        accept="image/*"
        onChange={handleChange}
        className="w-full p-3 rounded bg-white/20 text-black file:bg-cyan-700 file:text-white file:rounded file:px-3 file:py-1"
      />
      {/* Location Section */}
      <div className="mb-4">
        <label className="block mb-2">Enter Location</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            name="lat"
            placeholder="Latitude"
            value={formData.location.lat}
            onChange={handleLocationChange}
            className="w-full p-3 rounded bg-white/20 placeholder-white"
          />
          <input
            type="text"
            name="lng"
            placeholder="Longitude"
            value={formData.location.lng}
            onChange={handleLocationChange}
            className="w-full p-3 rounded bg-white/20 placeholder-white"
          />
        </div>
        <button
          type="button"
          onClick={handleGetLocation}
          className="bg-cyan-700 text-white px-4 py-2 rounded hover:bg-cyan-800"
        >
          Use My Current Location
        </button>
      </div>
      {/* Whale Hunter Details */}
      {formData.type === 'illegal_hunting' && (
        <div className="bg-white/20 p-4 rounded mb-4">
          <h3 className="font-semibold mb-2">Whale Hunter Ship Details</h3>
          <input
            type="text"
            name="shipName"
            placeholder="Ship Name"
            value={formData.shipName}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/30 mb-2"
          />
          <input
            type="text"
            name="shipNumber"
            placeholder="Ship Number"
            value={formData.shipNumber}
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/30 mb-2"
          />
          <input
            type="file"
            name="shipImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-3 rounded bg-white/30 text-black file:bg-cyan-700 file:text-white file:rounded file:px-3 file:py-1"
          />
        </div>
      )}
      <button type="submit" className="w-full bg-teal-600 py-2 rounded hover:bg-teal-700" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <p className="text-red-400 text-center">{error}</p>}
      {success && <p className="text-green-400 text-center">{success}</p>}
    </form>
  );
}
