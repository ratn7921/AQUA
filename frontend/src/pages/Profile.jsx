
// src/pages/Profile.jsx

import { useEffect, useState, useRef } from 'react';
import axios from '../api/axios';

export default function Profile() {
  const [profile, setProfile]       = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [editMode, setEditMode]     = useState(false);
  const [form, setForm]             = useState({ name: '', description: '' });
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const fileInputRef = useRef(null);

  // Return the URL if valid, otherwise fallback
  const toAvatarUrl = url => url && url.startsWith('http') ? url : '/default-avatar.png';

  // Load profile from backend
  const fetchProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/users/me');
      const user = res.data;
      setProfile(user);
      setForm({ name: user.name || '', description: user.description || '' });
      setAvatarPreview(toAvatarUrl(user.avatar));
    } catch (err) {
      console.error('Fetch profile error:', err);
      setError('Failed to load profile.');
    } finally {
      setLoading(false);
    }
  };

  // On mount
  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle text inputs
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle avatar file selection
  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Submit updated profile
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    if (avatarFile) formData.append('avatar', avatarFile);

    try {
      await axios.post('/users/me/update', formData);
      setEditMode(false);
      setAvatarFile(null);
      fetchProfile();
    } catch (err) {
      console.error('Update profile error:', err);
      setError('Profile update failed. Please try again.');
    }
  };

  // Cancel edits
  const handleCancel = () => {
    setEditMode(false);
    setAvatarFile(null);
    if (profile) {
      setForm({ name: profile.name, description: profile.description || '' });
      setAvatarPreview(toAvatarUrl(profile.avatar));
    }
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  // Render
  if (loading) return <div className="text-center mt-10">Loading profile...</div>;
  if (error)   return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-3xl shadow-2xs ">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <img
        src={avatarPreview}
        alt="User avatar"
        onError={e => e.target.src = '/default-avatar.png'}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />

      {!editMode ? (
        <>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
          <p className="mb-4">
            <strong>Description:</strong> {profile.description || '—'}
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Avatar Image</label>
            <input
              type="file"
              name="avatar"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="flex space-x-2">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
