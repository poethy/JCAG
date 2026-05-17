const allies = [
  "CHEC", "ISA", "HMV", "EPM", "CELSIA", "ACOVIS",
  "CEDENAR", "CRYOGAS", "DINASTÍA", "DISPAC", "EDEMCO", "EDEQ",
  "ELECTROHUILA", "EMSA", "ENEL", "EMCALI", "ETESAL", "FUREL",
  "GENERADORA LUZ MA", "GIRSOL", "HATCH", "INGEMA", "JEJAIMES", "KINNESIS",
  "LYANSA", "PHC", "RENOVATION", "SEDIC", "VINARDELL", "TUPROJET",
  "CINERGY", "CYB", "CENS", "EDEMSA", "ENERTOLIMA", "ESSA",
  "ARQUITECTURA DE AVANZADA", "SPI", "AIR-E", "METRO MEDELLÍN",
];

export default function Allies() {
  return (
    <section id="aliados" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
            Nuestros aliados
          </span>
          <h2 className="mt-2 text-4xl sm:text-5xl font-black text-blue-900">
            +40 empresas confían en JCAG
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Trabajamos con las principales empresas del sector eléctrico y energético de Colombia y Latinoamérica.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {allies.map((a) => (
            <span
              key={a}
              className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-600 hover:text-blue-700 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all cursor-default"
            >
              {a}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
