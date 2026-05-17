"use client";

import { useState, useEffect } from "react";

const rotatingWords = [
  "DISEÑO",
  "MONTAJE ELÉCTRICO",
  "OBRA CIVIL",
  "CONSULTORÍA",
  "INTERVENTORÍA",
];

const featuredClients = ["EPM", "CHEC", "ISA", "CELSIA", "ENEL", "CINERGY", "CENS"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % rotatingWords.length);
        setVisible(true);
      }, 250);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center bg-slate-900 overflow-hidden"
    >
      {/* Subtle dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Thin horizontal accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left column — main content */}
          <div className="lg:col-span-7">
            <p className="text-sky-400 text-sm font-semibold uppercase tracking-[0.2em] mb-6">
              Infraestructura Eléctrica · Colombia & Latinoamérica
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-4">
              Soluciones en
            </h1>

            <div className="h-14 sm:h-16 lg:h-20 flex items-center mb-4">
              <span
                className={`text-4xl sm:text-5xl lg:text-6xl font-black text-sky-400 tracking-tight transition-opacity duration-250 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
              >
                {rotatingWords[index]}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-8">
              para el sector energético
            </h2>

            <p className="text-slate-400 text-lg leading-relaxed max-w-lg mb-10 font-light">
              Especialistas en instalación, mantenimiento y diseño de infraestructura eléctrica en subestaciones y redes de alta tensión.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#contacto"
                className="bg-sky-700 hover:bg-sky-600 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors cursor-pointer"
              >
                Contactar ahora
              </a>
              <a
                href="#servicios"
                className="border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-colors cursor-pointer"
              >
                Ver servicios
              </a>
            </div>
          </div>

          {/* Right column — stats */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {[
              { value: "4", label: "Países de operación", sub: "Colombia · Panamá · Rep. Dom · El Salvador" },
              { value: "+200", label: "Proyectos ejecutados", sub: "A nivel nacional e internacional" },
              { value: "+40", label: "Aliados empresariales", sub: "EPM, CHEC, ISA, Celsia y más" },
              { value: "98%", label: "Satisfacción del cliente", sub: "Calificación promedio en proyectos" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors"
              >
                <p className="text-3xl font-black text-white mb-1">{s.value}</p>
                <p className="text-sky-400 text-xs font-semibold uppercase tracking-wide mb-1">{s.label}</p>
                <p className="text-slate-500 text-xs leading-snug">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Client strip */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mb-5">
            Empresas que confían en nosotros
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 items-center">
            {featuredClients.map((c) => (
              <span key={c} className="text-slate-400 font-semibold text-sm hover:text-white transition-colors cursor-default">
                {c}
              </span>
            ))}
            <span className="text-slate-600 text-sm">+35 más</span>
          </div>
        </div>
      </div>
    </section>
  );
}
