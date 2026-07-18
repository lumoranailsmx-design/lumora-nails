"use client";

import Link from "next/link";
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0F0F10] text-white">
      {/* Línea superior */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-pink-300/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-8 py-20">
        <div className="grid gap-16 md:grid-cols-3">
          {/* Marca */}
          <div>
            <Link href="#inicio" className="inline-block">
              <h2
                className="text-[34px] font-medium tracking-[0.30em]"
                style={{ fontFamily: "Cormorant Garamond, serif" }}
              >
                LUMORA
              </h2>

              <p
                className="mt-2 text-[11px] uppercase tracking-[0.85em] text-white/70"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                NAILS STUDIO
              </p>
            </Link>

            <p className="mt-8 max-w-sm leading-8 text-white/70">
              Un espacio creado para resaltar tu belleza con diseños
              exclusivos, atención personalizada y una experiencia premium en
              cada visita.
            </p>
          </div>

          {/* Información */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Información</h3>

            <ul className="space-y-4 text-white/70">
              <li>📍 Chaparral 3, Coapa, Tlalpan, CDMX</li>

              <li>
                🕒 Lunes a Viernes
                <br />
                10:00 AM – 7:00 PM
              </li>

              <li>
                🕒 Sábado
                <br />
                10:00 AM – 4:00 PM
              </li>

              <li>Domingo cerrado</li>
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Síguenos</h3>

            <div className="flex items-center gap-5">
              <a
                href="https://instagram.com/lumoranails.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl transition-all duration-300 hover:-translate-y-1 hover:border-pink-400 hover:bg-pink-500 hover:text-white"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.tiktok.com/@lumoranails.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl transition-all duration-300 hover:-translate-y-1 hover:border-pink-400 hover:bg-pink-500 hover:text-white"
              >
                <FaTiktok />
              </a>

              <a
                href="https://www.facebook.com/lumoranails.mx/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl transition-all duration-300 hover:-translate-y-1 hover:border-pink-400 hover:bg-pink-500 hover:text-white"
              >
                <FaFacebookF />
              </a>
            </div>

            <p className="mt-8 text-sm leading-7 text-white/60">
              Síguenos para conocer nuestras promociones, nuevos diseños y
              contenido exclusivo.
            </p>
          </div>
        </div>

        <div className="my-12 h-px w-full bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-5 text-center text-sm text-white/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} Lumora Nails Studio. Todos los
            derechos reservados.
          </p>

          <div className="flex gap-8">
            <Link
              href="#"
              className="transition-colors hover:text-pink-300"
            >
              Aviso de privacidad
            </Link>

            <Link
              href="#inicio"
              className="transition-colors hover:text-pink-300"
            >
              Volver arriba ↑
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}