const projects = [
  {
    title: "Subestación Betulia",
    type: "Obra Civil",
    location: "Antioquia, Colombia",
    description:
      "Construcción de obra civil para modernización de subestación de transmisión eléctrica con EPM.",
    color: "from-blue-600 to-blue-800",
  },
  {
    title: "Parque Solar Tepuy",
    type: "Energía Renovable",
    location: "Colombia",
    description:
      "Montaje electromecánico completo para planta de generación solar fotovoltaica.",
    color: "from-orange-500 to-orange-700",
  },
  {
    title: "Metro Línea 1",
    type: "Infraestructura Urbana",
    location: "Colombia",
    description:
      "Diseño y montaje de infraestructura eléctrica para sistema de transporte masivo.",
    color: "from-slate-600 to-slate-800",
  },
  {
    title: "Tamanique",
    type: "Internacional",
    location: "El Salvador",
    description:
      "Proyecto de infraestructura eléctrica en El Salvador, expandiendo operaciones a Centroamérica.",
    color: "from-emerald-600 to-emerald-800",
  },
  {
    title: "Diseños Air-e",
    type: "Diseño Eléctrico",
    location: "Costa Atlántica, Colombia",
    description:
      "Servicios de diseño electromecánico para operador de red del Caribe colombiano.",
    color: "from-violet-600 to-violet-800",
  },
  {
    title: "Dorada Norte CHEC",
    type: "Mantenimiento",
    location: "Caldas, Colombia",
    description:
      "Instalación y mantenimiento de infraestructura eléctrica para CHEC en la región cafetera.",
    color: "from-cyan-600 to-cyan-800",
  },
];

export default function Projects() {
  return (
    <section id="proyectos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14 gap-4">
          <div>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
              Nuestro trabajo
            </span>
            <h2 className="mt-2 text-4xl sm:text-5xl font-black text-blue-900">
              Proyectos Destacados
            </h2>
          </div>
          <p className="text-slate-500 max-w-xs text-sm">
            Presencia en Colombia y Latinoamérica con proyectos de alto impacto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <div
              key={p.title}
              className={`relative rounded-2xl bg-gradient-to-br ${p.color} p-6 text-white overflow-hidden`}
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative z-10">
                <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  {p.type}
                </span>
                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{p.description}</p>
                <div className="flex items-center gap-1.5 text-white/60 text-xs">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {p.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
