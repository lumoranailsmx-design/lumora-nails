export default function About() {
  const stats = [
    {
      value: "500+",
      title: "Diseños exclusivos",
      text: "Cada diseño es personalizado para resaltar tu estilo.",
    },
    {
      value: "100%",
      title: "Productos premium",
      text: "Trabajamos únicamente con materiales de alta calidad.",
    },
    {
      value: "5★",
      title: "Experiencia",
      text: "Atención cálida y un ambiente pensado para relajarte.",
    },
    {
      value: "📍",
      title: "Coapa",
      text: "Ubicados en una zona accesible y con estacionamiento.",
    },
  ];

  return (
    <section
      id="nosotros"
      className="bg-gradient-to-b from-pink-50 to-white py-28"
    >
      <div className="mx-auto max-w-7xl px-8">

        <div className="text-center">
          <span className="uppercase tracking-[0.35em] text-pink-500 font-semibold text-sm">
            Nosotros
          </span>

          <h2 className="mt-4 text-5xl font-bold text-gray-900">
            Mucho más que un salón de uñas
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600 leading-8">
            En Lumora creemos que cada visita debe sentirse como un momento para
            consentirte. Nuestro espacio fue diseñado para brindarte comodidad,
            lujo y una atención completamente personalizada.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-5xl font-bold text-pink-500">
                {item.value}
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}