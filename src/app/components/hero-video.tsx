"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Force muted state via ref to bypass iOS/Chrome autoplay protection
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.log("Autoplay was prevented by browser policies:", err);
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover opacity-90 transition-opacity duration-1000"
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
      {/* Fallback support for older systems */}
      Your browser does not support the video tag.
    </video>
  );
}
