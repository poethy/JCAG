"use client";

/* ── Data ─────────────────────────────────────────────────────────── */
const ALIADOS = [
  { name: "EPM",               type: "Operador",    since: "2015" },
  { name: "CHEC",              type: "Operador",    since: "2014" },
  { name: "ISA",               type: "Transmisor",  since: "2017" },
  { name: "HMV",               type: "Ingeniería",  since: "2016" },
  { name: "CELSIA",            type: "Generador",   since: "2018" },
  { name: "ACOVIS",            type: "Constructor", since: "2019" },
  { name: "CEDENAR",           type: "Operador",    since: "2019" },
  { name: "CRYOGAS",           type: "Industrial",  since: "2018" },
  { name: "DINASTÍA",          type: "Constructor", since: "2020" },
  { name: "DISPAC",            type: "Operador",    since: "2019" },
  { name: "EDEMCO",            type: "Operador",    since: "2019" },
  { name: "EDEQ",              type: "Operador",    since: "2017" },
  { name: "ELECTROHUILA",      type: "Operador",    since: "2018" },
  { name: "EMSA",              type: "Operador",    since: "2019" },
  { name: "ENEL",              type: "Generador",   since: "2017" },
  { name: "EMCALI",            type: "Operador",    since: "2018" },
  { name: "ETESA",             type: "Transmisor",  since: "2020" },
  { name: "LFUREL",            type: "Industrial",  since: "2020" },
  { name: "ISOLHATCH",         type: "Ingeniería",  since: "2021" },
  { name: "INGEMAJE",          type: "Ingeniería",  since: "2020" },
  { name: "JAIMES",            type: "Constructor", since: "2019" },
  { name: "KINNESIS",          type: "Industrial",  since: "2021" },
  { name: "LYANSA",            type: "Constructor", since: "2020" },
  { name: "PHC",               type: "Industrial",  since: "2021" },
  { name: "RENOVATIONS",       type: "Constructor", since: "2022" },
  { name: "EDIC",              type: "Ingeniería",  since: "2018" },
  { name: "VINARDELL",         type: "Industrial",  since: "2021" },
  { name: "TUPROJET",          type: "Ingeniería",  since: "2022" },
  { name: "CINERGY",           type: "Generador",   since: "2018" },
  { name: "CYB",               type: "Ingeniería",  since: "2020" },
  { name: "CENS",              type: "Operador",    since: "2018" },
  { name: "EDEMSA",            type: "Operador",    since: "2021" },
  { name: "ENERTOLIMA",        type: "Operador",    since: "2019" },
  { name: "ESSA",              type: "Operador",    since: "2018" },
  { name: "AIR-E",             type: "Operador",    since: "2022" },
  { name: "METRO MED.",        type: "Transporte",  since: "2023" },
  { name: "ARQ. AV.",          type: "Constructor", since: "2022" },
  { name: "SPI",               type: "Industrial",  since: "2022" },
  { name: "GENERADORA",        type: "Generador",   since: "2023" },
  { name: "CRYOGAS-2",         type: "Industrial",  since: "2024" },
];

/* ── Component ───────────────────────────────────────────────────── */
export default function Allies() {
  return (
    <section
      id="aliados"
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
              SEC. 07 / 08
            </span>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--g-3)", textTransform: "uppercase" }}>
              Aliados
            </span>
          </div>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
            +40 EMPRESAS
          </span>
        </div>

        {/* H2 + sub-copy */}
        <div className="al-intro">
          <h2
            style={{
              fontSize: "clamp(28px, 3.8vw, 56px)",
              fontWeight: 400,
              letterSpacing: "-0.028em",
              lineHeight: 1.0,
              color: "var(--ink)",
            }}
          >
            +40 empresas del sector confían en JCAG.
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.6,
              color: "var(--g-2)",
              maxWidth: 360,
              alignSelf: "end",
            }}
          >
            Pasa el cursor sobre cada celda para ver el tipo de relación y desde cuándo trabajamos juntos.
          </p>
        </div>

        {/* Matrix grid */}
        <div className="al-grid" style={{ marginTop: 56 }}>
          {ALIADOS.map((a, i) => (
            <div key={i} className="al-cell">
              <span className="al-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="al-name">{a.name}</span>
              <div className="al-hover-info">
                <span className="al-type">{a.type}</span>
                <span className="al-years">DESDE {a.since}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .al-intro {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 56px;
          align-items: end;
        }
        .al-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          border-top: 1px solid var(--ink);
          border-left: 1px solid var(--g-5);
        }
        .al-cell {
          background: var(--bg);
          border-right: 1px solid var(--g-5);
          border-bottom: 1px solid var(--g-5);
          padding: 24px 12px;
          min-height: 92px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: default;
          transition: background var(--t-base) var(--ease);
        }
        .al-cell:hover { background: var(--ink); color: var(--ink-inv); }

        .al-index {
          position: absolute;
          top: 6px; left: 8px;
          font-family: var(--f-mono);
          font-size: 9px;
          color: var(--g-3);
          letter-spacing: 0.04em;
          transition: opacity var(--t-base) var(--ease);
        }
        .al-cell:hover .al-index { opacity: 0; }

        .al-name {
          font-family: var(--f-mono);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: opacity var(--t-base) var(--ease);
          text-align: center;
        }
        .al-cell:hover .al-name { opacity: 0; }

        .al-hover-info {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          opacity: 0;
          transition: opacity var(--t-base) var(--ease);
          padding: 8px;
        }
        .al-cell:hover .al-hover-info { opacity: 1; }

        .al-type {
          font-family: var(--f-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink-inv);
        }
        .al-years {
          font-family: var(--f-mono);
          font-size: 9px;
          color: rgba(244,243,238,.6);
          letter-spacing: 0.04em;
        }

        @media (max-width: 1024px) {
          .al-intro { grid-template-columns: 1fr; gap: 24px; }
          .al-grid { grid-template-columns: repeat(5, 1fr); }
        }
        @media (max-width: 600px) {
          .al-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </section>
  );
}
