import type { AppData } from "./types";

export const site = {
  name: "Damir & Cagla Massagepraxis",
  shortName: "Damir Massage",
  place: "Garbsen",
  addressLines: [
    "Gerhart-Hauptmann-Strasse 16",
    "30826 Garbsen",
    "Deutschland",
  ],
  whatsappUrl:
    "https://wa.me/4915734368721?text=Hallo%20Damir%2C%20ich%20moechte%20gerne%20einen%20Termin%20buchen.",
  facebookUrl: "https://www.facebook.com/muho12358",
  instagramUrl: "https://www.instagram.com/reel/CxqNHj5I9kV/?igsh=MnN3Y2x0azJxMG02",
  tiktokUrl: "https://www.tiktok.com/@damirkrasnc",
};

export const initialData: AppData = {
  version: 1,
  services: [
    {
      id: "triggerpunkt-45",
      name: "Triggerpunkt Teilmassage",
      category: "Schmerz & Beweglichkeit",
      durationMinutes: 45,
      priceEuro: 40,
      description:
        "Gezielter Druck auf verspannte Muskelpunkte, um Beweglichkeit zu verbessern und akute Spannungen zu loesen.",
      active: true,
      featured: true,
    },
    {
      id: "triggerpunkt-90",
      name: "Triggerpunkt Ganzkoerper",
      category: "Schmerz & Beweglichkeit",
      durationMinutes: 90,
      priceEuro: 70,
      description:
        "Eine intensive Behandlung fuer Ruecken, Nacken, Schultern und Beine mit ruhigem Aufbau und klarer Nachruhe.",
      active: true,
      featured: true,
    },
    {
      id: "schroepfen-45",
      name: "Schroepfmassage",
      category: "Regeneration",
      durationMinutes: 45,
      priceEuro: 50,
      description:
        "Trockenes Schroepfen zur Lockerung des Gewebes und zur Aktivierung der Durchblutung.",
      active: true,
      featured: true,
    },
    {
      id: "entspannung-45",
      name: "Entspannungsmassage",
      category: "Ruhe & Ausgleich",
      durationMinutes: 45,
      priceEuro: 40,
      description:
        "Eine wohltuende Massage fuer mehr Ruhe, Koerpergefuehl und Abstand vom Alltag.",
      active: true,
      featured: true,
    },
    {
      id: "gutschein-60",
      name: "Gutschein Massage",
      category: "Geschenk",
      durationMinutes: 60,
      priceEuro: 50,
      description:
        "Massagezeit als Geschenk, auf Wunsch schoen verpackt und vor Ort erhaeltlich.",
      active: true,
      featured: false,
    },
    {
      id: "schwangerschaft",
      name: "Schwangerschaftsmassage",
      category: "Sanfte Behandlung",
      durationMinutes: 45,
      priceEuro: 40,
      description:
        "Sanft abgestimmte Massage fuer werdende Muetter. Details werden vor dem Termin individuell besprochen.",
      active: true,
      featured: false,
    },
  ],
  hours: [
    { day: 1, label: "Montag", enabled: true, open: "09:00", close: "18:00" },
    { day: 2, label: "Dienstag", enabled: true, open: "09:00", close: "18:00" },
    { day: 3, label: "Mittwoch", enabled: true, open: "09:00", close: "18:00" },
    { day: 4, label: "Donnerstag", enabled: true, open: "09:00", close: "18:00" },
    { day: 5, label: "Freitag", enabled: true, open: "09:00", close: "17:00" },
    { day: 6, label: "Samstag", enabled: false, open: "10:00", close: "14:00" },
    { day: 0, label: "Sonntag", enabled: false, open: "10:00", close: "14:00" },
  ],
  bookings: [],
  blocks: [],
  settings: {
    timezone: "Europe/Berlin",
    slotStepMinutes: 15,
    bufferMinutes: 15,
    externalCalendarIcsUrl: "",
    whatsappPhone: "4915734368721",
    phoneDisplay: "0157 34368 721",
    email: "damir-cagla@hotmail.de",
    address: "Gerhart-Hauptmann-Strasse 16, 30826 Garbsen",
    bookingNotice:
      "Ihre Buchung ist verbindlich vorgemerkt. Bezahlt wird aktuell vor Ort in der Praxis.",
  },
};
