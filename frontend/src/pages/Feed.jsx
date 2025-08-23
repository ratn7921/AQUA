//not part of main Application 

// src/pages/Feed.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeedList from '../components/Feed/FeedList';

export default function Feed() {
  const nav = useNavigate();
  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Community Feed</h1>
        <button
          onClick={() => nav('/feed/new')}
          className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
        >
          + New Post
        </button>
      </div>
      <FeedList />
    </div>
  );
}
