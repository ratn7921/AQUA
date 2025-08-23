import { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function PostsFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reposting, setReposting] = useState('');

  useEffect(() => {
    axios.get('/feed')
      // server returns { page, limit, feed } — accept either shape
      .then(res => setPosts(res.data?.feed ?? res.data))
      .catch(() => setError('Failed to load posts.'))
      .finally(() => setLoading(false));
  }, []);

  const handleRepost = async (id) => {
    setReposting(id);
    try {
      await axios.post(`/incidents/${id}/repost`);
      const res = await axios.get('/feed');
      setPosts(res.data);
    } catch {
      alert('Failed to repost');
    }
    setReposting('');
  };

  if (loading) return <div className="text-center text-white mt-10">⏳ Loading activity...</div>;
  if (error) return <div className="text-center text-red-400 mt-10">{error}</div>;

  return (
    <div className="mt-6 w-full">
      <h2 className="text-xl font-bold text-white mb-4 px-4">🌊 Ocean Activity Feed</h2>
      <div className="flex overflow-x-auto scroll-smooth snap-x gap-4 px-4 pb-4 scrollbar-hide">
        {posts.length > 0 ? (
          posts.map(post => (
            <div
              key={post._id}
              className="snap-start flex-shrink-0 min-w-[300px] max-w-[300px] bg-white/10 rounded-2xl p-4 shadow-lg backdrop-blur-md border border-white/20 hover:scale-[1.02] transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-cyan-300 font-semibold truncate">{post.user?.name || post.reporter || 'Anonymous'}</span>
                <span className="text-xs text-cyan-100">{new Date(post.createdAt).toLocaleTimeString()}</span>
              </div>
              <div className="text-xs uppercase text-cyan-400 mb-2">{post.type}</div>

              {post.type === 'sighting' && post.data && (
                <>
                  <div className="text-white text-sm">🐋 Species: <strong>{post.data.species}</strong></div>
                  <div className="text-white/80 text-sm">Count: {post.data.count}</div>
                  <div className="text-white/80 text-sm">Behavior: {post.data.behavior}</div>
                  {post.data.photoUrl && (
                    <img
                      src={post.data.photoUrl?.startsWith('/') ? `http://localhost:5000${post.data.photoUrl}` : post.data.photoUrl}
                      alt="Sighting"
                      className="rounded-lg mt-2 h-32 w-full object-cover shadow"
                    />
                  )}
                </>
              )}

              {post.type === 'incident' && post.data && (
                <>
                  <div className="text-white text-sm">🚨 Type: <strong>{post.data.type}</strong></div>
                  <div className="text-white/80 text-sm">Description: {post.data.description}</div>
                  <div className="text-white/80 text-sm">
                    Location: {post.data.location?.lat}, {post.data.location?.lng}
                  </div>
                  {post.data.photoUrl && (
                    <img
                      src={post.data.photoUrl?.startsWith('/') ? `http://localhost:5000${post.data.photoUrl}` : post.data.photoUrl}
                      alt="Incident"
                      className="rounded-lg mt-2 h-32 w-full object-cover shadow"
                    />
                  )}
                  <button
                    onClick={() => handleRepost(post._id)}
                    disabled={reposting === post._id}
                    className="mt-3 px-4 py-1 rounded bg-cyan-600 hover:bg-cyan-700 text-white text-sm w-full"
                  >
                    {reposting === post._id ? 'Reposting...' : 'Repost'}
                  </button>
                </>
              )}

              {post.type === 'trip' && post.data && (
                <>
                  <div className="text-white text-sm">🧭 Trip</div>
                  <div className="text-white/80 text-sm">
                    Start: {post.data.startTime ? new Date(post.data.startTime).toLocaleString() : 'N/A'}
                  </div>
                  <div className="text-white/80 text-sm">
                    End: {post.data.endTime ? new Date(post.data.endTime).toLocaleString() : 'Ongoing'}
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="text-white text-center w-full">No posts available.</div>
        )}
      </div>

      {/* Optional TailwindCSS scrollbar hiding */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
