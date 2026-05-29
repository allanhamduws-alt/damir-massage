import { addMinutes, formatTime, intervalsOverlap, localDateTime } from "./dates";
import { getExternalBusyIntervals } from "./calendar";
import { readData } from "./store";
import type { Slot } from "./types";

export async function getAvailability(date: string, serviceId: string): Promise<Slot[]> {
  const data = readData();
  const service = data.services.find((candidate) => candidate.id === serviceId && candidate.active);

  if (!service) return [];

  const selectedDay = new Date(`${date}T12:00:00`);
  if (Number.isNaN(selectedDay.getTime())) return [];

  const dayHours = data.hours.find((hour) => hour.day === selectedDay.getDay());
  if (!dayHours || !dayHours.enabled) return [];

  const workStart = localDateTime(date, dayHours.open);
  const workEnd = localDateTime(date, dayHours.close);
  const externalBusy = await getExternalBusyIntervals(data.settings.externalCalendarIcsUrl);
  const buffer = data.settings.bufferMinutes;

  const busy = [
    ...data.bookings
      .filter((booking) => booking.status === "confirmed")
      .map((booking) => ({
        startsAt: addMinutes(new Date(booking.startsAt), -buffer),
        endsAt: addMinutes(new Date(booking.endsAt), buffer),
      })),
    ...data.blocks.map((block) => ({
      startsAt: addMinutes(new Date(block.startsAt), -buffer),
      endsAt: addMinutes(new Date(block.endsAt), buffer),
    })),
    ...externalBusy.map((block) => ({
      startsAt: addMinutes(block.startsAt, -buffer),
      endsAt: addMinutes(block.endsAt, buffer),
    })),
  ];

  const slots: Slot[] = [];
  const latestStart = addMinutes(workEnd, -service.durationMinutes);
  const now = addMinutes(new Date(), 60);

  for (
    let cursor = new Date(workStart);
    cursor <= latestStart;
    cursor = addMinutes(cursor, data.settings.slotStepMinutes)
  ) {
    const slotEnd = addMinutes(cursor, service.durationMinutes);
    const inPast = cursor <= now;
    const overlaps = busy.some((item) =>
      intervalsOverlap(cursor, slotEnd, item.startsAt, item.endsAt),
    );

    slots.push({
      startsAt: cursor.toISOString(),
      endsAt: slotEnd.toISOString(),
      label: formatTime(cursor, data.settings),
      available: !inPast && !overlaps,
    });
  }

  return slots;
}
