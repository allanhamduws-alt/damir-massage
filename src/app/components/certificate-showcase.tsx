"use client";

import { useState } from "react";
import { Award, Shield, Eye, ZoomIn, Calendar, Star } from "lucide-react";

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
  image: string; // Direct link to 1:1 recreated colour scan image
}

export default function CertificateShowcase({ certificates }: { certificates: Certificate[] }) {
  const [activeId, setActiveId] = useState(certificates[0].id);
  const activeCert = certificates.find((c) => c.id === activeId) || certificates[0];
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
      
      {/* Fullscreen Zoom Modal */}
      {isFullscreen && (
        <div 
          onClick={() => setIsFullscreen(false)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 cursor-zoom-out animate-fade-in"
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <img 
              src={activeCert.image} 
              alt={activeCert.title} 
              className="max-w-full max-h-full object-contain border border-[#C5A880]/30 shadow-2xl rounded-sm"
            />
            <span className="absolute bottom-4 right-4 bg-black/80 text-xs px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-widest text-[#A8A398]">
              Klicken zum Schließen
            </span>
          </div>
        </div>
      )}

      {/* Left Column: Selector Menu */}
      <div className="lg:col-span-4 flex flex-col gap-3">
        <p className="text-[10px] uppercase tracking-widest text-[#A8A398] font-bold mb-1 ml-1">Zertifikat auswählen</p>
        
        <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 scrollbar-none">
          {certificates.map((cert) => (
            <button
              key={cert.id}
              onClick={() => setActiveId(cert.id)}
              className={`w-fit lg:w-full text-left py-3.5 px-4 rounded-sm border transition-all duration-300 flex flex-col gap-1 shrink-0 cursor-pointer ${
                activeId === cert.id
                  ? "border-[#C5A880] bg-[#C5A880]/15 text-[#F4F1EA] shadow-md shadow-[#C5A880]/5"
                  : "border-white/5 bg-white/5 text-[#A8A398] hover:border-white/10 hover:bg-white/[0.07] hover:text-[#F4F1EA]"
              }`}
            >
              <div className="flex items-center justify-between w-full gap-2">
                <span className="text-[9px] uppercase tracking-widest font-bold opacity-75">{cert.issuer}</span>
                <span className="text-[10px] text-[#C5A880]">{cert.date}</span>
              </div>
              <h4 className="font-serif text-sm font-semibold mt-0.5">{cert.title}</h4>
            </button>
          ))}
        </div>
      </div>

      {/* Right Column: 1:1 Scanned Certificate Image Display */}
      <div className="lg:col-span-8 flex flex-col justify-center animate-fade-in" key={activeId}>
        <div className="relative p-3 sm:p-5 rounded-sm bg-[#1A1816] border border-[#C5A880]/30 shadow-2xl flex flex-col items-center justify-between group overflow-hidden">
          
          {/* Subtle gold frames */}
          <div className="absolute inset-2.5 border border-[#C5A880]/10 rounded-sm pointer-events-none"></div>
          
          {/* Certificate Image Frame */}
          <div 
            onClick={() => setIsFullscreen(true)}
            className="relative w-full max-w-lg aspect-square bg-[#FDFBF7] rounded-sm shadow-xl overflow-hidden cursor-zoom-in border border-[#C5A880]/20 group-hover:border-[#C5A880]/40 transition-colors"
          >
            <img 
              src={activeCert.image} 
              alt={activeCert.title} 
              className="w-full h-full object-contain scale-100 hover:scale-102 transition-transform duration-500" 
            />
            {/* Hover overlay with zoom hint */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <div className="bg-[#12110F]/90 p-3 rounded-full border border-[#C5A880]/30 flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A880] font-bold">
                <ZoomIn className="w-4 h-4" /> Vergrößern
              </div>
            </div>
          </div>

          {/* Under-badge Info */}
          <div className="w-full mt-4 border-t border-[#C5A880]/10 pt-3 flex justify-between items-center text-[10px] text-[#A8A398] px-2">
            <span className="italic flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#C5A880]" /> Offizieller, farbiger 1:1 Scan
            </span>
            <button 
              onClick={() => setIsFullscreen(true)}
              className="text-[#C5A880] hover:text-[#D4AF37] font-semibold uppercase tracking-widest flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" /> Vollbild einsehen
            </button>
          </div>

        </div>
      </div>
      
    </div>
  );
}
