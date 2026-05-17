const stats = [
  {
    value: "4",
    label: "Países de Operación",
    detail: "Colombia · Panamá · Rep. Dominicana · El Salvador",
  },
  {
    value: "+200",
    label: "Proyectos Ejecutados",
    detail: "A nivel nacional e internacional",
  },
  {
    value: "+40",
    label: "Aliados Empresariales",
    detail: "EPM, CHEC, ISA, Celsia y más",
  },
  {
    value: "98%",
    label: "Satisfacción del Cliente",
    detail: "Calificación promedio en proyectos",
  },
];

export default function Stats() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center ${
                i < stats.length - 1 ? "lg:border-r lg:border-slate-700" : ""
              }`}
            >
              <p className="text-5xl sm:text-6xl font-black text-white mb-2">{s.value}</p>
              <p className="text-sky-400 font-semibold text-xs uppercase tracking-widest mb-1">
                {s.label}
              </p>
              <p className="text-slate-500 text-xs hidden sm:block">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
