"use client";

import { useState } from "react";
import { Award, GraduationCap, Calendar, CheckCircle2, ChevronRight, Star, Shield } from "lucide-react";

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
}

export default function CertificateShowcase({ certificates }: { certificates: Certificate[] }) {
  const [activeId, setActiveId] = useState(certificates[0].id);
  const activeCert = certificates.find((c) => c.id === activeId) || certificates[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      
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

      {/* Right Column: Recreated Premium Digital Certificate Frame */}
      <div className="lg:col-span-8 flex flex-col justify-center animate-fade-in" key={activeId}>
        <div className="relative p-6 sm:p-10 rounded-sm bg-[#1A1816] border border-[#C5A880]/30 shadow-2xl overflow-hidden min-h-[420px] flex flex-col justify-between">
          
          {/* Elegant gold borders & watermark background */}
          <div className="absolute inset-4 border border-[#C5A880]/15 rounded-sm pointer-events-none"></div>
          <div className="absolute inset-4.5 border-2 border-double border-[#C5A880]/10 rounded-sm pointer-events-none"></div>
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 bg-[#C5A880]/3 rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col justify-between h-full gap-8">
            
            {/* Certificate Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-1 mb-2 text-[#C5A880]">
                <Star className="w-3.5 h-3.5 fill-[#C5A880]" />
                <Star className="w-4 h-4 fill-[#C5A880]" />
                <Star className="w-3.5 h-3.5 fill-[#C5A880]" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-[#A8A398] block font-bold">{activeCert.issuer}</span>
              
              <h3 className="font-serif text-2xl sm:text-3xl text-[#C5A880] mt-1 tracking-wide uppercase leading-tight font-normal">
                ZERTIFIKAT
              </h3>
              
              <p className="text-xs text-[#A8A398] italic mt-0.5 font-serif">
                {activeCert.subtitle}
              </p>
            </div>

            {/* Recipient details */}
            <div className="text-center my-2">
              <span className="text-[9px] uppercase tracking-widest text-[#A8A398] block">Erfolgreich ausgestellt für</span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#F4F1EA] block mt-1 tracking-wide">{activeCert.recipient}</span>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C5A880]/40 to-transparent mx-auto mt-2"></div>
            </div>

            {/* Certificate Content grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 bg-black/15 p-4 rounded-sm border border-white/5">
              
              <div className="sm:col-span-8">
                <span className="text-[9px] uppercase tracking-widest text-[#C5A880] block mb-2 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Geprüfte Ausbildungsschwerpunkte
                </span>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#A8A398]">
                  {activeCert.inhalte.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 select-none">
                      <span className="w-1 h-1 bg-[#C5A880] rounded-full shrink-0"></span>
                      <span className="truncate" title={item}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="sm:col-span-4 border-t sm:border-t-0 sm:border-l border-[#C5A880]/15 pt-4 sm:pt-0 sm:pl-4 flex flex-col justify-center gap-3 text-center sm:text-left">
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-[#A8A398] block">Zertifikatsdatum</span>
                  <span className="text-xs font-semibold text-[#F4F1EA] mt-0.5 block">{activeCert.date}</span>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-widest text-[#A8A398] block">Akkreditierung</span>
                  <span className="text-[9px] text-[#A8A398] mt-0.5 block leading-snug font-mono italic">{activeCert.accreditation}</span>
                </div>
              </div>
              
            </div>

            {/* Bottom stamp */}
            <div className="flex justify-between items-center text-[10px] text-[#A8A398] border-t border-[#C5A880]/10 pt-4 mt-auto">
              <span className="italic flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#C5A880]" /> TÜV-konforme Qualifikationsnormen
              </span>
              <span className="font-semibold uppercase tracking-widest text-[#C5A880] border border-[#C5A880]/20 px-2 py-0.5 rounded-sm">
                Offiziell Verifiziert
              </span>
            </div>

          </div>
        </div>
      </div>
      
    </div>
  );
}
