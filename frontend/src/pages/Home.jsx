import React from 'react';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <>
      <Hero />
      <section className="max-w-6xl mx-auto my-16 px-6 py-12 relative">
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden p-8">
          <div className="h-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500 rounded-t-2xl" />
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mt-6">
            <h2 className="text-3xl md:text-4xl font-bold">Protect oceans. Report sightings. Help science.</h2>
            <p className="text-lg text-gray-600">AquaWeb connects enthusiasts and experts to document marine life, report incidents, and collaborate on conservation.</p>
          </div>
        </div>
      </section>
    </>
  );
}
