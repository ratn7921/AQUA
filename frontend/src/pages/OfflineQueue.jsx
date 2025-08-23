//not part of main Application 

// src/pages/OfflineQueue.jsx
import React, { useEffect, useState } from 'react';
import { getQueuedReports, clearQueue } from '../utils/offlineStorage';

export default function OfflineQueue() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    getQueuedReports().then(setQueue);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Offline Report Queue</h2>
      <ul className="space-y-2">
        {queue.map((report, i) => (
          <li key={i} className="bg-white p-3 rounded shadow">
            <pre>{JSON.stringify(report, null, 2)}</pre>
          </li>
        ))}
      </ul>
      {queue.length > 0 && (
        <button
          onClick={() => { clearQueue(); setQueue([]); }}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          Clear Queue
        </button>
      )}
    </div>
  );
}
