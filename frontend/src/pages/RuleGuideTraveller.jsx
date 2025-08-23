//Documentaion Guide
import React from "react";
import FishLoader from "../components/FishLoader";
export default function RuleGuideTraveller() {
  return (
    <div className="relative min-h-screen">
     <FishLoader count={4} />
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-900 to-blue-800 py-20 px-6  rounded-3xl shadow-xl  mb-10">
      <div className="max-w-3xl mx-auto bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-10 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-8 drop-shadow">
          🧳 Traveller's Guide: Whale Watching Responsibilities
        </h1>
        <ul className="space-y-5 text-cyan-100 text-sm sm:text-base">
          <li className="flex gap-3 items-start">
            <span className="text-lg">🐋</span>
            <p>
              <strong>Respect marine life:</strong> Maintain a safe distance from whales and never attempt to touch or feed them.
            </p>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-lg">🚨</span>
            <p>
              <strong>Report illegal activities:</strong> Use AquaWeb to report any suspicious or illegal whale hunting or harassment.
            </p>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-lg">✅</span>
            <p>
              <strong>Choose ethical operators:</strong> Support only those whale watching tours that follow legal and ethical guidelines.
            </p>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-lg">🔇</span>
            <p>
              <strong>Minimize disturbance:</strong> Keep noise low and avoid sudden movements that could stress marine animals.
            </p>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-lg">📍</span>
            <p>
              <strong>Share sightings:</strong> Log your whale sightings on AquaWeb to help researchers and conservationists.
            </p>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-lg">📣</span>
            <p>
              <strong>Educate others:</strong> Spread awareness about the importance of whale conservation and responsible tourism.
            </p>
          </li>
        </ul>
        <p className="text-cyan-200 mt-8 text-center text-sm leading-relaxed">
          🌊 By following these guidelines, you help protect whales and contribute to marine biodiversity. <br />
          Thank you for being a responsible ocean traveller!
        </p>
      </div>
    </div>
    </div>
  );
}
