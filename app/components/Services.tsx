export default function Services() {
  const services = [
    {
      category: "PREMIUM",
      icon: "✦",
      title: "Uñas Premium",
      description:
        "Diseños elegantes con acabados impecables, máxima duración y un resultado sofisticado.",
      accent: "from-pink-500/15 to-pink-100",
    },
    {
      category: "SPA",
      icon: "✧",
      title: "Pedicure Spa",
      description:
        "Un tratamiento relajante con exfoliación, hidratación profunda y acabado perfecto.",
      accent: "from-rose-500/15 to-rose-100",
    },
    {
      category: "BEAUTY",
      icon: "✦",
      title: "Pestañas",
      description:
        "Aplicaciones personalizadas para una mirada natural o un efecto glamuroso.",
      accent: "from-fuchsia-500/15 to-pink-100",
    },
    {
      category: "ART",
      icon: "✧",
      title: "Nail Art",
      description:
        "Diseños exclusivos inspirados en tendencias internacionales y creados para ti.",
      accent: "from-pink-400/15 to-rose-100",
    },
  ];

  return (
    <section
      id="servicios"
      className="relative overflow-hidden bg-gradient-to-b from-[#FFF8FC] via-white to-[#FFF7FB] py-28"
    >
      {/* Luces decorativas */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-pink-200/30 blur-[140px]" />
      <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-rose-200/30 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-pink-200 bg-pink-50 px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-pink-600">
            Nuestros Servicios
          </span>

          <h2 className="mt-8 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
            Experiencias diseñadas para
            <span className="block bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
              resaltar tu belleza
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600">
            Cada servicio combina técnica, productos premium y atención
            personalizada para brindarte una experiencia exclusiva.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group relative overflow-hidden rounded-[32px] border border-white/70 bg-white p-8 shadow-[0_15px_60px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-3 hover:border-pink-200 hover:shadow-[0_30px_80px_rgba(236,72,153,0.18)]"
            >              {/* Fondo */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              {/* Luz decorativa */}
              <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-white/70 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex h-full flex-col">
                {/* Categoría */}
                <span className="inline-flex w-fit rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-600">
                  {service.category}
                </span>

                {/* Ícono */}
                <div className="mt-7 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-pink-500 via-fuchsia-500 to-pink-600 text-3xl text-white shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  {service.icon}
                </div>

                {/* Título */}
                <h3 className="mt-8 text-3xl font-bold text-gray-900">
                  {service.title}
                </h3>

                {/* Descripción */}
                <p className="mt-5 flex-1 leading-8 text-gray-600">
                  {service.description}
                </p>

                {/* Línea decorativa */}
                <div className="mt-10 h-px w-full bg-gradient-to-r from-pink-200 via-pink-100 to-transparent transition-all duration-500 group-hover:from-pink-400 group-hover:via-pink-300" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}