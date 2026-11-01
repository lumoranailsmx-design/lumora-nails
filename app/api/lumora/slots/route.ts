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

function formatTime(value: number): string {
  return new Intl.DateTimeFormat("es-MX", {
    timeZone: "America/Mexico_City",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(value));
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const date = typeof body.date === "string" ? body.date : "";

    if (!/^\\d{4}-\\d{2}-\\d{2}$/.test(date)) {
      return NextResponse.json(
        { ok: false, error: "Indique una fecha válida en formato YYYY-MM-DD." },
        { status: 400 }
      );
    }

    const hours = getBusinessHours(date);
    if (!hours) {
      return NextResponse.json({
        ok: true,
        date,
        timezone: "America/Mexico_City",
        availabilityStatus: "request_only",
        businessHours: null,
        busyPeriods: [],
        message: "Lumora permanece cerrado los domingos. No se pueden solicitar citas para este día.",
      }, { headers: { "Cache-Control": "no-store" } });
    }

    const dayStart = localDateTimeToIso(date, hours.open);
    const dayEnd = localDateTimeToIso(date, hours.close);
    const events = await listCalendarEvents(dayStart, dayEnd);
    const busyPeriods = events
      .map((event) => eventBounds(event))
      .filter((value): value is { start: number; end: number } => value !== null)
      .map(({ start, end }) => ({
        start: formatTime(start),
        end: formatTime(end),
      }))
      .sort((a, b) => a.start.localeCompare(b.start));

    return NextResponse.json({
      ok: true,
      date,
      timezone: "America/Mexico_City",
      availabilityStatus: "request_only",
      businessHours: hours,
      busyPeriods,
      message: "Estos periodos muestran únicamente eventos ocupados en Google Calendar. Como la duración depende del servicio y de la manicurista, no se calculan ni garantizan horarios disponibles. Registre la hora preferida de la clienta como solicitud pendiente de confirmación del personal.",
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Error al consultar espacios de Lumora:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "No fue posible consultar la disponibilidad." },
      { status: 502 }
    );
  }
}
