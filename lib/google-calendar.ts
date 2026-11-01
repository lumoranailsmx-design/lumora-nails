const TIME_ZONE = process.env.GOOGLE_TIMEZONE || "America/Mexico_City";
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";

type CalendarEvent = {
  id?: string;
  summary?: string;
  status?: string;
  start?: { dateTime?: string; date?: string; timeZone?: string };
  end?: { dateTime?: string; date?: string; timeZone?: string };
};

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Falta configurar ${name} en el servidor.`);
  return value;
}

export async function getGoogleAccessToken(): Promise<string> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: requiredEnv("GOOGLE_CLIENT_ID"),
      client_secret: requiredEnv("GOOGLE_CLIENT_SECRET"),
      refresh_token: requiredEnv("GOOGLE_REFRESH_TOKEN"),
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });

  const payload = await response.json();
  if (!response.ok || typeof payload.access_token !== "string") {
    console.error("No se pudo renovar el acceso de Google Calendar.", {
      status: response.status,
      error: payload.error,
    });
    throw new Error("No fue posible conectar con Google Calendar.");
  }
  return payload.access_token;
}

async function calendarRequest<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const accessToken = await getGoogleAccessToken();
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}${path}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        ...init.headers,
      },
      cache: "no-store",
    }
  );

  const payload = await response.json();
  if (!response.ok) {
    console.error("Google Calendar API respondió con error.", {
      status: response.status,
      reason: payload.error?.errors?.[0]?.reason,
    });
    throw new Error("Google Calendar no pudo completar la operación.");
  }
  return payload as T;
}

export function localDateTimeToIso(date: string, time: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const clock = /^(\d{2}):(\d{2})$/.exec(time);
  if (!match || !clock) throw new Error("Fecha u hora no válida.");

  const [, y, m, d] = match;
  const [, hh, mm] = clock;
  const year = Number(y);
  const month = Number(m);
  const day = Number(d);
  const hour = Number(hh);
  const minute = Number(mm);

  const check = new Date(Date.UTC(year, month - 1, day));
  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() !== month - 1 ||
    check.getUTCDate() !== day ||
    hour > 23 ||
    minute > 59
  ) {
    throw new Error("Fecha u hora no válida.");
  }

  const target = Date.UTC(year, month - 1, day, hour, minute);
  let guess = target;
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  for (let i = 0; i < 3; i += 1) {
    const parts = Object.fromEntries(
      formatter.formatToParts(new Date(guess)).map((part) => [part.type, part.value])
    );
    const represented = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second)
    );
    guess += target - represented;
  }
  return new Date(guess).toISOString();
}

export function getBusinessHours(date: string): { open: string; close: string } | null {
  const [year, month, day] = date.split("-").map(Number);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  if (weekday === 0) return null;
  return weekday === 6 ? { open: "10:00", close: "16:00" } : { open: "10:00", close: "19:00" };
}

export async function listCalendarEvents(
  timeMin: string,
  timeMax: string
): Promise<CalendarEvent[]> {
  const params = new URLSearchParams({
    timeMin,
    timeMax,
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "2500",
    timeZone: TIME_ZONE,
  });
  const result = await calendarRequest<{ items?: CalendarEvent[] }>(
    `/events?${params.toString()}`
  );
  return (result.items || []).filter((event) => event.status !== "cancelled");
}

export function eventBounds(event: CalendarEvent): { start: number; end: number } | null {
  const startValue = event.start?.dateTime || (event.start?.date ? `${event.start.date}T00:00:00` : null);
  const endValue = event.end?.dateTime || (event.end?.date ? `${event.end.date}T00:00:00` : null);
  if (!startValue || !endValue) return null;

  const start = Date.parse(startValue);
  const end = Date.parse(endValue);
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return null;
  return { start, end };
}

export async function createCalendarEvent(input: {
  summary: string;
  description: string;
  start: string;
  end: string;
}): Promise<{ id: string; htmlLink?: string }> {
  return calendarRequest<{ id: string; htmlLink?: string }>("/events", {
    method: "POST",
    body: JSON.stringify({
      summary: input.summary,
      description: input.description,
      start: { dateTime: input.start, timeZone: TIME_ZONE },
      end: { dateTime: input.end, timeZone: TIME_ZONE },
    }),
  });
}
