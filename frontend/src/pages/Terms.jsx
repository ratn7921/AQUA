import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto my-16 px-4 py-8 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <p className="text-gray-700 mb-4">
        By using AquaWeb you agree to the following terms and conditions. Please read them carefully.
      </p>
      <section className="prose text-sm text-gray-700">
        <h3>Use of Service</h3>
        <p>You agree not to misuse the service, post illegal content, or violate others' rights.</p>
        <h3>Content</h3>
        <p>Users retain ownership of their content but grant AquaWeb a license to display and distribute it.</p>
      </section>
    </div>
  );
}
