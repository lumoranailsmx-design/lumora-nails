import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    return new NextResponse(
      `Autorización cancelada o rechazada: ${error}`,
      { status: 400 }
    );
  }

  if (!code) {
    return new NextResponse(
      "Falta el código de autorización de Google.",
      { status: 400 }
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new NextResponse(
      "Faltan GOOGLE_CLIENT_ID o GOOGLE_CLIENT_SECRET en las variables de entorno.",
      { status: 500 }
    );
  }

  const redirectUri =
    "https://lumoranails.mx/api/google/oauth/callback";

  try {
    const tokenResponse = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      }
    );

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return new NextResponse(
        `Error al obtener los tokens de Google: ${JSON.stringify(tokens)}`,
        { status: 500 }
      );
    }

    const refreshToken = tokens.refresh_token;

    if (!refreshToken) {
      return new NextResponse(
        "Google no devolvió un refresh token. Vuelva a intentar la autorización.",
        { status: 500 }
      );
    }

    return new NextResponse(
      `
      <html>
        <body style="font-family: Arial; padding: 40px;">
          <h1>✅ Google Calendar autorizado</h1>
          <p>El refresh token fue obtenido correctamente.</p>
          <p><strong>IMPORTANTE:</strong> No comparta este token.</p>
          <p>Ahora debe guardarlo como variable de entorno:</p>
          <pre style="background:#f4f4f4;padding:15px;">GOOGLE_REFRESH_TOKEN</pre>
          <p>Después puede cerrar esta ventana.</p>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      }
    );
  } catch (err) {
    console.error(err);

    return new NextResponse(
      "Ocurrió un error al comunicarse con Google.",
      { status: 500 }
    );
  }
}
