"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, CheckCircle2, AlertTriangle } from "lucide-react";

export default function CancelBookingPage(props: { searchParams: Promise<{ id?: string }> }) {
  const searchParams = use(props.searchParams);
  const bookingId = searchParams.id || "";

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleCancel = async () => {
    if (!bookingId) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/booking/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookingId }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const result = await res.json();
        setError(result.error || "Stornierung fehlgeschlagen.");
      }
    } catch (err) {
      setError("Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#12110F] text-[#F4F1EA] flex flex-col items-center justify-center px-6 py-12 font-sans">
      <div className="max-w-md w-full bg-[#1A1816] rounded-sm border border-[#C5A880]/20 p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-red-600/60"></div>
        
        {!success ? (
          <div className="text-center">
            <div className="w-12 h-12 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h1 className="font-serif text-2xl text-[#F4F1EA] mb-2">Termin stornieren?</h1>
            <p className="text-[#A8A398] text-sm mb-6 leading-relaxed">
              Möchten Sie Ihren gebuchten Termin (Code: <span className="font-mono text-[#F4F1EA] font-semibold">{bookingId}</span>) wirklich stornieren? Diese Aktion kann nicht rückgängig gemacht werden.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-xs rounded-sm text-left">
                {error}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                disabled={loading || !bookingId}
                onClick={handleCancel}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800/40 text-white font-bold py-3.5 px-6 rounded-sm text-sm uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
              >
                {loading ? "Wird storniert..." : "Ja, Termin stornieren"}
              </button>
              <Link
                href="/"
                className="w-full border border-white/10 hover:border-white/20 text-[#A8A398] hover:text-[#F4F1EA] font-semibold py-3 px-6 rounded-sm text-sm uppercase tracking-wider transition-colors text-center"
              >
                Nein, Behalten
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-full flex items-center justify-center mx-auto mb-6 text-[#C5A880]">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h1 className="font-serif text-2xl text-[#C5A880] mb-2">Erfolgreich storniert</h1>
            <p className="text-[#A8A398] text-sm mb-8 leading-relaxed">
              Ihr Termin wurde erfolgreich storniert. Eine E-Mail-Bestätigung wurde an Sie und den Praxisinhaber versendet.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C5A880] hover:text-[#D4AF37] font-bold"
            >
              <ArrowLeft className="w-4 h-4" /> Zurück zur Startseite
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
