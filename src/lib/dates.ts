import type { StudioSettings } from "./types";

export function formatDateTime(value: string | Date, settings?: Pick<StudioSettings, "timezone">) {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: settings?.timezone || "Europe/Berlin",
  }).format(new Date(value));
}

export function formatTime(value: string | Date, settings?: Pick<StudioSettings, "timezone">) {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: settings?.timezone || "Europe/Berlin",
  }).format(new Date(value));
}

export function todayInputValue() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000);
}

export function intervalsOverlap(
  startA: Date,
  endA: Date,
  startB: Date,
  endB: Date,
) {
  return startA < endB && startB < endA;
}

export function localDateTime(date: string, time: string) {
  return new Date(`${date}T${time}:00`);
}
