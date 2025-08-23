
//not part of main Application 

import { useEffect, useState } from 'react';
import { getAllMedia } from '../api/mediaApi';

export default function MediaGallery() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const data = await getAllMedia();
        setMedia(data);
      } catch (err) {
        console.error('Failed to load media:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMedia();
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Media Gallery</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {media
            .filter((item) => item.url && item.url.startsWith('http'))
            .map((item) => (
              <div key={item._id} className="bg-white/10 rounded-lg overflow-hidden shadow-lg">
                {item.type.startsWith('image') ? (
                  <img
                    src={item.url}
                    alt="media"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/fallback.jpg'; // 👈 fallback image
                    }}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <video controls className="w-full h-48 object-cover">
                    <source src={item.url} type={item.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
