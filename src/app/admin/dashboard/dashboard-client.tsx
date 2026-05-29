"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { 
  Calendar, Clock, Settings, BookOpen, User, Phone, 
  Trash2, XCircle, Plus, Save, LogOut, CheckCircle, 
  AlertTriangle, Shield, Check, Mail, Globe, MapPin, Eye, EyeOff
} from "lucide-react";
import type { AppData, Booking, Service, BusinessHour, StudioSettings, ManualBlock } from "@/lib/types";
import { 
  logoutAction, 
  updateSettingsAction, 
  updateHoursAction, 
  cancelBookingAction, 
  createBlockAction, 
  deleteBlockAction, 
  saveServiceAction 
} from "../actions";

export default function AdminDashboardClient({ initialData }: { initialData: AppData }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"bookings" | "blocks" | "hours" | "services" | "settings">("bookings");
  const [isPending, startTransition] = useTransition();
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Local state initialized with server data
  const [settings, setSettings] = useState<StudioSettings>(initialData.settings);
  const [hours, setHours] = useState<BusinessHour[]>(initialData.hours);
  const [services, setServices] = useState<Service[]>(initialData.services);
  
  // Selected Service to Edit
  const [editingService, setEditingService] = useState<Service | null>(null);

  // New Block Form
  const [newBlockTitle, setNewBlockTitle] = useState("");
  const [newBlockDate, setNewBlockDate] = useState("");
  const [newBlockStart, setNewBlockStart] = useState("09:00");
  const [newBlockEnd, setNewBlockEnd] = useState("10:00");

  const showStatus = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 3000);
  };

  const showError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(""), 4000);
  };

  // 1. Cancel Booking
  const handleCancelBooking = async (id: string) => {
    if (!confirm("Möchten Sie diesen Termin wirklich stornieren? Der Kunde erhält eine E-Mail-Stornierung.")) return;
    
    startTransition(async () => {
      try {
        const res = await cancelBookingAction(id);
        if (res.success) {
          showStatus("Termin erfolgreich storniert.");
          router.refresh();
        }
      } catch (err) {
        showError("Fehler beim Stornieren.");
      }
    });
  };

  // 2. Add Block
  const handleAddBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockDate || !newBlockStart || !newBlockEnd) {
      showError("Bitte alle Pflichtfelder für die Sperrzeit ausfüllen.");
      return;
    }

    const startsAt = `${newBlockDate}T${newBlockStart}:00`;
    const endsAt = `${newBlockDate}T${newBlockEnd}:00`;

    if (new Date(startsAt) >= new Date(endsAt)) {
      showError("Das Ende der Sperrzeit muss nach dem Beginn liegen.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await createBlockAction(newBlockTitle || "Manuelle Sperre", startsAt, endsAt);
        if (res.success) {
          showStatus("Sperrzeit erfolgreich angelegt.");
          setNewBlockTitle("");
          setNewBlockDate("");
          router.refresh();
        }
      } catch (err) {
        showError("Fehler beim Erstellen der Sperrzeit.");
      }
    });
  };

  // 3. Delete Block
  const handleDeleteBlock = async (id: string) => {
    if (!confirm("Diese Sperrzeit wieder freigeben?")) return;
    startTransition(async () => {
      try {
        const res = await deleteBlockAction(id);
        if (res.success) {
          showStatus("Sperrzeit entfernt.");
          router.refresh();
        }
      } catch (err) {
        showError("Fehler beim Löschen.");
      }
    });
  };

  // 4. Save Hours
  const handleSaveHours = async () => {
    startTransition(async () => {
      try {
        const res = await updateHoursAction(hours);
        if (res.success) {
          showStatus("Öffnungszeiten erfolgreich gespeichert.");
          router.refresh();
        }
      } catch (err) {
        showError("Fehler beim Speichern der Öffnungszeiten.");
      }
    });
  };

  // 5. Update Daily Hour Row
  const handleHourRowChange = (index: number, key: keyof BusinessHour, value: any) => {
    const updated = [...hours];
    updated[index] = {
      ...updated[index],
      [key]: value
    };
    setHours(updated);
  };

  // 6. Save Service
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;

    startTransition(async () => {
      try {
        const res = await saveServiceAction(editingService);
        if (res.success) {
          showStatus("Leistung erfolgreich gespeichert.");
          setEditingService(null);
          router.refresh();
          // Update local state list
          const list = [...services];
          const idx = list.findIndex((s) => s.id === editingService.id);
          if (idx !== -1) {
            list[idx] = editingService;
          } else {
            list.push(editingService);
          }
          setServices(list);
        }
      } catch (err) {
        showError("Fehler beim Speichern der Leistung.");
      }
    });
  };

  // 7. Save Settings
  const handleSaveSettings = async () => {
    startTransition(async () => {
      try {
        const res = await updateSettingsAction(settings);
        if (res.success) {
          showStatus("Einstellungen erfolgreich gespeichert.");
          router.refresh();
        }
      } catch (err) {
        showError("Fehler beim Speichern der Einstellungen.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#12110F] text-[#F4F1EA] flex flex-col font-sans">
      
      {/* Admin Nav */}
      <header className="sticky top-0 z-30 w-full bg-[#1A1816] border-b border-[#C5A880]/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-[#C5A880]" />
          <div>
            <span className="font-serif text-lg text-[#C5A880]">Massagepraxis Admin</span>
            <span className="text-[10px] bg-[#C5A880]/15 text-[#C5A880] px-2 py-0.5 border border-[#C5A880]/20 rounded-full font-bold ml-2">MVP v1</span>
          </div>
        </div>

        <button 
          onClick={() => logoutAction()}
          className="text-xs uppercase tracking-widest text-[#A8A398] hover:text-red-400 font-semibold flex items-center gap-2 transition-colors cursor-pointer"
        >
          Ausloggen <LogOut className="w-4 h-4" />
        </button>
      </header>

      {/* Admin Content Layout */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 flex flex-col gap-1 bg-[#1A1816] p-4 rounded-sm border border-[#C5A880]/10 h-fit">
          <button
            onClick={() => { setActiveTab("bookings"); setEditingService(null); }}
            className={`w-full text-left py-3 px-4 rounded-sm text-sm font-medium transition-colors flex items-center gap-3 ${
              activeTab === "bookings" ? "bg-[#C5A880] text-[#12110F] font-bold" : "hover:bg-white/5 text-[#A8A398] hover:text-[#F4F1EA]"
            }`}
          >
            <Calendar className="w-4 h-4" /> Termine
          </button>
          
          <button
            onClick={() => { setActiveTab("blocks"); setEditingService(null); }}
            className={`w-full text-left py-3 px-4 rounded-sm text-sm font-medium transition-colors flex items-center gap-3 ${
              activeTab === "blocks" ? "bg-[#C5A880] text-[#12110F] font-bold" : "hover:bg-white/5 text-[#A8A398] hover:text-[#F4F1EA]"
            }`}
          >
            <Clock className="w-4 h-4" /> Sperrzeiten
          </button>

          <button
            onClick={() => { setActiveTab("hours"); setEditingService(null); }}
            className={`w-full text-left py-3 px-4 rounded-sm text-sm font-medium transition-colors flex items-center gap-3 ${
              activeTab === "hours" ? "bg-[#C5A880] text-[#12110F] font-bold" : "hover:bg-white/5 text-[#A8A398] hover:text-[#F4F1EA]"
            }`}
          >
            <Clock className="w-4 h-4" /> Öffnungszeiten
          </button>

          <button
            onClick={() => { setActiveTab("services"); setEditingService(null); }}
            className={`w-full text-left py-3 px-4 rounded-sm text-sm font-medium transition-colors flex items-center gap-3 ${
              activeTab === "services" ? "bg-[#C5A880] text-[#12110F] font-bold" : "hover:bg-white/5 text-[#A8A398] hover:text-[#F4F1EA]"
            }`}
          >
            <BookOpen className="w-4 h-4" /> Leistungen
          </button>

          <button
            onClick={() => { setActiveTab("settings"); setEditingService(null); }}
            className={`w-full text-left py-3 px-4 rounded-sm text-sm font-medium transition-colors flex items-center gap-3 ${
              activeTab === "settings" ? "bg-[#C5A880] text-[#12110F] font-bold" : "hover:bg-white/5 text-[#A8A398] hover:text-[#F4F1EA]"
            }`}
          >
            <Settings className="w-4 h-4" /> Einstellungen
          </button>

          <div className="border-t border-[#C5A880]/10 mt-6 pt-4 text-center">
            <a 
              href="/" 
              target="_blank" 
              className="text-xs text-[#C5A880] hover:underline uppercase tracking-widest font-bold inline-flex items-center gap-1.5"
            >
              Live-Webseite <Globe className="w-3.5 h-3.5" />
            </a>
          </div>
        </aside>

        {/* Action Panel area */}
        <main className="lg:col-span-9 flex flex-col gap-6">
          
          {/* Notification Toasts */}
          {statusMsg && (
            <div className="p-4 bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#C5A880] text-sm rounded-sm flex items-center gap-3 animate-fade-in">
              <Check className="w-5 h-5" /> {statusMsg}
            </div>
          )}

          {errorMsg && (
            <div className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-sm rounded-sm flex items-center gap-3 animate-fade-in">
              <AlertTriangle className="w-5 h-5" /> {errorMsg}
            </div>
          )}

          {/* TAB 1: Bookings list */}
          {activeTab === "bookings" && (
            <div className="glass-panel p-6 sm:p-8 rounded-sm">
              <h2 className="font-serif text-2xl text-[#C5A880] mb-6">Buchungen</h2>
              
              {initialData.bookings.length === 0 ? (
                <div className="py-12 text-center text-[#A8A398] text-sm border border-dashed border-white/10 rounded-sm">
                  Es sind noch keine Buchungen im System vorhanden.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-[#C5A880]/20 text-[#A8A398] uppercase tracking-wider text-[10px]">
                        <th className="pb-3 font-semibold">Kunde</th>
                        <th className="pb-3 font-semibold">Termin</th>
                        <th className="pb-3 font-semibold">Leistung</th>
                        <th className="pb-3 font-semibold text-center">Status</th>
                        <th className="pb-3 font-semibold text-right">Aktionen</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {initialData.bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-4">
                            <p className="font-bold text-[#F4F1EA]">{booking.customerName}</p>
                            <p className="text-xs text-[#A8A398] flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3" /> {booking.customerPhone}</p>
                            {booking.customerEmail && <p className="text-xs text-[#A8A398] flex items-center gap-1 mt-0.5"><Mail className="w-3 h-3" /> {booking.customerEmail}</p>}
                          </td>
                          <td className="py-4 font-medium">
                            <p>{new Date(booking.startsAt).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}</p>
                            <p className="text-xs text-[#C5A880]">{new Date(booking.startsAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr</p>
                          </td>
                          <td className="py-4">
                            <p className="font-semibold text-xs bg-[#C5A880]/10 border border-[#C5A880]/20 rounded-sm px-2 py-0.5 w-fit text-[#C5A880]">
                              {booking.serviceName}
                            </p>
                            {booking.note && <p className="text-xs text-[#A8A398] italic mt-1 max-w-[200px] truncate" title={booking.note}>Notiz: {booking.note}</p>}
                          </td>
                          <td className="py-4 text-center">
                            <span className={`inline-block text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wide border ${
                              booking.status === "confirmed" 
                                ? "bg-green-950/30 text-green-400 border-green-500/20" 
                                : "bg-red-950/30 text-red-400 border-red-500/20"
                            }`}>
                              {booking.status === "confirmed" ? "Bestätigt" : "Storniert"}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            {booking.status === "confirmed" && (
                              <button
                                onClick={() => handleCancelBooking(booking.id)}
                                className="text-red-400 hover:text-red-300 font-bold text-xs uppercase tracking-wider bg-red-950/10 hover:bg-red-950/30 border border-red-500/20 px-3 py-1.5 rounded-sm transition-all"
                              >
                                Stornieren
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Manual Blocks */}
          {activeTab === "blocks" && (
            <div className="space-y-6">
              {/* Form to Create New Block */}
              <div className="glass-panel p-6 sm:p-8 rounded-sm">
                <h2 className="font-serif text-2xl text-[#C5A880] mb-6">Sperrzeit anlegen</h2>
                
                <form onSubmit={handleAddBlock} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Grund / Titel (z.B. Urlaub)</label>
                    <input
                      type="text"
                      placeholder="z. B. Pause / Privater Termin"
                      value={newBlockTitle}
                      onChange={(e) => setNewBlockTitle(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-3 text-sm focus:border-[#C5A880] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Datum *</label>
                    <input
                      type="date"
                      required
                      value={newBlockDate}
                      onChange={(e) => setNewBlockDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-3 text-sm focus:border-[#C5A880] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Von *</label>
                      <input
                        type="time"
                        required
                        value={newBlockStart}
                        onChange={(e) => setNewBlockStart(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-2 text-xs focus:border-[#C5A880] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Bis *</label>
                      <input
                        type="time"
                        required
                        value={newBlockEnd}
                        onChange={(e) => setNewBlockEnd(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-2 text-xs focus:border-[#C5A880] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4 mt-2 text-right">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#D4AF37] text-[#12110F] font-bold py-2.5 px-6 rounded-sm text-xs uppercase tracking-wider transition-colors shadow-lg shadow-[#C5A880]/5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Sperre Speichern
                    </button>
                  </div>
                </form>
              </div>

              {/* List of Blocks */}
              <div className="glass-panel p-6 sm:p-8 rounded-sm">
                <h3 className="font-serif text-xl text-[#C5A880] mb-6">Bestehende Sperrzeiten</h3>

                {initialData.blocks.length === 0 ? (
                  <div className="py-12 text-center text-[#A8A398] text-sm border border-dashed border-white/10 rounded-sm">
                    Keine manuellen Sperrzeiten eingerichtet.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {initialData.blocks.map((block) => (
                      <div 
                        key={block.id} 
                        className="p-4 bg-white/5 border border-white/10 rounded-sm flex items-center justify-between hover:border-red-500/30 transition-colors"
                      >
                        <div>
                          <p className="font-bold text-[#F4F1EA]">{block.title}</p>
                          <p className="text-xs text-[#A8A398] mt-1 font-semibold">
                            {new Date(block.startsAt).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}
                          </p>
                          <p className="text-xs text-[#C5A880] mt-0.5">
                            {new Date(block.startsAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr - {new Date(block.endsAt).toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" })} Uhr
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteBlock(block.id)}
                          className="text-red-400 hover:text-red-300 p-2 hover:bg-red-950/20 rounded border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: Business Hours */}
          {activeTab === "hours" && (
            <div className="glass-panel p-6 sm:p-8 rounded-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-2xl text-[#C5A880]">Öffnungszeiten</h2>
                <button
                  onClick={handleSaveHours}
                  disabled={isPending}
                  className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#D4AF37] text-[#12110F] font-bold py-2.5 px-6 rounded-sm text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Änderungen Speichern
                </button>
              </div>

              <div className="space-y-4">
                {hours.map((hour, index) => (
                  <div 
                    key={hour.day} 
                    className={`p-4 rounded-sm border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                      hour.enabled ? "bg-white/5 border-white/10" : "bg-black/20 border-transparent opacity-40"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={hour.enabled}
                        onChange={(e) => handleHourRowChange(index, "enabled", e.target.checked)}
                        className="w-4 h-4 rounded bg-[#12110F] border-[#C5A880]/30 text-[#C5A880] focus:ring-[#C5A880] focus:ring-opacity-25"
                      />
                      <span className="font-bold text-sm min-w-[100px]">{hour.label}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#A8A398]">Geöffnet von:</span>
                      <input
                        type="time"
                        disabled={!hour.enabled}
                        value={hour.open}
                        onChange={(e) => handleHourRowChange(index, "open", e.target.value)}
                        className="bg-[#12110F] border border-white/10 rounded-sm py-1.5 px-2 text-xs text-[#F4F1EA] focus:border-[#C5A880] focus:outline-none disabled:opacity-50"
                      />
                      <span className="text-xs text-[#A8A398]">bis:</span>
                      <input
                        type="time"
                        disabled={!hour.enabled}
                        value={hour.close}
                        onChange={(e) => handleHourRowChange(index, "close", e.target.value)}
                        className="bg-[#12110F] border border-white/10 rounded-sm py-1.5 px-2 text-xs text-[#F4F1EA] focus:border-[#C5A880] focus:outline-none disabled:opacity-50"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Services configuration */}
          {activeTab === "services" && (
            <div className="space-y-6">
              
              {/* Form to Edit or Add Service */}
              {editingService ? (
                <div className="glass-panel p-6 sm:p-8 rounded-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-serif text-2xl text-[#C5A880]">
                      {editingService.id ? "Leistung bearbeiten" : "Neue Leistung anlegen"}
                    </h2>
                    <button 
                      onClick={() => setEditingService(null)}
                      className="text-xs uppercase tracking-widest text-[#A8A398] hover:text-[#C5A880] font-semibold cursor-pointer"
                    >
                      Abbrechen
                    </button>
                  </div>

                  <form onSubmit={handleSaveService} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Name der Leistung *</label>
                        <input
                          type="text"
                          required
                          value={editingService.name}
                          onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-3 text-sm focus:border-[#C5A880] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Kategorie *</label>
                        <input
                          type="text"
                          required
                          placeholder="z. B. Ruhe & Ausgleich"
                          value={editingService.category}
                          onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-3 text-sm focus:border-[#C5A880] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Dauer (in Minuten) *</label>
                        <input
                          type="number"
                          required
                          value={editingService.durationMinutes}
                          onChange={(e) => setEditingService({ ...editingService, durationMinutes: Number(e.target.value) })}
                          className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-3 text-sm focus:border-[#C5A880] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Preis (in €) *</label>
                        <input
                          type="number"
                          required
                          value={editingService.priceEuro}
                          onChange={(e) => setEditingService({ ...editingService, priceEuro: Number(e.target.value) })}
                          className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-3 text-sm focus:border-[#C5A880] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Kurze Beschreibung *</label>
                      <textarea
                        required
                        rows={3}
                        value={editingService.description}
                        onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-3 text-sm focus:border-[#C5A880] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="flex gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingService.active}
                          onChange={(e) => setEditingService({ ...editingService, active: e.target.checked })}
                          className="w-4 h-4 rounded bg-[#12110F] border-[#C5A880]/30 text-[#C5A880]"
                        />
                        <span className="text-xs uppercase tracking-wider text-[#A8A398]">Aktiviert (auf Webseite anzeigen)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingService.featured}
                          onChange={(e) => setEditingService({ ...editingService, featured: e.target.checked })}
                          className="w-4 h-4 rounded bg-[#12110F] border-[#C5A880]/30 text-[#C5A880]"
                        />
                        <span className="text-xs uppercase tracking-wider text-[#A8A398]">Hervorheben</span>
                      </label>
                    </div>

                    <div className="text-right pt-4 border-t border-white/5">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#D4AF37] text-[#12110F] font-bold py-2.5 px-6 rounded-sm text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
                      >
                        <Save className="w-4 h-4" /> Leistung Speichern
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}

              {/* Services List Table */}
              <div className="glass-panel p-6 sm:p-8 rounded-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-serif text-2xl text-[#C5A880]">Angebote & Preise</h2>
                  <button
                    onClick={() => setEditingService({
                      id: Math.random().toString(36).substring(2, 9),
                      name: "",
                      category: "",
                      durationMinutes: 45,
                      priceEuro: 40,
                      description: "",
                      active: true,
                      featured: false
                    })}
                    className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#D4AF37] text-[#12110F] font-bold py-2 px-4 rounded-sm text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Neue Leistung
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <div 
                      key={service.id} 
                      className={`p-5 rounded-sm border flex flex-col justify-between gap-4 transition-colors ${
                        service.active ? "bg-white/5 border-white/10" : "bg-black/20 border-transparent opacity-40"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-[#C5A880]">{service.category}</span>
                          <h4 className="font-bold text-base mt-1 flex items-center gap-2">
                            {service.name}
                            {!service.active && <EyeOff className="w-3.5 h-3.5 text-red-400" />}
                          </h4>
                          <p className="text-xs text-[#A8A398] mt-2 line-clamp-2">{service.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-serif font-bold text-lg text-[#C5A880]">{service.priceEuro} €</p>
                          <p className="text-xs text-[#A8A398] mt-0.5">{service.durationMinutes} Min.</p>
                        </div>
                      </div>

                      <div className="border-t border-[#C5A880]/10 pt-3 flex justify-between items-center mt-auto">
                        <span className="text-[10px] text-[#A8A398]">
                          {service.featured ? "Hervorgehoben" : "Standard"}
                        </span>
                        <button
                          onClick={() => setEditingService(service)}
                          className="text-[#C5A880] hover:text-[#D4AF37] font-semibold text-xs uppercase tracking-widest cursor-pointer"
                        >
                          Bearbeiten
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: Studio Settings */}
          {activeTab === "settings" && (
            <div className="glass-panel p-6 sm:p-8 rounded-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-2xl text-[#C5A880]">Praxis-Einstellungen</h2>
                <button
                  onClick={handleSaveSettings}
                  disabled={isPending}
                  className="inline-flex items-center gap-2 bg-[#C5A880] hover:bg-[#D4AF37] text-[#12110F] font-bold py-2.5 px-6 rounded-sm text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Einstellungen Speichern
                </button>
              </div>

              <div className="space-y-6">
                
                {/* ICS sync URL field */}
                <div className="p-4 bg-white/5 border border-[#C5A880]/15 rounded-sm">
                  <div className="flex items-center gap-2 mb-2 text-[#C5A880]">
                    <Calendar className="w-5 h-5" />
                    <h3 className="font-bold text-sm">Kalender-Synchronisation (Outlook / Google)</h3>
                  </div>
                  <p className="text-xs text-[#A8A398] leading-relaxed mb-4">
                    Fügen Sie den veröffentlichten **ICS-Link** Ihres Hotmail/Outlook-Kalenders (oder Google-Kalenders) ein. 
                    Unser System prüft diesen Kalender bei jeder Buchungsanfrage im Hintergrund und blockiert automatisch Termine, an denen Sie beschäftigt sind.
                  </p>
                  
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Privater Kalender ICS-URL</label>
                    <input
                      type="url"
                      placeholder="https://outlook.live.com/owa/calendar/.../calendar.ics"
                      value={settings.externalCalendarIcsUrl}
                      onChange={(e) => setSettings({ ...settings, externalCalendarIcsUrl: e.target.value })}
                      className="w-full bg-[#12110F] border border-white/10 rounded-sm py-2.5 px-3 text-xs focus:border-[#C5A880] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Contact data grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">E-Mail für Benachrichtigungen</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-[#A8A398]" />
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 pl-10 pr-4 text-xs focus:border-[#C5A880] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">WhatsApp Telefonnummer (International)</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-[#A8A398]" />
                      <input
                        type="text"
                        value={settings.whatsappPhone}
                        onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 pl-10 pr-4 text-xs focus:border-[#C5A880] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Telefon Display Text</label>
                    <input
                      type="text"
                      value={settings.phoneDisplay}
                      onChange={(e) => setSettings({ ...settings, phoneDisplay: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-3 text-xs focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Praxis-Adresse</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#A8A398]" />
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 pl-10 pr-4 text-xs focus:border-[#C5A880] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Buffer Settings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Pufferzeit zwischen Terminen (in Min.)</label>
                    <input
                      type="number"
                      value={settings.bufferMinutes}
                      onChange={(e) => setSettings({ ...settings, bufferMinutes: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-3 text-xs focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Kalenderschrittweite (in Min.)</label>
                    <input
                      type="number"
                      value={settings.slotStepMinutes}
                      onChange={(e) => setSettings({ ...settings, slotStepMinutes: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-3 text-xs focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Buchungsnotiz (Bestätigungstext)</label>
                  <textarea
                    rows={2}
                    value={settings.bookingNotice}
                    onChange={(e) => setSettings({ ...settings, bookingNotice: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-sm py-2.5 px-3 text-xs focus:border-[#C5A880] focus:outline-none"
                  />
                </div>

              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
