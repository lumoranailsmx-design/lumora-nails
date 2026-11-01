import { NextRequest, NextResponse } from "next/server";
import {
  eventBounds,
  getBusinessHours,
  listCalendarEvents,
  localDateTimeToIso,
} from "@/lib/google-calendar";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function authorized(request: NextRequest): boolean {
  const secret = process.env.VAPI_TOOL_SECRET;
  if (!secret) return false;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const date = typeof body.date === "string" ? body.date : "";
    const durationMinutes = Number(body.durationMinutes ?? 80);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ ok: false, error: "Indique una fecha válida en formato YYYY-MM-DD." }, { status: 400 });
    }
    if (!Number.isInteger(durationMinutes) || durationMinutes < 15 || durationMinutes > 480) {
      return NextResponse.json({ ok: false, error: "La duración debe ser de 15 a 480 minutos." }, { status: 400 });
    }

    const hours = getBusinessHours(date);
    if (!hours) {
      return NextResponse.json({ ok: true, date, durationMinutes, slots: [], message: "Lumora permanece cerrado los domingos." });
    }

    const dayStart = localDateTimeToIso(date, hours.open);
    const dayEnd = localDateTimeToIso(date, hours.close);
    const events = await listCalendarEvents(dayStart, dayEnd);
    const busy = events.map(eventBounds).filter((value): value is { start: number; end: number } => value !== null);

    const opening = Date.parse(dayStart);
    const closing = Date.parse(dayEnd);
    const durationMs = durationMinutes * 60_000;
    const slots: Array<{ start: string; end: string; time: string; endTime: string }> = [];

    // Offer starts every 20 minutes; every proposed interval must fit fully inside business hours.
    for (let start = opening; start + durationMs <= closing; start += 20 * 60_000) {
      const end = start + durationMs;
      const overlaps = busy.some((event) => start < event.end && end > event.start);
      if (overlaps) continue;

      const startDate = new Date(start);
      const endDate = new Date(end);
      const timeFormat = new Intl.DateTimeFormat("es-MX", { timeZone: "America/Mexico_City", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
      slots.push({
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        time: timeFormat.format(startDate),
        endTime: timeFormat.format(endDate),
      });
    }

    return NextResponse.json({
      ok: true,
      date,
      timezone: "America/Mexico_City",
      durationMinutes,
      businessHours: hours,
      slots,
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Error al consultar espacios de Lumora:", error);
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "No fue posible consultar la disponibilidad." }, { status: 502 });
  }
}
