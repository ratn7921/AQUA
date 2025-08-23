
//Remove if you dont want 
// --- src/pages/Dashboard.jsx ---
import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  // If user exists and has a role, show main dashboard
  if (user?.role) {
    return (
      <div className="p-6 text-white bg-gradient-to-r from-blue-800 to-cyan-700 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Welcome, {user?.name || 'User'}!</h2>
        <p className="mb-6 text-lg">
          Role: <span className="font-semibold">{user.role}</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link to="/sightings" className="block p-6 bg-white/10 backdrop-blur rounded-lg shadow hover:bg-white/20 text-center">
            <span className="text-3xl">🐋</span>
            <div className="mt-2 font-semibold">View Sightings</div>
          </Link>
          <Link to="/report-sighting" className="block p-6 bg-white/10 backdrop-blur rounded-lg shadow hover:bg-white/20 text-center">
            <span className="text-3xl">📋</span>
            <div className="mt-2 font-semibold">Report Sighting</div>
          </Link>
          <Link to="/report-incident" className="block p-6 bg-white/10 backdrop-blur rounded-lg shadow hover:bg-white/20 text-center">
            <span className="text-3xl">🚨</span>
            <div className="mt-2 font-semibold">Report Incident</div>
          </Link>
          <Link to="/trip" className="block p-6 bg-white/10 backdrop-blur rounded-lg shadow hover:bg-white/20 text-center">
            <span className="text-3xl">🧭</span>
            <div className="mt-2 font-semibold">Record Trip</div>
          </Link>
          <Link to="/species" className="block p-6 bg-white/10 backdrop-blur rounded-lg shadow hover:bg-white/20 text-center">
            <span className="text-3xl">🐠</span>
            <div className="mt-2 font-semibold">Species Catalog</div>
          </Link>
        </div>
      </div>
    );
  }

  // Else, show role selection UI
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-3xl max-w-4xl w-full p-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Choose Your Role</h1>
        <p className="text-gray-600 mb-8">
          AquaWeb offers two distinct paths: Marine Enthusiasts can explore and document ocean life,
          while Marine Experts can analyze, guide, and contribute scientifically.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Marine Enthusiast */}
          <div className="bg-slate-50 rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition cursor-pointer">
            <div className="w-40 h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
              IMAGE
            </div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Blue_Whale_001.jpg/480px-Blue_Whale_001.jpg"
              alt="Whale"
              className="w-24 h-16 object-contain mb-4"
            />
            <h2 className="text-lg font-bold text-gray-800 mb-2">🐋 I’m a Marine Enthusiast</h2>
            <p className="text-gray-700 text-sm">
              As a Marine Enthusiast, you’ll <strong>participate in activities like wildlife sightings</strong> and species
              documentation, contributing to our understanding of marine biodiversity.
            </p>
          </div>

          {/* Marine Expert */}
          <div className="bg-slate-50 rounded-xl p-6 flex flex-col items-center shadow-md hover:shadow-lg transition cursor-pointer">
            <div className="w-40 h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
              IMAGE
            </div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">🧪 I’m a Marine Expert</h2>
            <p className="text-gray-700 text-sm">
              As a Marine Expert, you’ll delve into advanced species research, habitat analyses, and environment
              assessments, applying scientific methods and expertise to protect marine ecosystems.
            </p>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-8">
          Not sure? Explore both and see where you belong.
        </p>
      </div>
    </div>
  );
}
