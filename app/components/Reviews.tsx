export default function Reviews() {
  const reviews = [
    {
      name: "María G.",
      service: "Uñas Premium",
      review:
        "El estudio está hermoso, la atención fue excelente y mis uñas quedaron mejor de lo que imaginaba.",
    },
    {
      name: "Fernanda R.",
      service: "Pedicure Spa",
      review:
        "Todo fue impecable. Desde que llegué me hicieron sentir muy cómoda y el resultado fue perfecto.",
    },
    {
      name: "Andrea M.",
      service: "Extensiones de Pestañas",
      review:
        "Me encantó el resultado. Se ven naturales, elegantes y recibí muchísimos cumplidos.",
    },
  ];

  return (
    <section
      id="testimonios"
      className="relative overflow-hidden bg-gradient-to-b from-[#FFF9FC] via-white to-[#FFF9FC] pt-40 pb-24"
    >
      {/* Luces */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-pink-100/40 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-rose-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">

          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-pink-600">
            Testimonios
          </span>

          <h2 className="mt-6 text-5xl font-bold tracking-tight text-gray-900 md:text-7xl">
            Lo que dicen nuestras clientas
          </h2>

          <div className="mx-auto mt-7 h-1.5 w-28 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-500" />

          <p className="mx-auto mt-8 max-w-2xl text-xl leading-9 text-gray-600">
            Cada detalle está pensado para brindarte una experiencia elegante,
            personalizada y con resultados impecables.
          </p>

        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {reviews.map((review) => (          <article
            key={review.name}
            className="group relative flex min-h-[470px] flex-col overflow-hidden rounded-[32px] border border-pink-100 bg-white/95 p-10 backdrop-blur-xl shadow-[0_20px_70px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] hover:shadow-[0_50px_100px_rgba(236,72,153,0.20)]"
          >
            {/* Barra superior */}
            <div className="absolute left-0 top-0 h-1.5 w-full origin-left scale-x-0 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-500 transition-transform duration-500 group-hover:scale-x-100" />

            {/* Comillas */}
            <div className="absolute -right-6 -top-10 text-[150px] font-serif text-pink-100 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
              “
            </div>

            {/* Estrellas */}
            <div className="relative flex items-center gap-1 text-[#F5B301]">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12 2.75l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.58l-5.8 3.05 1.11-6.46-4.7-4.58 6.49-.94L12 2.75z" />
                </svg>
              ))}
            </div>

            {/* Comentario */}
            <p className="mt-10 flex-1 text-lg leading-9 text-gray-600">
              "{review.review}"
            </p>

            {/* Cliente */}
            <div className="mt-10 flex items-center gap-5 border-t border-pink-100 pt-8">

              {/* Avatar - CÍRCULO PERFECTO */}
              <div
                className="
                  flex-none
                  aspect-square
                  h-16
                  rounded-full
                  bg-gradient-to-br
                  from-pink-500
                  via-fuchsia-500
                  to-rose-500
                  flex
                  items-center
                  justify-center
                  text-xl
                  font-bold
                  text-white
                  shadow-[0_10px_30px_rgba(236,72,153,0.35)]
                  transition-all
                  duration-500
                  group-hover:scale-110
                "
              >
                {review.name.charAt(0)}
              </div>

              {/* Texto */}
              <div className="min-w-0 flex flex-col justify-center">

                <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                  {review.name}
                </h3>

                <p className="mt-2 text-base font-semibold uppercase tracking-[0.18em] text-pink-500">
                  {review.service}
                </p>

              </div>

            </div>

          </article>

        ))}

        </div>

        {/* Botón */}

        <div className="mt-20 flex justify-center">

          <a
            href="#contacto"
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-600 px-11 py-4 text-lg font-semibold text-white shadow-[0_20px_50px_rgba(236,72,153,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_35px_70px_rgba(236,72,153,0.45)]"
          >
            Reserva tu cita

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>

          </a>

        </div>

      </div>

    </section>
  );
}