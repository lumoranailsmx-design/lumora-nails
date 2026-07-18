"use client";

import {
  MapPin,
  MessageCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-gradient-to-b from-[#FFF8FC] via-white to-[#FFF8FC] py-32"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Encabezado */}

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-pink-600">
            CONTACTO
          </span>

          <h2 className="mt-6 text-5xl font-bold tracking-tight text-zinc-900 md:text-6xl">
            Agenda tu cita
          </h2>

          <div className="mx-auto mt-6 h-1 w-28 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500" />

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-zinc-600">
            Estamos listas para brindarte una experiencia premium.
            Reserva tu cita y disfruta un servicio personalizado con la
            calidad que distingue a Lumora Nails Studio.
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr]">

          {/* Columna izquierda */}

          <div className="space-y-7">

            {/* Dirección */}

            <div className="rounded-[36px] border border-pink-100 bg-white p-8 shadow-[0_16px_45px_rgba(236,72,153,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(236,72,153,0.12)]">

              <div className="flex items-start gap-6">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-pink-300 bg-white text-pink-500 shadow-md">

                  <MapPin size={24} strokeWidth={2.1} />

                </div>

                <div>

                  <h3 className="text-3xl font-bold text-zinc-900">
                    Dirección
                  </h3>

                  <div className="mt-4 space-y-1 text-lg leading-8 text-zinc-600">

                    <p>Chaparral 3</p>

                    <p>Coapa, Rinconada de las Hadas</p>

                    <p>Tlalpan, 14390</p>

                    <p>Ciudad de México, CDMX</p>

                  </div>

                  <a
                    href="https://maps.app.goo.gl/Eq4h6jJoDWnF5mVUA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-pink-600 transition hover:gap-3"
                  >
                    Ver ubicación en Google Maps

                    <ArrowRight size={18} />

                  </a>

                </div>

              </div>

            </div>

            {/* WhatsApp */}

            <div className="rounded-[36px] border border-pink-100 bg-white p-8 shadow-[0_16px_45px_rgba(236,72,153,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(236,72,153,0.12)]">

              <div className="flex items-start gap-6">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-pink-300 bg-white text-pink-500 shadow-md">

                  <MessageCircle size={24} strokeWidth={2.1} />

                </div>

                <div>

                  <h3 className="text-3xl font-bold text-zinc-900">
                    WhatsApp
                  </h3>

                  <p className="mt-4 text-lg leading-8 text-zinc-600">
                    Escríbenos por WhatsApp y agenda tu cita en menos de un minuto.
                  </p>

                  <a
                    href="https://wa.me/message/CNM3I3FATO3XK1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-pink-600 transition hover:gap-3"
                  >
                    Escribir por WhatsApp

                    <ArrowRight size={18} />

                  </a>

                </div>

              </div>

            </div>

            {/* Horarios */}

            <div className="rounded-[36px] border border-pink-100 bg-white p-8 shadow-[0_16px_45px_rgba(236,72,153,0.08)]">

              <div className="flex items-start gap-6">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-pink-300 bg-white text-pink-500 shadow-md">

                  <Clock size={24} strokeWidth={2.1} />

                </div>

                <div className="w-full">

                  <h3 className="text-3xl font-bold text-zinc-900">
                    Horarios
                  </h3>

                  <div className="mt-6 space-y-4">

                    <div className="flex justify-between border-b border-zinc-100 pb-3">
                      <span className="text-zinc-600">Lunes - Viernes</span>
                      <span className="font-semibold text-zinc-900">
                        10:00 - 19:00
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-zinc-100 pb-3">
                      <span className="text-zinc-600">Sábado</span>
                      <span className="font-semibold text-zinc-900">
                        10:00 - 16:00
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-zinc-600">Domingo</span>
                      <span className="font-semibold text-red-500">
                        Cerrado
                      </span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Columna derecha */}          <div className="relative">

            <div className="overflow-hidden rounded-[36px] border border-pink-100 bg-white shadow-[0_16px_45px_rgba(236,72,153,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(236,72,153,0.12)]">

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7531.320664909384!2d-99.12490622454915!3d19.297131944992845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce0100056af859%3A0xe3a5204007d441e!2sLumora%20Nails%20Studio%20%7C%20Coapa!5e0!3m2!1ses-419!2smx!4v1784399444281!5m2!1ses-419!2smx"
                className="h-[700px] w-full"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />

            </div>

          </div>

        </div>

        {/* Botón */}

        <div className="mt-20 flex justify-center">

          <a
            href="https://wa.me/message/CNM3I3FATO3XK1"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-600 px-10 py-5 text-lg font-semibold text-white shadow-[0_16px_40px_rgba(236,72,153,0.28)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_24px_60px_rgba(236,72,153,0.40)]"
          >
            Agenda tu cita

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </a>

        </div>

      </div>

    </section>
  );
}