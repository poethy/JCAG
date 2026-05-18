const DEPARTMENTS = [
  "Amazonas",     "Antioquia",
  "Arauca",       "Atlántico",
  "Bogotá D.C.",  "Bolívar",
  "Caldas",       "Cauca",
  "Cesar",        "Chocó",
  "Córdoba",      "Cundinamarca",
  "Huila",        "La Guajira",
  "Magdalena",    "Meta",
  "Nariño",       "Putumayo",
  "Quindío",      "Risaralda",
  "Santander",    "Sucre",
  "Tolima",       "Valle del Cauca",
];

const VALUES = [
  { n: "01", title: "Integridad",        desc: "Coherencia entre lo que decimos y hacemos." },
  { n: "02", title: "Respeto",           desc: "Por las personas, los procesos y la palabra." },
  { n: "03", title: "Proactividad",      desc: "Anticipar problemas, proponer soluciones." },
  { n: "04", title: "Responsabilidad",   desc: "Asumir el alcance, los plazos y la calidad." },
  { n: "05", title: "Honestidad",        desc: "Transparencia técnica, comercial y operativa." },
  { n: "06", title: "Trabajo en equipo", desc: "El proyecto se construye entre todos." },
];

export default function About() {
  return (
    <section
      id="nosotros"
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
              SEC. 01 / 08
            </span>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--g-3)", textTransform: "uppercase" }}>
              Quiénes somos
            </span>
          </div>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
            DESDE 2014 · MEDELLÍN, CO
          </span>
        </div>

        {/* Main grid: text left, dark panel right */}
        <div className="about-grid">

          {/* Left: copy */}
          <div>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 52px)",
                fontWeight: 400,
                letterSpacing: "-0.028em",
                lineHeight: 1.02,
                marginBottom: 28,
                color: "var(--ink)",
              }}
            >
              Más de una década en infraestructura eléctrica.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--g-2)", marginBottom: 16 }}>
              JCAG S.A.S es una empresa colombiana con sede en Medellín especializada en el desarrollo de soluciones integrales mediante asesoría, consultoría, interventoría, diseño y ejecución de instalaciones eléctricas.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--g-2)", marginBottom: 48 }}>
              Nuestra estrategia está orientada a permanecer como empresa líder en el sector eléctrico y de obras civiles a nivel nacional, con presencia activa en cuatro países.
            </p>

            <div
              style={{
                paddingTop: 32,
                borderTop: "1px solid var(--g-5)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 40,
              }}
            >
              {[
                { k: "§02.A · MISIÓN",  body: "Desarrollar soluciones integrales de ingeniería eléctrica con altos estándares de calidad para nuestros clientes." },
                { k: "§02.B · VISIÓN",  body: "Ser la empresa líder en energía y obras civiles a nivel nacional, reconocida por calidad y excelencia." },
              ].map(({ k, body }) => (
                <div key={k}>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.08em" }}>
                    {k}
                  </span>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink)", marginTop: 10 }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: dark terminal panel */}
          <div
            style={{
              background: "var(--bg-inv)",
              color: "var(--ink-inv)",
              padding: "28px 32px 24px",
              fontFamily: "var(--f-mono)",
            }}
          >
            {/* Panel header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 10,
                color: "rgba(244,243,238,.55)",
                letterSpacing: "0.08em",
                marginBottom: 24,
              }}
            >
              <span>$02.C</span>
              <span>FIG. 02.C</span>
            </div>

            {/* Big number */}
            <div
              style={{
                fontSize: "clamp(72px, 10vw, 120px)",
                fontWeight: 600,
                letterSpacing: "-0.05em",
                lineHeight: 0.9,
                color: "var(--ink-inv)",
                marginBottom: 12,
              }}
            >
              24
            </div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.1em",
                color: "rgba(244,243,238,.55)",
                marginBottom: 20,
                borderBottom: "1px solid rgba(244,243,238,.15)",
                paddingBottom: 20,
              }}
            >
              DEPARTAMENTOS EN COLOMBIA
            </div>

            {/* Department list */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px 24px",
              }}
            >
              {DEPARTMENTS.map((name, i) => (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "baseline",
                    fontSize: 11,
                  }}
                >
                  <span style={{ color: "rgba(244,243,238,.35)", fontSize: 9, minWidth: 16 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ color: i % 2 === 1 ? "var(--ink-inv)" : "rgba(244,243,238,.8)" }}>
                    {name}
                  </span>
                </div>
              ))}
            </div>

            {/* Panel footer */}
            <div
              style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: "1px solid rgba(244,243,238,.15)",
                display: "flex",
                justifyContent: "space-between",
                fontSize: 9,
                color: "rgba(244,243,238,.45)",
                letterSpacing: "0.06em",
              }}
            >
              <span>+ 4 países en LATAM</span>
              <span>VIGENCIA · 2024-Q4</span>
            </div>
          </div>
        </div>

        {/* Values grid */}
        <div style={{ marginTop: 80 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              paddingBottom: 20,
              borderBottom: "1px solid var(--g-5)",
              marginBottom: 0,
            }}
          >
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.08em" }}>
              §02.D · VALORES CORPORATIVOS
            </span>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.08em" }}>
              06 PRINCIPIOS
            </span>
          </div>

          <div className="values-grid">
            {VALUES.map(({ n, title, desc }) => (
              <div key={n} className="value-cell">
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
                  {n}
                </span>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    letterSpacing: "-0.012em",
                    marginTop: 16,
                    marginBottom: 8,
                    color: "var(--ink)",
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--g-2)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-left: 1px solid var(--g-5);
        }
        .value-cell {
          padding: 32px 28px;
          border-right: 1px solid var(--g-5);
          border-bottom: 1px solid var(--g-5);
        }
        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .values-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .values-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
