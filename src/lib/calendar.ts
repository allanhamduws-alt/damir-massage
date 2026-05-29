import { addMinutes } from "./dates";

type BusyInterval = {
  startsAt: Date;
  endsAt: Date;
  title: string;
};

type CalendarGlobal = typeof globalThis & {
  __damirCalendarCache?: {
    url: string;
    expiresAt: number;
    intervals: BusyInterval[];
  };
};

function unfoldIcs(text: string) {
  return text.replace(/\r?\n[ \t]/g, "");
}

function fieldValue(block: string, field: string) {
  const line = block
    .split(/\r?\n/)
    .find((candidate) => candidate.startsWith(`${field}:`) || candidate.startsWith(`${field};`));

  if (!line) return null;
  return line.slice(line.indexOf(":") + 1).trim();
}

function parseIcsDate(value: string | null) {
  if (!value) return null;
  const raw = value.trim();
  const utc = raw.endsWith("Z");
  const clean = utc ? raw.slice(0, -1) : raw;

  if (/^\d{8}$/.test(clean)) {
    const year = Number(clean.slice(0, 4));
    const month = Number(clean.slice(4, 6));
    const day = Number(clean.slice(6, 8));
    return utc
      ? new Date(Date.UTC(year, month - 1, day))
      : new Date(year, month - 1, day);
  }

  const match = clean.match(
    /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?$/,
  );

  if (!match) return null;

  const [, year, month, day, hour, minute, second = "00"] = match;
  const values = [
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
  ] as const;

  return utc ? new Date(Date.UTC(...values)) : new Date(...values);
}

function parseIcs(text: string): BusyInterval[] {
  const unfolded = unfoldIcs(text);
  const blocks = unfolded.match(/BEGIN:VEVENT[\s\S]*?END:VEVENT/g) || [];

  return blocks
    .filter((block) => fieldValue(block, "STATUS") !== "CANCELLED")
    .map((block) => {
      const start = parseIcsDate(fieldValue(block, "DTSTART"));
      const end = parseIcsDate(fieldValue(block, "DTEND")) || (start ? addMinutes(start, 60) : null);
      const summary = fieldValue(block, "SUMMARY") || "Kalendertermin";

      if (!start || !end) return null;

      return {
        startsAt: start,
        endsAt: end,
        title: summary,
      };
    })
    .filter((event): event is BusyInterval => Boolean(event));
}

export async function getExternalBusyIntervals(url: string): Promise<BusyInterval[]> {
  if (!url.trim()) return [];

  const calendarGlobal = globalThis as CalendarGlobal;
  const cache = calendarGlobal.__damirCalendarCache;

  if (cache && cache.url === url && cache.expiresAt > Date.now()) {
    return cache.intervals;
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 },
      headers: { accept: "text/calendar,text/plain,*/*" },
    });

    if (!response.ok) return [];

    const intervals = parseIcs(await response.text());
    calendarGlobal.__damirCalendarCache = {
      url,
      intervals,
      expiresAt: Date.now() + 5 * 60_000,
    };

    return intervals;
  } catch {
    return [];
  }
}
