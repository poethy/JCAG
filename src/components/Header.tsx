"use client";

import { useState, useEffect } from "react";

function useScrolled(threshold = 32) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

const NAV = [
  { label: "Servicios",  href: "#servicios"  },
  { label: "Datos",      href: "#datos"      },
  { label: "Proyectos",  href: "#proyectos"  },
  { label: "Cobertura",  href: "#cobertura"  },
  { label: "Aliados",    href: "#aliados"    },
  { label: "Contacto",   href: "#contacto"   },
];

export default function Header() {
  const scrolled  = useScrolled(32);
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        background: "rgba(244,243,238,0.82)",
        backdropFilter: "saturate(160%) blur(12px)",
        WebkitBackdropFilter: "saturate(160%) blur(12px)",
        borderBottom: `1px solid ${scrolled ? "var(--g-5)" : "transparent"}`,
        transition: `border-color var(--t-base) var(--ease)`,
      }}
    >
      {/* ── Main bar ── */}
      <div
        style={{
          maxWidth: "var(--max)",
          margin: "0 auto",
          padding: "0 var(--pad-x)",
          height: 64,
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        {/* Logo */}
        <a
          href="#top"
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            flexShrink: 0,
          }}
        >
          JCAG
          <span
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 10,
              color: "var(--g-3)",
              letterSpacing: "0.08em",
            }}
          >
            S.A.S
          </span>
        </a>

        {/* REV tag — hidden on mobile */}
        <span
          className="hdr-rev"
          style={{
            fontFamily: "var(--f-mono)",
            fontSize: 10,
            color: "var(--g-3)",
            letterSpacing: "0.08em",
            paddingLeft: 16,
            borderLeft: "1px solid var(--g-5)",
          }}
        >
          REV. 2024 · CO
        </span>

        {/* Nav — hidden on mobile */}
        <nav
          className="hdr-nav"
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: 28,
          }}
        >
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hdr-nav-link"
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: "var(--ink)",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Contratar CTA — hidden on mobile */}
        <a
          href="#contacto"
          className="hdr-cta"
          style={{
            height: 36,
            padding: "0 16px",
            background: "var(--ink)",
            color: "var(--ink-inv)",
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontWeight: 500,
            border: 0,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
            transition: `opacity var(--t-fast)`,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Contratar <span>↗</span>
        </a>

        {/* SST link */}
        <a
          href="/sst"
          className="hdr-sst"
          style={{
            fontFamily: "var(--f-mono)",
            fontSize: 10,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--g-3)",
            flexShrink: 0,
          }}
        >
          SST
        </a>

        {/* Burger — visible on mobile only */}
        <button
          className="hdr-burger"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            padding: 8,
            background: "transparent",
            border: 0,
            marginLeft: "auto",
            cursor: "pointer",
          }}
        >
          <span style={{ display: "block", width: 22, height: 1.5, background: "var(--ink)" }} />
          <span style={{ display: "block", width: 22, height: 1.5, background: "var(--ink)" }} />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div
          style={{
            background: "var(--bg)",
            borderTop: "1px solid var(--g-5)",
            padding: "8px var(--pad-x) 16px",
          }}
        >
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "12px 0",
                borderBottom: "1px solid var(--g-5)",
                fontFamily: "var(--f-mono)",
                fontSize: 11,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: "var(--ink)",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              marginTop: 12,
              padding: "12px 16px",
              background: "var(--ink)",
              color: "var(--ink-inv)",
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Contratar ↗
          </a>
          <a
            href="/sst"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              marginTop: 8,
              padding: "10px 0",
              fontFamily: "var(--f-mono)",
              fontSize: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--g-3)",
              textAlign: "center",
            }}
          >
            Formulario SST →
          </a>
        </div>
      )}

      {/* ── Mobile responsive overrides ── */}
      <style>{`
        @media (max-width: 860px) {
          .hdr-nav  { display: none !important; }
          .hdr-rev  { display: none !important; }
          .hdr-cta  { display: none !important; }
          .hdr-sst  { display: none !important; }
          .hdr-burger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
