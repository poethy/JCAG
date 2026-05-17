const footerLinks = [
  { label: "Quiénes Somos", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Aliados", href: "#aliados" },
  { label: "Contacto", href: "#contacto" },
];

const legal = [
  "Autorización de datos personales",
  "Política de protección de datos",
  "Aviso de privacidad",
  "Política de Gestión Integrada",
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <p className="text-2xl font-black mb-3">
              JCAG<span className="text-sky-500">.</span>
            </p>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-5">
              Empresa colombiana especializada en instalación, mantenimiento y diseño de infraestructura eléctrica. Con presencia en Colombia, Panamá, República Dominicana y El Salvador.
            </p>
            <a
              href="https://wa.me/576044796787"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.11 1.522 5.828L0 24l6.344-1.498A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.876 0-3.635-.493-5.15-1.355l-.37-.22-3.773.89.929-3.681-.239-.384A9.944 9.944 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
              </svg>
              WhatsApp
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
              Navegación
            </p>
            <ul className="space-y-2.5">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors cursor-pointer">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
              Contacto
            </p>
            <div className="space-y-3 text-sm text-slate-400">
              <p>Calle 49 SUR # 45A-300<br />Centro Empresarial S48<br />Envigado – Antioquia</p>
              <p>604 479 67 87</p>
              <a href="mailto:administracion@jcagsas.com.co" className="hover:text-white transition-colors block cursor-pointer">
                administracion@jcagsas.com.co
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">© 2024 JCAG S.A.S. Todos los derechos reservados.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {legal.map((l) => (
              <a key={l} href="#" className="text-slate-500 hover:text-slate-300 text-xs transition-colors cursor-pointer">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
