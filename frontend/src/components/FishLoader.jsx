//not part of main Application 

import React from 'react';
import bgVideo from '../assets/bg-2video.mp4'; // Adjust if needed

export default function FishLoader() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-3xl shadow-xl ">
      {/* Background Video */}
      <video
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover blur-sm brightness-110"
      />
    </div>
  );
}
