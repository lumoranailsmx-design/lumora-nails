import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  return NextResponse.json({
    configured: !!clientId,
    prefix: clientId ? clientId.substring(0, 10) : null,
    suffix: clientId ? clientId.slice(-25) : null,
    length: clientId ? clientId.length : 0,
  });
}
