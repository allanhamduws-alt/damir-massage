"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowLeft, LogIn } from "lucide-react";
import { loginAction } from "../actions";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    
    setLoading(true);
    setError("");

    try {
      const res = await loginAction(password);
      if (res.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError(res.error || "Ungültiges Passwort.");
      }
    } catch (err) {
      setError("Ein unerwarteter Fehler ist aufgetreten.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#12110F] text-[#F4F1EA] flex flex-col items-center justify-center px-6 py-12 font-sans">
      <div className="max-w-md w-full bg-[#1A1816] rounded-sm border border-[#C5A880]/20 p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#C5A880]/60"></div>
        
        <div className="text-center mb-8">
          <span className="text-[10px] uppercase tracking-widest text-[#A8A398]">Interner Bereich</span>
          <h1 className="font-serif text-3xl text-[#C5A880] mt-1 mb-2">Admin-Bereich</h1>
          <p className="text-[#A8A398] text-xs">Bitte geben Sie Ihr Passwort ein, um fortzufahren.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-xs rounded-sm text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1.5">Passwort</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#A8A398]" />
              <input
                type="password"
                required
                placeholder="Passwort eingeben"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-11 pr-4 text-sm focus:border-[#C5A880] focus:outline-none transition-colors text-center font-mono tracking-widest"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C5A880] hover:bg-[#D4AF37] disabled:bg-[#C5A880]/50 text-[#12110F] font-bold py-3.5 px-6 rounded-sm text-sm uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 shadow-lg shadow-[#C5A880]/5"
          >
            {loading ? "Wird überprüft..." : (
              <>
                Einloggen <LogIn className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#A8A398] hover:text-[#C5A880] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Zurück zur Webseite
          </a>
        </div>
      </div>
    </div>
  );
}
