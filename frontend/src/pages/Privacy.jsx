import React from 'react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto my-16 px-4 py-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">
        AquaWeb collects only the data necessary to provide the service. We respect your privacy and do not sell personal information.
      </p>
      <section className="prose text-sm text-gray-700">
        <h3>Data we collect</h3>
        <ul>
          <li>Account information (email, display name)</li>
          <li>Content you post (sightings, comments, media)</li>
          <li>Usage analytics to improve the service</li>
        </ul>
        <h3>How we use data</h3>
        <p>We use collected data to operate, maintain, and improve our services, and to communicate with you.</p>
      </section>
    </div>
  );
}
