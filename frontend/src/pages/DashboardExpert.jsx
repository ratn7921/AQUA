

// // src/pages/DashboardExpert.jsx
// import React, { useEffect, useState } from 'react';
// import axios from '../api/axios';

// export default function DashboardExpert() {
//   const [counts, setCounts] = useState({ incidents: 0, sightings: 0, trips: 0 });
//   const [recentIncidents, setRecentIncidents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let mounted = true;
//     async function load() {
//       try {
//         const [incRes, sightRes, tripRes] = await Promise.all([
//           axios.get('/incidents'),
//           axios.get('/sightings'),
//           axios.get('/trips')
//         ]);

//         if (!mounted) return;
//         const incs = Array.isArray(incRes.data) ? incRes.data : (incRes.data?.incidents ?? []);
//         const sights = Array.isArray(sightRes.data) ? sightRes.data : (sightRes.data?.sightings ?? []);
//         const trips = Array.isArray(tripRes.data) ? tripRes.data : (tripRes.data?.trips ?? []);

//         setCounts({ incidents: incs.length, sightings: sights.length, trips: trips.length });
//         setRecentIncidents(incs.slice(0, 6));
//       } catch (err) {
//         console.error('Failed to load expert dashboard data', err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//     return () => { mounted = false; };
//   }, []);

//   if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-2xl font-bold mb-4">Expert Dashboard</h1>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//           <div className="p-4 bg-white rounded shadow text-center">
//             <div className="text-sm text-gray-500">Incidents</div>
//             <div className="text-2xl font-semibold">{counts.incidents}</div>
//           </div>
//           <div className="p-4 bg-white rounded shadow text-center">
//             <div className="text-sm text-gray-500">Sightings</div>
//             <div className="text-2xl font-semibold">{counts.sightings}</div>
//           </div>
//           <div className="p-4 bg-white rounded shadow text-center">
//             <div className="text-sm text-gray-500">Trips</div>
//             <div className="text-2xl font-semibold">{counts.trips}</div>
//           </div>
//         </div>

//         <section className="bg-white rounded shadow p-4">
//           <h2 className="font-semibold mb-3">Recent Incidents</h2>
//           {recentIncidents.length === 0 ? (
//             <div className="text-sm text-gray-500">No incidents reported yet.</div>
//           ) : (
//             <ul className="space-y-3">
//               {recentIncidents.map(inc => (
//                 <li key={inc._id} className="flex items-start gap-3">
//                   <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center text-lg">
//                     {inc.photoUrl ? (
//                       <img src={inc.photoUrl.startsWith('/') ? `http://localhost:5000${inc.photoUrl}` : inc.photoUrl} alt="thumb" className="w-full h-full object-cover" />
//                     ) : (
//                       '🚨'
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <div className="font-medium">{inc.type || 'Incident'}</div>
//                         <div className="text-sm text-gray-600">{inc.description?.slice(0, 120)}</div>
//                       </div>
//                       <div className="text-xs text-gray-400">{inc.createdAt ? new Date(inc.createdAt).toLocaleString() : ''}</div>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

export default function DashboardExpert() {
  const [counts, setCounts] = useState({ incidents: 0, sightings: 0, trips: 0 });
  const [recentIncidents, setRecentIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [incRes, sightRes, tripRes] = await Promise.all([
          axios.get('/incidents'),
          axios.get('/sightings'),
          axios.get('/trips')
        ]);

        if (!mounted) return;
        const incs = Array.isArray(incRes.data) ? incRes.data : (incRes.data?.incidents ?? []);
        const sights = Array.isArray(sightRes.data) ? sightRes.data : (sightRes.data?.sightings ?? []);
        const trips = Array.isArray(tripRes.data) ? tripRes.data : (tripRes.data?.trips ?? []);

        setCounts({ incidents: incs.length, sightings: sights.length, trips: trips.length });
        setRecentIncidents(incs.slice(0, 6));
      } catch (err) {
        console.error('Failed to load expert dashboard data', err);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-200 to-blue-300 text-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-sky-900">🌊 Expert Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="p-4 bg-gradient-to-br from-sky-200 to-blue-300 rounded-xl shadow-lg text-center">
            <div className="text-sm text-sky-700">Incidents</div>
            <div className="text-3xl font-bold text-sky-900">{counts.incidents}</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-xl shadow-lg text-center">
            <div className="text-sm text-sky-700">Sightings</div>
            <div className="text-3xl font-bold text-sky-900">{counts.sightings}</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-cyan-200 to-sky-300 rounded-xl shadow-lg text-center">
            <div className="text-sm text-sky-700">Trips</div>
            <div className="text-3xl font-bold text-sky-900">{counts.trips}</div>
          </div>
        </div>

        <section className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg p-6 border border-sky-200">
          <h2 className="font-semibold text-sky-900 mb-4">🌐 Recent Incidents</h2>
          {recentIncidents.length === 0 ? (
            <div className="text-sm text-sky-600">No incidents reported yet.</div>
          ) : (
            <ul className="space-y-4">
              {recentIncidents.map(inc => (
                <li key={inc._id} className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-sky-100 rounded-full overflow-hidden flex items-center justify-center text-2xl shadow-inner">
                    {inc.photoUrl ? (
                      <img src={inc.photoUrl.startsWith('/') ? `http://localhost:5000${inc.photoUrl}` : inc.photoUrl} alt="thumb" className="w-full h-full object-cover" />
                    ) : (
                      '🚨'
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sky-900">{inc.type || 'Incident'}</div>
                        <div className="text-sm text-sky-700">{inc.description?.slice(0, 120)}</div>
                      </div>
                      <div className="text-xs text-sky-500">{inc.createdAt ? new Date(inc.createdAt).toLocaleString() : ''}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
