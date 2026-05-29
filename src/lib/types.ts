export type BookingStatus = "confirmed" | "cancelled";

export type Service = {
  id: string;
  name: string;
  category: string;
  durationMinutes: number;
  priceEuro: number;
  description: string;
  active: boolean;
  featured: boolean;
};

export type BusinessHour = {
  day: number;
  label: string;
  enabled: boolean;
  open: string;
  close: string;
};

export type Booking = {
  id: string;
  serviceId: string;
  serviceName: string;
  startsAt: string;
  endsAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  note: string;
  status: BookingStatus;
  createdAt: string;
};

export type ManualBlock = {
  id: string;
  title: string;
  startsAt: string;
  endsAt: string;
  createdAt: string;
};

export type StudioSettings = {
  timezone: string;
  slotStepMinutes: number;
  bufferMinutes: number;
  externalCalendarIcsUrl: string;
  whatsappPhone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  bookingNotice: string;
};

export type AppData = {
  version: number;
  services: Service[];
  hours: BusinessHour[];
  bookings: Booking[];
  blocks: ManualBlock[];
  settings: StudioSettings;
};

export type Slot = {
  startsAt: string;
  endsAt: string;
  label: string;
  available: boolean;
};
