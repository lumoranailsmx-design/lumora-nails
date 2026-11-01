import { NextRequest, NextResponse } from "next/server";
import {
  createCalendarEvent,
  eventBounds,
  getBusinessHours,
  listCalendarEvents,
  localDateTimeToIso,
} from "@/lib/google-calendar";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function authorized(request: NextRequest): boolean {
  const secret = process.env.VAPI_TOOL_SECRET;
  return Boolean(secret) && request.headers.get("authorization") === `Bearer ${secret}`;
}

function clean(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: NextRequest) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "No autorizado." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const date = clean(body.date, 10);
    const startTime = clean(body.startTime, 5);
    const service = clean(body.service, 120);
    const customerName = clean(body.customerName, 120);
    const customerPhone = clean(body.customerPhone, 30);
    const durationMinutes = Number(body.durationMinutes ?? 80);

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(startTime)) {
      return NextResponse.json({ ok: false, error: "Fecha u hora no válida." }, { status: 400 });
    }
    if (!service || !customerName || !customerPhone) {
      return NextResponse.json({ ok: false, error: "Faltan servicio, nombre o teléfono del cliente." }, { status: 400 });
    }
    if (!Number.isInteger(durationMinutes) || durationMinutes < 15 || durationMinutes > 480) {
      return NextResponse.json({ ok: false, error: "La duración debe ser de 15 a 480 minutos." }, { status: 400 });
    }

    const hours = getBusinessHours(date);
    if (!hours) {
      return NextResponse.json({ ok: false, error: "Lumora permanece cerrado los domingos." }, { status: 409 });
    }

    const start = localDateTimeToIso(date, startTime);
    const end = new Date(Date.parse(start) + durationMinutes * 60_000).toISOString();
    const opening = Date.parse(localDateTimeToIso(date, hours.open));
    const closing = Date.parse(localDateTimeToIso(date, hours.close));
    const startMs = Date.parse(start);
    const endMs = Date.parse(end);

    if (startMs < opening || endMs > closing) {
      return NextResponse.json({ ok: false, error: "La cita debe quedar completamente dentro del horario de atención." }, { status: 409 });
    }

    // Recheck Google Calendar immediately before inserting to reduce double bookings.
    const events = await listCalendarEvents(
      localDateTimeToIso(date, hours.open),
      localDateTimeToIso(date, hours.close)
    );
    const conflict = events.some((event) => {
      const bounds = eventBounds(event);
      return bounds !== null && startMs < bounds.end && endMs > bounds.start;
    });

    if (conflict) {
      return NextResponse.json({ ok: false, error: "Ese horario acaba de ocuparse. Consulte nuevamente la disponibilidad." }, { status: 409 });
    }

    const event = await createCalendarEvent({
      summary: `Cita Lumora — ${service}`,
      description: [
        `Servicio: ${service}`,
        `Cliente: ${customerName}`,
        `Teléfono: ${customerPhone}`,
        `Duración: ${durationMinutes} minutos`,
        "Reservación creada por el asistente de Lumora Nails Studio.",
      ].join("\n"),
      start,
      end,
    });

    return NextResponse.json({
      ok: true,
      confirmed: true,
      eventId: event.id,
      service,
      customerName,
      date,
      start,
      end,
      durationMinutes,
      message: "La cita quedó registrada correctamente en Google Calendar.",
    }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Error al registrar cita en Lumora:", error);
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : "No fue posible registrar la cita." }, { status: 502 });
  }
}
