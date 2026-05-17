const testimonials = [
  {
    quote:
      "Mil gracias por el apoyo y ser aliado estratégico durante la ejecución de este contrato. JCAG es una gran empresa.",
    author: "Cliente EPM",
    project: "Proyecto Plan de Choque",
    rating: 5,
  },
  {
    quote:
      "Excelente estructura administrativa en campo. Disponibilidad de personal técnico ágil y oportuna de acuerdo a las necesidades.",
    author: "Cliente CHEC",
    project: "Proyecto Regivit",
    rating: 5,
  },
  {
    quote:
      "La empresa JCAG cumplió con los requerimientos técnicos del proyecto de manera satisfactoria.",
    author: "Cliente EPM",
    project: "Modernización Subestación Betulia",
    rating: 4,
  },
  {
    quote:
      "JCAG ha sido un aliado estratégico en el desarrollo de muchos proyectos del sector eléctrico, con cumplimiento total.",
    author: "Cinergy",
    project: "Proyectos sector energético",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-orange-400" : "text-slate-200"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
            Testimonios
          </span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-black text-blue-900">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.project}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
            >
              <StarRating rating={t.rating} />
              <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-blue-900 text-sm">{t.author}</p>
                  <p className="text-slate-400 text-xs">{t.project}</p>
                </div>
                <span className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                  Verificado
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
