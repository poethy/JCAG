"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Quiénes Somos", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Aliados", href: "#aliados" },
  { label: "Contacto", href: "#contacto" },
  { label: "Formulario SST", href: "/sst" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-4 left-4 right-4 z-50">
      <nav
        className={`transition-all duration-300 rounded-2xl px-5 py-3 ${
          scrolled
            ? "bg-white shadow-lg border border-slate-100"
            : "bg-slate-900/80 backdrop-blur-md border border-white/10"
        }`}
      >
        <div className="flex items-center justify-between">
          <a
            href="#inicio"
            className={`text-xl font-bold tracking-tight transition-colors ${
              scrolled ? "text-slate-900" : "text-white"
            }`}
          >
            JCAG<span className="text-sky-600">.</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  scrolled
                    ? "text-slate-600 hover:text-slate-900"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Contratar
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden flex flex-col gap-1.5 p-2 cursor-pointer ${
              scrolled ? "text-slate-800" : "text-white"
            }`}
            aria-label="Abrir menú"
          >
            <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  scrolled
                    ? "text-slate-700 hover:bg-slate-50"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="block mt-2 bg-sky-700 text-white text-center py-2.5 rounded-xl font-semibold text-sm cursor-pointer"
            >
              Contratar
            </a>
          </div>
        )}
      </nav>
    </div>
  );
}
