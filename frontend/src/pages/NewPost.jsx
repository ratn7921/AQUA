//not part of main Application 

// src/pages/NewPost.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/feedApi';

export default function NewPost() {
  const [text, setText] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleMediaChange = e => {
    setMediaFiles(Array.from(e.target.files));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await createPost({ text, media: mediaFiles });
      // After successful post, go back to feed
      navigate('/feed');
    } catch (err) {
      console.error(err);
      setError('Failed to post. Please try again.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded"
          placeholder="What's on your mind?"
          value={text}
          onChange={e => setText(e.target.value)}
          rows={4}
        />
        <div>
          <label className="block mb-1">Attach Photos/Videos</label>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleMediaChange}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
        >
          Post
        </button>
      </form>
    </div>
  );
}
