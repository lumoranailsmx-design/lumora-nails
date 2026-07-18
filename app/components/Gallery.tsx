import Image from "next/image";

import premium from "./images/premium.jpg";
import semipermanente from "./images/semipermanente.jpg";
import nailart from "./images/nailart.jpg";
import pedicure from "./images/pedicure.jpg";
import pestanas from "./images/pestanas.jpg";

const topGallery = [
  {
    image: premium,
    title: "Uñas Premium",
    category: "Premium",
    position: "object-[center_35%]",
  },
  {
    image: semipermanente,
    title: "Semipermanente",
    category: "Gel",
    position: "object-center",
  },
  {
    image: nailart,
    title: "Nail Art",
    category: "Diseño",
    position: "object-center",
  },
];

export default function Gallery() {
  return (
    <section
      id="galeria"
      className="relative overflow-hidden bg-gradient-to-b from-[#FFF8FC] via-white to-[#FFF8FC] py-32"
    >
      <div className="absolute -left-56 top-0 h-[520px] w-[520px] rounded-full bg-pink-100 blur-[180px]" />
      <div className="absolute -right-56 bottom-0 h-[520px] w-[520px] rounded-full bg-rose-100 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">

          <span className="inline-flex rounded-full border border-pink-200 bg-pink-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-pink-600">
            Nuestra Galería
          </span>

          <h2 className="mt-8 text-5xl font-bold text-gray-900">
            Diseños que hablan por
            <span className="block bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
              sí solos
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Cada fotografía refleja nuestro compromiso con la calidad,
            creatividad y atención personalizada.
          </p>

        </div>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">

          {topGallery.map((item, index) => (
            <article
              key={index}
              className="group relative overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_90px_rgba(236,72,153,0.18)]"
            >
              <div className="relative h-[330px] overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index === 0}
                  sizes="(max-width:1024px) 100vw, 33vw"
                  className={`${item.position} object-cover transition-transform duration-500 group-hover:scale-105`}
                />                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute bottom-0 left-0 right-0 translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 p-7">

                  <span className="inline-flex rounded-full bg-white/95 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.30em] text-gray-900">
                    {item.category}
                  </span>

                  <h3 className="mt-4 text-2xl font-bold text-white">
                    {item.title}
                  </h3>

                </div>

              </div>

            </article>

          ))}

        </div>

        {/* Segunda fila */}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* Pedicure */}

          <article className="group relative overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_90px_rgba(236,72,153,0.18)]">

            <div className="relative h-[330px] overflow-hidden">

              <Image
                src={pedicure}
                alt="Pedicure Spa"
                fill
                sizes="(max-width:1024px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute bottom-0 left-0 right-0 translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 p-7">

                <span className="inline-flex rounded-full bg-white/95 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.30em] text-gray-900">
                  Spa
                </span>

                <h3 className="mt-4 text-2xl font-bold text-white">
                  Pedicure Spa
                </h3>

              </div>

            </div>

          </article>          {/* Pestañas */}

          <article className="group relative overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_90px_rgba(236,72,153,0.18)] lg:col-span-2">

            <div className="relative h-[330px] overflow-hidden">

              <Image
                src={pestanas}
                alt="Extensiones de pestañas"
                fill
                sizes="(max-width:1024px) 100vw, 66vw"
                className="object-cover object-[center_72%] transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="absolute left-8 bottom-8 translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">

                <span className="inline-flex rounded-full bg-white/95 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.30em] text-gray-900">
                  Beauty
                </span>

                <h3 className="mt-5 text-3xl font-bold text-white">
                  Extensiones de Pestañas
                </h3>

                <p className="mt-3 max-w-md text-white/90 leading-7">
                  Clásicas, híbridas y volumen con un acabado elegante,
                  natural y duradero.
                </p>

              </div>

            </div>

          </article>

        </div>

      </div>

    </section>
  );
}