import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Lumora Slots API funcionando",
    timezone: "America/Mexico_City",
  });
}
