"use client";

import { useState, useEffect, useRef } from "react";
import { Award, Shield, Eye, X, ZoomIn, Calendar, Star, Check } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  subtitle: string;
  recipient: string;
  date: string;
  issuer: string;
  accreditation: string;
  inhalte: string[];
  gold: boolean;
  image: string;
}

export default function CertificateShowcase({ certificates }: { certificates: Certificate[] }) {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [hasIntersected, setHasIntersected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to trigger elegant, staggered scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full relative">
      
      {/* Light-filled Premium Fullscreen Lightbox Modal */}
      {activeCert && (
        <div 
          onClick={() => setActiveCert(null)}
          className="fixed inset-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-6 cursor-zoom-out animate-fade-in"
        >
          {/* Modal Header */}
          <div className="w-full max-w-4xl flex justify-between items-center mb-4 px-2">
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#B69668] font-bold">{activeCert.issuer}</span>
              <h3 className="font-serif text-lg sm:text-xl text-[#2D2B28] leading-tight">{activeCert.title}</h3>
            </div>
            <button 
              onClick={() => setActiveCert(null)}
              className="p-2 rounded-full bg-[#FFFFFF] hover:bg-[#EFEBE4] text-[#2D2B28] transition-colors border border-[#B69668]/15 shadow-md flex items-center justify-center cursor-pointer"
              aria-label="Schließen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Certificate Image Frame */}
          <div className="relative max-w-3xl max-h-[75vh] w-full h-full flex items-center justify-center">
            <img 
              src={activeCert.image} 
              alt={activeCert.title} 
              className="max-w-full max-h-full object-contain border border-[#B69668]/30 shadow-2xl rounded-sm bg-white p-2"
            />
          </div>

          <div className="mt-4 text-center max-w-lg">
            <p className="text-xs text-[#6E6A64] flex items-center justify-center gap-1.5">
              Klicken zum Schließen
            </p>
          </div>
        </div>
      )}

      {/* Dynamic Staggered Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {certificates.map((cert, index) => {
          // Determine staggered delay class for scroll reveal
          const delayClass = 
            index === 0 ? "animate-delay-100" :
            index === 1 ? "animate-delay-200" :
            index === 2 ? "animate-delay-300" : "animate-delay-400";

          return (
            <div
              key={cert.id}
              onClick={() => setActiveCert(cert)}
              className={`gallery-frame group cursor-pointer spa-card flex flex-col justify-between ${
                hasIntersected ? `animate-fade-in-up ${delayClass}` : "opacity-0"
              }`}
            >
              {/* Gold Seal / Badge on top-right */}
              <div className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#B69668]/30 text-[#B69668] shadow-sm group-hover:bg-[#B69668] group-hover:text-white transition-all duration-300">
                {cert.gold ? (
                  <Star className="w-4 h-4 fill-current" />
                ) : (
                  <Award className="w-4 h-4" />
                )}
              </div>

              {/* Card Content */}
              <div className="relative z-10">
                <div className="flex flex-col gap-1 border-b border-[#B69668]/15 pb-4 mb-4 pr-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#B69668] font-bold">
                    {cert.issuer}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-[#2D2B28] group-hover:text-[#B69668] transition-colors duration-300 leading-tight">
                    {cert.title}
                  </h3>
                  <span className="text-[10px] text-[#6E6A64] font-medium flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5" /> Ausgestellt am {cert.date}
                  </span>
                </div>

                {/* Training contents list */}
                <div className="mb-6">
                  <p className="text-[10px] uppercase tracking-widest text-[#6E6A64] font-semibold mb-2">Kernkompetenzen & Lehrinhalte</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#2D2B28]">
                    {cert.inhalte.slice(0, 6).map((inhalt, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px] leading-tight text-[#6E6A64]">
                        <Check className="w-3.5 h-3.5 text-[#B69668] shrink-0" />
                        <span className="truncate">{inhalt}</span>
                      </li>
                    ))}
                    {cert.inhalte.length > 6 && (
                      <li className="text-[10px] italic text-[#B69668] font-medium mt-0.5">
                        + {cert.inhalte.length - 6} weitere Fachbereiche
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Certificate Scan Miniature Container */}
              <div className="relative mt-auto w-full aspect-[4/3] bg-[#FAF8F5] rounded border border-[#B69668]/15 overflow-hidden shadow-inner flex items-center justify-center p-2 group-hover:border-[#B69668]/45 transition-colors">
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="max-w-full max-h-full object-contain filter contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.03]" 
                  loading="lazy"
                />
                
                {/* Micro Hover Zoom Overlay */}
                <div className="absolute inset-0 bg-[#2D2B28]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-[#B69668]/20 shadow-md flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#2D2B28] font-bold transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <ZoomIn className="w-3.5 h-3.5 text-[#B69668]" /> Urkunde vergrößern
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
