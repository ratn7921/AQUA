
//not part of main Application 

// ----------------------------------------------------------------------------
// src/components/Feed/FeedList.jsx
import React, { useState, useEffect } from 'react';
import { fetchFeed } from '../../api/feedApi';
import PostCard from './PostCard';

export default function FeedList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPosts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadPosts = async (pg) => {
    setLoading(true);
    try {
      const feed = await fetchFeed(pg);
      if (feed.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...feed]);
      }
    } catch (err) {
      console.error('❌ Failed to load feed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 px-4">
      {/* If no posts */}
      {posts.length === 0 && !loading && (
        <div className="text-center py-16 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            No posts yet
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Be the first to create something amazing ✨
          </p>
        </div>
      )}

      {/* Feed Cards */}
      {posts.map((p) => (
        <PostCard key={p._id} post={p} />
      ))}

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center py-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
            className="px-6 py-2 rounded-full text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-md transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
