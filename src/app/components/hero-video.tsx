"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
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
      className="w-full h-full object-cover scale-105"
      poster="/images/hero.png"
    >
      <source
        src="https://assets.mixkit.co/videos/preview/mixkit-massage-therapist-massaging-a-client-41908-large.mp4"
        type="video/mp4"
      />
    </video>
  );
}
