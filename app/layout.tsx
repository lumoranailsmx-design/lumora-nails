import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Lumora Nails Studio",
  description: "Detalles que brillan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${poppins.variable} ${cormorant.variable} antialiased bg-[#FCFAF8]`}
      >
        <Script
  src="https://www.googletagmanager.com/gtag/js?id=G-CTTVNMM89H"
  strategy="afterInteractive"
/>

<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-CTTVNMM89H');
  `}
</Script>
{children}
      </body>
    </html>
  );
}