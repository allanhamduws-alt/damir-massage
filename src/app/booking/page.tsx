"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Calendar as LucideCalendar, Clock, User, Phone, Mail, FileText, ArrowLeft, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import type { Service, Slot } from "@/lib/types";

export default function BookingPage(props: { searchParams: Promise<{ service?: string }> }) {
  const searchParams = use(props.searchParams);
  const preselectedServiceId = searchParams.service || "";

  // Wizard Steps: 1 = Service, 2 = Date & Time, 3 = Info, 4 = Success
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  // Form Selections
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  
  // Slots State
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Customer Info
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerNote, setCustomerNote] = useState("");

  // Submission States
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [createdBooking, setCreatedBooking] = useState<any>(null);

  // Fetch active services
  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          setServices(data.filter((s: Service) => s.active));
        }
      } catch (err) {
        console.error("Failed to load services:", err);
      } finally {
        setLoadingServices(false);
      }
    }
    fetchServices();
  }, []);

  // Pre-select service if ID is in URL
  useEffect(() => {
    if (services.length > 0 && preselectedServiceId) {
      const match = services.find((s) => s.id === preselectedServiceId);
      if (match) {
        setSelectedService(match);
        setStep(2); // Go directly to step 2 (Date & Time)
      }
    }
  }, [services, preselectedServiceId]);

  // Fetch slots when date or service changes
  useEffect(() => {
    if (!selectedDate || !selectedService) return;

    async function fetchSlots() {
      setLoadingSlots(true);
      setSelectedSlot(null);
      try {
        const res = await fetch(`/api/availability?date=${selectedDate}&serviceId=${selectedService?.id}`);
        if (res.ok) {
          const data = await res.json();
          setSlots(data);
        } else {
          setSlots([]);
        }
      } catch (err) {
        console.error("Error loading availability:", err);
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    }

    fetchSlots();
  }, [selectedDate, selectedService]);

  // Generate list of next 30 days for selection
  const getNext30Days = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const futureDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      const year = futureDate.getFullYear();
      const month = String(futureDate.getMonth() + 1).padStart(2, "0");
      const dateVal = String(futureDate.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${dateVal}`;
      
      const weekday = futureDate.toLocaleDateString("de-DE", { weekday: "short" });
      const dayLabel = futureDate.toLocaleDateString("de-DE", { day: "numeric", month: "short" });
      
      // Exclude Sundays by default in visual display
      const isSunday = futureDate.getDay() === 0;

      days.push({
        value: dateStr,
        weekday,
        label: dayLabel,
        disabled: isSunday
      });
    }
    return days;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedSlot || !customerName || !customerPhone) {
      setSubmitError("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService.id,
          startsAt: selectedSlot.startsAt,
          customerName,
          customerPhone,
          customerEmail,
          note: customerNote,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setCreatedBooking(result.booking);
        setStep(4); // Success screen
      } else {
        setSubmitError(result.error || "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.");
      }
    } catch (err) {
      setSubmitError("Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung.");
    } finally {
      setSubmitting(false);
    }
  };

  const formattedDate = (isoStr: string) => {
    return new Date(isoStr).toLocaleDateString("de-DE", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  };

  const formattedTime = (isoStr: string) => {
    return new Date(isoStr).toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit"
    }) + " Uhr";
  };

  return (
    <div className="min-h-screen bg-[#12110F] text-[#F4F1EA] flex flex-col font-sans">
      
      {/* Mini Header */}
      <header className="py-6 px-6 border-b border-[#C5A880]/15 bg-[#12110F]/90">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A8A398] hover:text-[#C5A880] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Zur Startseite
          </Link>
          <span className="font-serif text-lg text-[#C5A880]">Wunschtermin buchen</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        
        {/* Step Indicator */}
        {step < 4 && (
          <div className="mb-10 flex items-center justify-between text-xs uppercase tracking-widest text-[#A8A398]">
            <div className={`flex flex-col gap-1 items-start ${step >= 1 ? "text-[#C5A880] font-semibold" : ""}`}>
              <span>01. Auswahl</span>
              <div className={`h-0.5 w-20 bg-current transition-all mt-1`}></div>
            </div>
            <div className={`flex flex-col gap-1 items-start ${step >= 2 ? "text-[#C5A880] font-semibold" : ""}`}>
              <span>02. Datum & Zeit</span>
              <div className={`h-0.5 w-20 ${step >= 2 ? "bg-[#C5A880]" : "bg-white/10"} mt-1`}></div>
            </div>
            <div className={`flex flex-col gap-1 items-start ${step >= 3 ? "text-[#C5A880] font-semibold" : ""}`}>
              <span>03. Ihre Daten</span>
              <div className={`h-0.5 w-20 ${step >= 3 ? "bg-[#C5A880]" : "bg-white/10"} mt-1`}></div>
            </div>
          </div>
        )}

        {/* Wizard Forms */}
        <div className="glass-panel p-6 sm:p-8 rounded-sm">
          
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div>
              <h2 className="font-serif text-2xl text-[#C5A880] mb-6">Wählen Sie Ihre Behandlung</h2>
              {loadingServices ? (
                <div className="py-12 flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#C5A880]"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service);
                        setStep(2);
                      }}
                      className={`p-6 text-left rounded-sm border transition-all duration-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4 ${
                        selectedService?.id === service.id
                          ? "border-[#C5A880] bg-[#C5A880]/5"
                          : "border-white/10 hover:border-[#C5A880]/40 bg-white/5 hover:bg-white/[0.07]"
                      }`}
                    >
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-[#C5A880]">{service.category}</span>
                        <h3 className="font-serif text-lg font-semibold text-[#F4F1EA] mt-1">{service.name}</h3>
                        <p className="text-[#A8A398] text-xs sm:text-sm mt-2 max-w-xl">{service.description}</p>
                      </div>
                      <div className="flex sm:flex-col items-start sm:items-end justify-between border-t sm:border-t-0 border-[#C5A880]/10 pt-3 sm:pt-0">
                        <span className="font-serif text-lg text-[#C5A880]">{service.priceEuro} €</span>
                        <span className="text-xs text-[#A8A398] flex items-center gap-1 mt-1">
                          <Clock className="w-3.5 h-3.5" /> {service.durationMinutes} Min.
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Select Date & Time */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={() => setStep(1)} 
                  className="p-1 hover:bg-white/5 rounded text-[#A8A398] hover:text-[#C5A880] transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="font-serif text-2xl text-[#C5A880]">Wann möchten Sie kommen?</h2>
              </div>

              {selectedService && (
                <div className="mb-6 p-4 bg-white/5 rounded-sm border border-white/5 flex justify-between items-center text-sm">
                  <div>
                    <p className="text-[#A8A398] text-xs">Ausgewählte Leistung:</p>
                    <p className="font-semibold text-[#F4F1EA] mt-0.5">{selectedService.name}</p>
                  </div>
                  <button onClick={() => setStep(1)} className="text-xs uppercase tracking-widest text-[#C5A880] hover:text-[#D4AF37] font-semibold">Ändern</button>
                </div>
              )}

              {/* 1. Date Selection Grid */}
              <div className="mb-8">
                <p className="text-[#A8A398] text-xs uppercase tracking-wider mb-3">1. Datum auswählen:</p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1">
                  {getNext30Days().map((day) => (
                    <button
                      key={day.value}
                      disabled={day.disabled}
                      onClick={() => {
                        setSelectedDate(day.value);
                      }}
                      className={`p-3 rounded-sm border flex flex-col items-center justify-center transition-all ${
                        day.disabled
                          ? "opacity-20 cursor-not-allowed border-transparent"
                          : selectedDate === day.value
                          ? "border-[#C5A880] bg-[#C5A880]/10 text-[#C5A880] font-semibold"
                          : "border-white/10 hover:border-white/20 bg-white/5"
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-widest mb-1 opacity-70">{day.weekday}</span>
                      <span className="text-xs">{day.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Time Selection Grid */}
              <div>
                <p className="text-[#A8A398] text-xs uppercase tracking-wider mb-3">2. Freie Uhrzeit wählen:</p>
                
                {!selectedDate ? (
                  <div className="p-8 text-center text-[#A8A398] text-sm border border-dashed border-white/10 rounded-sm">
                    Bitte wählen Sie zuerst ein Datum aus.
                  </div>
                ) : loadingSlots ? (
                  <div className="py-12 flex flex-col justify-center items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-[#C5A880]"></div>
                    <span className="text-xs text-[#A8A398]">Freie Termine werden geladen...</span>
                  </div>
                ) : slots.length === 0 ? (
                  <div className="p-8 text-center text-[#A8A398] text-sm border border-dashed border-white/10 rounded-sm">
                    An diesem Tag sind leider keine Termine mehr verfügbar. Bitte wählen Sie ein anderes Datum.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-60 overflow-y-auto pr-1">
                    {slots.map((slot) => (
                      <button
                        key={slot.startsAt}
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 text-center text-xs rounded-sm border transition-all ${
                          !slot.available
                            ? "opacity-25 cursor-not-allowed line-through bg-black/40 border-transparent"
                            : selectedSlot?.startsAt === slot.startsAt
                            ? "border-[#C5A880] bg-[#C5A880] text-[#12110F] font-bold"
                            : "border-white/10 hover:border-[#C5A880]/60 bg-white/5"
                        }`}
                      >
                        {slot.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Navigation Action */}
              <div className="flex justify-between items-center mt-8 border-t border-[#C5A880]/15 pt-6">
                <span className="text-xs text-[#A8A398]">Schritt 2 von 3</span>
                <button
                  disabled={!selectedSlot}
                  onClick={() => setStep(3)}
                  className={`inline-flex items-center gap-2 py-3 px-6 rounded-sm text-sm uppercase tracking-wider font-bold transition-all ${
                    selectedSlot 
                      ? "bg-[#C5A880] hover:bg-[#D4AF37] text-[#12110F]"
                      : "bg-white/10 text-white/30 cursor-not-allowed"
                  }`}
                >
                  Weiter <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Customer Information */}
          {step === 3 && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={() => setStep(2)} 
                  className="p-1 hover:bg-white/5 rounded text-[#A8A398] hover:text-[#C5A880] transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="font-serif text-2xl text-[#C5A880]">Ihre Kontaktdaten</h2>
              </div>

              {/* Checkout Summary Card */}
              {selectedService && selectedSlot && (
                <div className="mb-6 p-5 bg-white/5 rounded-sm border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-[#A8A398] block uppercase text-[10px] tracking-widest">Leistung</span>
                    <span className="font-semibold text-[#F4F1EA] mt-1 block">{selectedService.name}</span>
                  </div>
                  <div>
                    <span className="text-[#A8A398] block uppercase text-[10px] tracking-widest">Datum & Zeit</span>
                    <span className="font-semibold text-[#F4F1EA] mt-1 block">{formattedDate(selectedSlot.startsAt)} um {formattedTime(selectedSlot.startsAt)}</span>
                  </div>
                  <div>
                    <span className="text-[#A8A398] block uppercase text-[10px] tracking-widest">Dauer & Preis</span>
                    <span className="font-semibold text-[#C5A880] mt-1 block">{selectedService.durationMinutes} Min. — {selectedService.priceEuro} €</span>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="mb-6 p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-sm rounded-sm">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Vorname & Nachname *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#A8A398]" />
                    <input
                      type="text"
                      required
                      placeholder="z. B. Max Mustermann"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-11 pr-4 text-sm focus:border-[#C5A880] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Telefonnummer *</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-[#A8A398]" />
                      <input
                        type="tel"
                        required
                        placeholder="z. B. 0157 34368 721"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-11 pr-4 text-sm focus:border-[#C5A880] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">E-Mail-Adresse (für Bestätigung)</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#A8A398]" />
                      <input
                        type="email"
                        placeholder="z. B. beispiel@mail.de"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-11 pr-4 text-sm focus:border-[#C5A880] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A8A398] mb-1">Besondere Wünsche oder Notizen (optional)</label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-[#A8A398]" />
                    <textarea
                      placeholder="Haben Sie Muskelbeschwerden, Schwangerschaftswochen o. Ä.?"
                      value={customerNote}
                      onChange={(e) => setCustomerNote(e.target.value)}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-11 pr-4 text-sm focus:border-[#C5A880] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-[#A8A398] leading-relaxed">
                    * Mit Absenden dieses Formulars buchen Sie den Termin verbindlich vor Ort. Eine Stornierung ist kostenfrei bis zu 24 Stunden vor dem Termin möglich. Bezahlt wird in bar oder per Karte direkt in der Praxis.
                  </p>
                </div>

                {/* Submit Actions */}
                <div className="flex justify-between items-center mt-8 border-t border-[#C5A880]/15 pt-6">
                  <span className="text-xs text-[#A8A398]">Schritt 3 von 3</span>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 py-3.5 px-8 rounded-sm bg-[#C5A880] hover:bg-[#D4AF37] text-[#12110F] font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-[#C5A880]/10"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-[#12110F]"></div>
                        Wird reserviert...
                      </>
                    ) : (
                      <>
                        Verbindlich Buchen <CheckCircle className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 4: Success Confirmation Screen */}
          {step === 4 && createdBooking && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-full flex items-center justify-center mx-auto mb-6 text-[#C5A880]">
                <Sparkles className="w-8 h-8" />
              </div>
              
              <h2 className="font-serif text-3xl text-[#C5A880] mb-2">Termin erfolgreich gebucht!</h2>
              <p className="text-[#A8A398] text-sm max-w-md mx-auto mb-8">
                Vielen Dank! Ihr Termin wurde erfolgreich reserviert. Eine Bestätigungs-E-Mail wird (sofern angegeben) an Sie versendet.
              </p>

              {/* Luxury Ticket Visual */}
              <div className="max-w-md mx-auto bg-[#1A1816] rounded-sm border border-[#C5A880]/20 p-6 text-left relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-24 h-24 bg-[#C5A880]/5 rounded-full"></div>
                
                <div className="flex justify-between items-center border-b border-[#C5A880]/10 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A880]">Buchungs-Code</span>
                    <p className="font-mono text-sm font-bold tracking-wider text-[#F4F1EA] mt-0.5">{createdBooking.id}</p>
                  </div>
                  <span className="text-xs bg-[#C5A880]/15 text-[#C5A880] font-semibold px-2.5 py-1 rounded-sm uppercase tracking-wide border border-[#C5A880]/10">Bestätigt</span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-[#A8A398] block text-[10px] uppercase tracking-widest">Kunde</span>
                    <span className="font-semibold text-[#F4F1EA] mt-0.5 block">{createdBooking.customerName}</span>
                  </div>
                  
                  <div>
                    <span className="text-[#A8A398] block text-[10px] uppercase tracking-widest">Leistung</span>
                    <span className="font-semibold text-[#F4F1EA] mt-0.5 block">{createdBooking.serviceName}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[#A8A398] block text-[10px] uppercase tracking-widest">Datum</span>
                      <span className="font-semibold text-[#F4F1EA] mt-0.5 block">{new Date(createdBooking.startsAt).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}</span>
                    </div>
                    <div>
                      <span className="text-[#A8A398] block text-[10px] uppercase tracking-widest">Uhrzeit</span>
                      <span className="font-semibold text-[#F4F1EA] mt-0.5 block">{formattedTime(createdBooking.startsAt)}</span>
                    </div>
                  </div>

                  <div className="border-t border-[#C5A880]/10 pt-4 flex justify-between items-center text-xs">
                    <span className="text-[#A8A398]">Zahlung vor Ort</span>
                    <span className="font-serif text-[#C5A880] font-bold text-base">{selectedService?.priceEuro} €</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
                <Link 
                  href="/" 
                  className="bg-[#C5A880] hover:bg-[#D4AF37] text-[#12110F] font-bold py-3 px-8 rounded-sm text-sm uppercase tracking-wider transition-all duration-300 w-full sm:w-auto text-center"
                >
                  Zurück zur Startseite
                </Link>
                <button 
                  onClick={() => window.print()}
                  className="border border-[#F4F1EA]/20 hover:border-[#C5A880] text-[#F4F1EA] hover:text-[#C5A880] font-semibold py-3 px-8 rounded-sm text-sm uppercase tracking-wider transition-colors duration-300 w-full sm:w-auto bg-white/5"
                >
                  Ticket drucken
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
