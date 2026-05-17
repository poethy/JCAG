const values = [
  "Integridad",
  "Respeto",
  "Proactividad",
  "Responsabilidad",
  "Honestidad",
  "Trabajo en equipo",
];

export default function About() {
  return (
    <section id="nosotros" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-sky-700 font-semibold text-sm uppercase tracking-widest mb-3">
              Quiénes Somos
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Más de una década en infraestructura eléctrica
            </h2>
            <p className="text-slate-600 leading-relaxed mb-5 text-base">
              JCAG S.A.S es una empresa colombiana con sede en Medellín especializada en el desarrollo de soluciones integrales mediante asesoría, consultoría, interventoría, diseño y ejecución de instalaciones eléctricas.
            </p>
            <p className="text-slate-600 leading-relaxed mb-10 text-base">
              Nuestra estrategia está orientada a permanecer como empresa líder en el sector eléctrico y de obras civiles a nivel nacional, con presencia activa en cuatro países.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-xl p-5">
                <p className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">Misión</p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Desarrollar soluciones integrales de ingeniería eléctrica con altos estándares de calidad para nuestros clientes.
                </p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5">
                <p className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">Visión</p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Ser la empresa líder en energía y obras civiles a nivel nacional, reconocida por calidad y excelencia.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-slate-900 rounded-2xl p-8 mb-6 text-white">
              <p className="text-5xl font-black mb-2">24</p>
              <p className="text-sky-400 text-sm font-semibold uppercase tracking-wide mb-2">
                Departamentos en Colombia
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Amazonas, Antioquia, Arauca, Atlántico, Bogotá, Bolívar, Caldas, Cauca, Cesar, Chocó, Córdoba, Cundinamarca, Huila, La Guajira, Magdalena, Meta, Nariño, Putumayo, Quindío, Risaralda, Santander, Sucre, Tolima y más.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                Valores corporativos
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {values.map((v) => (
                  <div
                    key={v}
                    className="border border-slate-200 rounded-lg px-4 py-2.5 text-center cursor-default"
                  >
                    <p className="font-medium text-slate-700 text-sm">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
