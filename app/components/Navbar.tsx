"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-black/70 shadow-2xl backdrop-blur-2xl"
          : "bg-black/10 backdrop-blur-xl"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10 transition-all duration-500 ${
          scrolled ? "h-20" : "h-24"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="#inicio" className="group">
            <h1
              className={`leading-none tracking-[0.30em] text-white transition-all duration-500 group-hover:text-pink-200 ${
                scrolled ? "text-[28px]" : "text-[34px]"
              }`}
              style={{ fontFamily: "Cormorant Garamond, serif" }}
            >
              LUMORA
            </h1>

            <p
              className="mt-2 pl-[3px] text-[10px] uppercase tracking-[0.90em] text-white/80 transition-all duration-300 group-hover:text-pink-200"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              NAILS STUDIO
            </p>
          </Link>
        </div>        {/* Menú escritorio */}
        <div className="hidden flex-1 justify-center md:flex">
          <div className="flex items-center gap-12">
            <a
              href="#inicio"
              className="text-[15px] font-medium text-white transition-all duration-300 hover:text-pink-300"
            >
              Inicio
            </a>

            <a
              href="#servicios"
              className="text-[15px] font-medium text-white transition-all duration-300 hover:text-pink-300"
            >
              Servicios
            </a>

            <a
              href="#galeria"
              className="text-[15px] font-medium text-white transition-all duration-300 hover:text-pink-300"
            >
              Galería
            </a>

            <a
              href="#nosotros"
              className="text-[15px] font-medium text-white transition-all duration-300 hover:text-pink-300"
            >
              Nosotros
            </a>

            <a
              href="#contacto"
              className="text-[15px] font-medium text-white transition-all duration-300 hover:text-pink-300"
            >
              Contacto
            </a>
          </div>
        </div>

        {/* Botón escritorio + Menú móvil */}
        <div className="flex items-center gap-4">
          <a
            href="#contacto"
            className="hidden rounded-full bg-gradient-to-r from-pink-400 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-pink-500/40 md:inline-flex"
          >
            Reservar cita
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white transition-colors hover:text-pink-300 md:hidden"
            aria-label="Abrir menú"
          >
            {menuOpen ? (
              <HiX size={30} />
            ) : (
              <HiOutlineMenuAlt3 size={30} />
            )}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        className={`overflow-hidden bg-black/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${
          menuOpen ? "max-h-[500px] border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center gap-8 py-8">
          <a
            href="#inicio"
            onClick={() => setMenuOpen(false)}
            className="text-white transition-colors hover:text-pink-300"
          >
            Inicio
          </a>

          <a
            href="#servicios"
            onClick={() => setMenuOpen(false)}
            className="text-white transition-colors hover:text-pink-300"
          >
            Servicios
          </a>

          <a
            href="#galeria"
            onClick={() => setMenuOpen(false)}
            className="text-white transition-colors hover:text-pink-300"
          >
            Galería
          </a>

          <a
            href="#nosotros"
            onClick={() => setMenuOpen(false)}
            className="text-white transition-colors hover:text-pink-300"
          >
            Nosotros
          </a>

          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="text-white transition-colors hover:text-pink-300"
          >
            Contacto
          </a>

          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="rounded-full bg-gradient-to-r from-pink-400 to-pink-500 px-8 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Reservar cita
          </a>
        </div>
      </div>    </header>
  );
}