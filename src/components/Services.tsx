"use client";

/* ── Service SVG icons (bespoke, 48×48 viewBox, 1.5px stroke) ──── */
function IconMontaje() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
      <rect x="8" y="14" width="32" height="20" />
      <line x1="8"  y1="22" x2="40" y2="22" />
      <circle cx="16" cy="28" r="3" />
      <circle cx="24" cy="28" r="3" />
      <circle cx="32" cy="28" r="3" />
      <line x1="14" y1="14" x2="14" y2="8" />
      <line x1="34" y1="14" x2="34" y2="8" />
      <line x1="14" y1="34" x2="14" y2="40" />
      <line x1="34" y1="34" x2="34" y2="40" />
    </svg>
  );
}

function IconDiseno() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
      <rect x="8" y="8" width="32" height="32" />
      <line x1="8"  y1="16" x2="40" y2="16" />
      <line x1="16" y1="16" x2="16" y2="40" />
      <circle cx="28" cy="28" r="6" />
      <line x1="28" y1="22" x2="28" y2="34" strokeDasharray="2 2" />
      <line x1="22" y1="28" x2="34" y2="28" strokeDasharray="2 2" />
    </svg>
  );
}

function IconEstudios() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
      <rect x="6" y="14" width="36" height="20" />
      <path d="M 10 24 L 14 24 L 16 18 L 20 30 L 24 16 L 28 30 L 32 24 L 38 24" />
    </svg>
  );
}

function IconPruebas() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
      <circle cx="24" cy="20" r="10" />
      <line x1="24" y1="30" x2="24" y2="40" />
      <line x1="16" y1="40" x2="32" y2="40" />
      <text x="24" y="24" fontFamily="var(--f-mono)" fontSize="10" fill="currentColor" textAnchor="middle">V</text>
    </svg>
  );
}

function IconCivil() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
      <line x1="6"  y1="38" x2="42" y2="38" strokeWidth="2" />
      <line x1="12" y1="38" x2="12" y2="14" />
      <line x1="24" y1="38" x2="24" y2="14" />
      <line x1="36" y1="38" x2="36" y2="14" />
      <line x1="8"  y1="14" x2="40" y2="14" strokeWidth="2" />
      <line x1="8"  y1="14" x2="14" y2="8" />
      <line x1="40" y1="14" x2="34" y2="8" />
      <line x1="14" y1="8"  x2="34" y2="8" />
    </svg>
  );
}

function IconConstruccion() {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
      <line x1="6"  y1="42" x2="42" y2="42" strokeWidth="2" />
      <rect x="10" y="30" width="28" height="12" />
      <line x1="14" y1="30" x2="14" y2="42" strokeDasharray="2 2" />
      <line x1="22" y1="30" x2="22" y2="42" strokeDasharray="2 2" />
      <line x1="30" y1="30" x2="30" y2="42" strokeDasharray="2 2" />
      <line x1="20" y1="30" x2="20" y2="14" />
      <line x1="28" y1="30" x2="28" y2="14" />
      <line x1="16" y1="14" x2="32" y2="14" strokeWidth="2" />
      <line x1="20" y1="22" x2="28" y2="22" />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────────────── */
const SERVICES = [
  { n: "§01.01", tags: "AT · MT · BT",       title: "Montajes Electromecánicos",    desc: "Instalación y ensamble de equipos eléctricos y mecánicos en subestaciones y redes de alta tensión.",                           Icon: IconMontaje     },
  { n: "§01.02", tags: "IEC · NTC · RETIE",  title: "Diseño Electromecánico",       desc: "Ingeniería de detalle y diseño de sistemas electromecánicos para proyectos de infraestructura energética.",                      Icon: IconDiseno      },
  { n: "§01.03", tags: "ETAP · DIgSILENT",   title: "Estudios Eléctricos",          desc: "Flujo de potencia, cortocircuito, coordinación de protecciones y calidad de energía.",                                          Icon: IconEstudios    },
  { n: "§01.04", tags: "FAT · SAT",           title: "Pruebas y Puesta en Servicio", desc: "Ensayos de aceptación, protocolos de energización y puesta en marcha de equipos.",                                              Icon: IconPruebas     },
  { n: "§01.05", tags: "NSR-10",              title: "Diseño Civil",                 desc: "Diseño estructural y de obras civiles asociadas a infraestructura eléctrica y subestaciones.",                                   Icon: IconCivil       },
  { n: "§01.06", tags: "OBRA CIVIL",          title: "Construcción Obra Civil",      desc: "Ejecución de obras civiles, cimentaciones y estructuras para proyectos energéticos a nivel nacional.",                          Icon: IconConstruccion },
];

/* ── Component ───────────────────────────────────────────────────── */
export default function Services() {
  return (
    <section
      id="servicios"
      style={{ paddingTop: "var(--pad-y)", paddingBottom: "var(--pad-y)" }}
    >
      <div style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "0 var(--pad-x)" }}>

        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 0",
            borderBottom: "1px solid var(--g-5)",
            marginBottom: 56,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", fontWeight: 600, color: "var(--ink)" }}>
              SEC. 02 / 08
            </span>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--g-3)", textTransform: "uppercase" }}>
              Servicios
            </span>
          </div>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
            06 ÍTEMS · CICLO COMPLETO
          </span>
        </div>

        {/* H2 */}
        <div style={{ maxWidth: 900, marginBottom: 64 }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              lineHeight: 1.02,
              color: "var(--ink)",
            }}
          >
            Cubrimos el ciclo completo del proyecto eléctrico, desde el diseño hasta la energización.
          </h2>
        </div>

        {/* Service grid */}
        <div className="svc-grid">
          {SERVICES.map((s, i) => (
            <article key={s.n} className="svc-card">
              {/* Top row: number + tags */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--g-3)", fontWeight: 600 }}>
                  {s.n}
                </span>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.06em", color: "var(--g-3)" }}>
                  {s.tags}
                </span>
              </div>

              {/* Icon */}
              <div className="svc-icon" style={{ color: "var(--ink)", transition: "transform 280ms var(--ease)" }}>
                <s.Icon />
              </div>

              {/* Title */}
              <h3 style={{ fontSize: 22, letterSpacing: "-0.012em", lineHeight: 1.15, fontWeight: 500, color: "var(--ink)" }}>
                {s.title}
              </h3>

              {/* Description */}
              <p style={{ color: "var(--g-2)", fontSize: 14, lineHeight: 1.55 }}>
                {s.desc}
              </p>

              {/* Footer */}
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  paddingTop: 16,
                  borderTop: "1px solid var(--g-5)",
                }}
              >
                <a
                  href="#contacto"
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    color: "var(--ink)",
                    fontWeight: 500,
                  }}
                >
                  VER FICHA →
                </a>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)" }}>
                  {String(i + 1).padStart(2, "0")} / 06
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid var(--ink);
        }
        .svc-card {
          padding: 40px 32px 32px;
          border-bottom: 1px solid var(--g-5);
          border-right: 1px solid var(--g-5);
          display: flex;
          flex-direction: column;
          gap: 24px;
          min-height: 320px;
          position: relative;
          transition: background var(--t-base) var(--ease);
          cursor: default;
        }
        .svc-card:nth-child(3n) { border-right: 0; }
        .svc-card:hover { background: var(--bg-soft); }
        .svc-card:hover .svc-icon { transform: rotate(-3deg) scale(1.05); }

        @media (max-width: 1024px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr); }
          .svc-card:nth-child(3n) { border-right: 1px solid var(--g-5); }
          .svc-card:nth-child(2n) { border-right: 0; }
        }
        @media (max-width: 600px) {
          .svc-grid { grid-template-columns: 1fr; }
          .svc-card { border-right: 0 !important; min-height: 0; padding: 32px 0; }
        }
      `}</style>
    </section>
  );
}
