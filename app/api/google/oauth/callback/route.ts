
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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
        cache: "no-store",
      }
    );

    const tokens = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Error en intercambio OAuth:", {
        status: tokenResponse.status,
        error: tokens.error,
      });

      return new NextResponse(
        "Google no pudo completar la autorización. Revise las credenciales OAuth.",
        { status: 500 }
      );
    }

    const refreshToken = tokens.refresh_token;

    if (!refreshToken) {
      return new NextResponse(
        "Google no devolvió un refresh token. Intente revocar el acceso anterior y autorizar nuevamente.",
        { status: 500 }
      );
    }

    const safeToken = JSON.stringify(refreshToken)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026");

    const html = `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Google Calendar autorizado</title>
        </head>
        <body style="font-family:Arial,sans-serif;padding:32px;max-width:700px;margin:auto;">
          <h1>✅ Google Calendar autorizado</h1>
          <p>El refresh token fue obtenido correctamente.</p>

          <p><strong>IMPORTANTE:</strong> Este código es secreto.
          No lo compartas ni envíes capturas donde aparezca.</p>

          <h3>Nombre de la variable</h3>
          <pre style="background:#f3f3f3;padding:12px;">GOOGLE_REFRESH_TOKEN</pre>

          <h3>Valor del refresh token</h3>
          <textarea id="token" readonly
            style="box-sizing:border-box;width:100%;height:120px;padding:12px;overflow-wrap:anywhere;"
          ></textarea>

          <br><br>

          <button id="copy"
            style="padding:12px 20px;cursor:pointer;">
            Copiar refresh token
          </button>

          <p id="status" role="status"></p>

          <p>Después de copiarlo, guárdelo en Vercel como variable
          de entorno de Production con el nombre indicado.</p>

          <script>
            const token = ${safeToken};
            document.getElementById("token").value = token;

            document.getElementById("copy").addEventListener("click", async () => {
              try {
                await navigator.clipboard.writeText(token);
                document.getElementById("status").textContent =
                  "✅ Token copiado. Guárdelo inmediatamente en Vercel.";
              } catch {
                const field = document.getElementById("token");
                field.focus();
                field.select();
                document.getElementById("status").textContent =
                  "Seleccione y copie el texto manualmente.";
              }
            });
          </script>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, private, max-age=0",
        "Pragma": "no-cache",
        "X-Robots-Tag": "noindex, nofollow",
        "Referrer-Policy": "no-referrer",
      },
    });
  } catch (err) {
    console.error("Error de comunicación con Google:", err);

    return new NextResponse(
      "Ocurrió un error al comunicarse con Google.",
      { status: 500 }
    );
  }
}
