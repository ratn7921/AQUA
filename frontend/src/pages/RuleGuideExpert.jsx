//Documentation Guide
import React from "react";
import FishLoader from "../components/FishLoader";

export default function RuleGuideExpert() {
  return (
    <div className="relative min-h-screen ">
      {/* Fish animation background */}
      <FishLoader count={4} />

      {/* Gradient & glass layout */}
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-cyan-900 to-blue-800 py-20 px-6 rounded-3xl shadow-xl  mb-10">
        <div className="max-w-3xl mx-auto bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-10 shadow-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-8 drop-shadow">
            👨‍🔬 Expert's Guide: Legal Powers & Platform Benefits
          </h1>

          <ul className="space-y-5 text-cyan-100 text-sm sm:text-base">
            <li className="flex gap-3 items-start">
              <span className="text-lg">🧐</span>
              <p><strong>Monitor and verify reports:</strong> Review and validate incident and sighting reports submitted by travellers.</p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-lg">⚖️</span>
              <p><strong>Use legal authority:</strong> If authorized, coordinate with local authorities to address illegal whale hunting or marine crimes.</p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-lg">🎓</span>
              <p><strong>Educate and guide:</strong> Provide guidance to tourists and operators on best practices and legal requirements.</p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-lg">📊</span>
              <p><strong>Contribute research:</strong> Use AquaWeb data for scientific research and conservation planning.</p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-lg">🌍</span>
              <p><strong>Lead conservation efforts:</strong> Organize awareness campaigns and collaborate with NGOs using AquaWeb's platform.</p>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-lg">🛡️</span>
              <p><strong>Ensure compliance:</strong> Help enforce marine protection laws and promote ethical whale watching.</p>
            </li>
          </ul>

          <p className="text-cyan-200 mt-8 text-center text-sm leading-relaxed">
            🌊 As an expert, your actions and knowledge are vital for marine conservation.<br />
            Use AquaWeb to maximize your positive impact!
          </p>
        </div>
      </div>
    </div>
  );
}
