
//desighn page
import React from "react";
import referGif from "../assets/ReferimageDesighn.gif";
import referImg from "../assets/Referimage1.jpg";
import dolphinIcon from "../assets/dolphin-icon.png";
import turtleIcon from "../assets/turtle-icon.png";
import whaleIcon from "../assets/whale-icon.png";

const Hero = () => {
  return (
    <section className="relative z-10 mt-20 flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-20 py-12 sm:py-16 bg-gradient-to-br from-[#e0f7fa] via-[#bbdefb] to-[#e1f5fe] overflow-hidden rounded-3xl shadow-xl max-w-[100vw] mx-auto">
      {/* Floating Icons */}
      <img
        src={dolphinIcon}
        alt="Dolphin"
        className="absolute top-4 left-4 w-10 sm:w-12 animate-realistic-1 opacity-70"
      />
      <img
        src={turtleIcon}
        alt="Turtle"
        className="absolute bottom-6 left-6 w-8 sm:w-10 animate-realistic-2 opacity-60"
      />
      <img
        src={whaleIcon}
        alt="Whale"
        className="absolute bottom-8 right-6 w-12 sm:w-14 animate-realistic-1 opacity-70"
      />

      {/* Left Content */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-5 sm:space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#0277bd] via-[#01579b] to-[#00bcd4] leading-tight drop-shadow-xl">
          Discover. Log. Protect.
        </h1>
        <p className="text-base sm:text-lg text-[#004d40] font-medium leading-relaxed max-w-md sm:max-w-lg">
          AquaWeb empowers ocean explorers—whale watchers, dolphin fans, sea turtle protectors, and more—to document encounters, report issues, and fuel marine conservation. Your observations can spark real change.
        </p>
        <a
          href="/register"
          className="inline-block text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#0288d1] to-[#00acc1] text-white rounded-full shadow-md hover:from-[#00acc1] hover:to-[#0288d1] transition-all duration-300"
        >
          Start Your Ocean Journey
        </a>
      </div>

      {/* Right Visual */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center mt-10 md:mt-0">
        <div className="relative bg-white/60 backdrop-blur-xl border-4 border-white rounded-2xl p-3 sm:p-4 shadow-lg w-64 sm:w-72">
          <img
            src={referGif}
            alt="Marine Animation"
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>
        <img
          src={referImg}
          alt="Marine Conservation"
          className="mt-5 rounded-xl border-2 border-[#b2ebf2] shadow-md w-full max-w-xs h-32 sm:h-40 object-cover"
        />
        <div className="flex gap-3 mt-4">
          <img src={whaleIcon} alt="Whale" className="w-8 h-8 sm:w-10 sm:h-10" />
          <img src={dolphinIcon} alt="Dolphin" className="w-8 h-8 sm:w-10 sm:h-10" />
          <img src={turtleIcon} alt="Turtle" className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
