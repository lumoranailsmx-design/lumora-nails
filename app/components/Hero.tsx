"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0F0F10]"
    >
      {/* Imagen */}

      <Image
        src="/images/hero-lumora.png"
        alt="Lumora Nails Studio"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay cinematográfico */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent md:from-black/22 md:via-black/8" />

      {/* Luz superior */}

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />

      {/* Degradado inferior */}

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0F0F10] via-[#0F0F10]/30 to-transparent" />

      {/* Contenido */}

      <div className="relative z-20 mx-auto flex w-full max-w-7xl items-center px-6 sm:px-8 md:px-14 lg:px-20">

        <div className="max-w-[620px] pt-24 sm:pt-28 md:pt-36">

          <h1
            className="
              mt-2
              font-bold
              leading-[0.90]
              tracking-[-0.05em]
              text-white
              text-[52px]
              sm:text-[64px]
              md:text-[88px]
              lg:text-[100px]
            "
          >
            Descubre la
            <br />
            experiencia
            <br />
            perfecta.
          </h1>

          <p
            className="
              mt-7
              max-w-[500px]
              text-[18px]
              leading-8
              text-white/90
              sm:text-[20px]
              sm:leading-9
              md:text-[22px]
              md:leading-9
            "
          >
            Agenda tu cita y descubre diseños exclusivos en un
            espacio pensado para brindar una experiencia elegante,
            relajante y completamente personalizada.
          </p>

          {/* Botones */}          {/* Botones */}

          <div className="mt-10 flex flex-col gap-4 sm:mt-14 sm:flex-row sm:gap-5">

            {/* Botón principal */}

            <a
              href="#contacto"
              className="group inline-flex h-[60px] w-full items-center justify-center rounded-full bg-gradient-to-r from-[#FF5CB8] via-[#FF2E9A] to-[#FF79CF] px-10 text-base font-semibold text-white shadow-[0_20px_60px_rgba(255,46,154,.35)] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_30px_80px_rgba(255,46,154,.50)] sm:h-[68px] sm:min-w-[240px] sm:w-auto sm:px-12 sm:text-lg"
            >
              Reservar cita

              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>

            </a>

            {/* Botón secundario */}

            <a
              href="#galeria"
              className="group inline-flex h-[60px] w-full items-center justify-center rounded-full border border-white/30 bg-white/10 px-10 text-base font-medium text-white backdrop-blur-xl transition-all duration-500 hover:border-white/60 hover:bg-white/20 sm:h-[68px] sm:min-w-[240px] sm:w-auto sm:px-12 sm:text-lg"
            >
              Ver galería

              <span className="ml-3 transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>

            </a>

          </div>

        </div>

      </div>

      {/* Luz ambiental */}

      <div className="pointer-events-none absolute -left-48 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-pink-400/10 blur-[180px] md:block" />

      <div className="pointer-events-none absolute -right-40 top-24 hidden h-[360px] w-[360px] rounded-full bg-amber-200/10 blur-[180px] md:block" />

      {/* Viñeta */}

      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,.10)] md:shadow-[inset_0_0_120px_rgba(0,0,0,.08)]" />

    </section>
  );
}