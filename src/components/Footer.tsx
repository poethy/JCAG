export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-inv)", color: "var(--ink-inv)", marginTop: "var(--pad-y)" }}>

      {/* Big type */}
      <div style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "var(--pad-y) var(--pad-x)" }}>
        <h2
          style={{
            fontSize: "clamp(48px, 11vw, 176px)",
            fontWeight: 400,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            color: "var(--ink-inv)",
          }}
        >
          Listos
          <br />
          para el siguiente{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>proyecto.</em>
        </h2>
      </div>

      {/* Title block bar */}
      <div className="foot-blocks">
        {/* Brand */}
        <div className="foot-brand">
          <span
            style={{
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: "-0.01em",
              color: "var(--ink-inv)",
            }}
          >
            JCAG
          </span>
          <span
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 10,
              color: "rgba(244,243,238,.55)",
              letterSpacing: "0.08em",
            }}
          >
            S.A.S · 2014–2024
          </span>
        </div>

        {/* Metadata blocks */}
        {[
          { k: "DRAWN BY", v: "JCAG S.A.S" },
          { k: "SCALE",    v: "1:1"        },
          { k: "SHEET",    v: "00 / 06"    },
          { k: "REV",      v: "2024-Q4"    },
        ].map(({ k, v }) => (
          <div key={k} className="foot-block">
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "rgba(244,243,238,.55)", letterSpacing: "0.08em" }}>
              {k}
            </span>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--ink-inv)" }}>
              {v}
            </span>
          </div>
        ))}
      </div>

      {/* Legal row */}
      <div className="foot-legal">
        <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "rgba(244,243,238,.55)", letterSpacing: "0.04em" }}>
          © 2024 JCAG S.A.S. — Todos los derechos reservados.
        </span>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {["Autorización de datos", "Protección de datos", "Aviso de privacidad", "Gestión Integrada"].map((label) => (
            <a key={label} href="#" className="foot-legal-link">
              {label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .foot-blocks {
          border-top: 1px solid rgba(244,243,238,.18);
          display: grid;
          grid-template-columns: 1fr auto auto auto auto;
          align-items: stretch;
        }
        .foot-brand {
          padding: 20px var(--pad-x);
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .foot-block {
          padding: 18px 24px;
          border-left: 1px solid rgba(244,243,238,.18);
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 120px;
        }
        .foot-legal {
          border-top: 1px solid rgba(244,243,238,.18);
          padding: 16px var(--pad-x);
          max-width: var(--max);
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }
        @media (max-width: 768px) {
          .foot-blocks { grid-template-columns: 1fr 1fr; }
          .foot-brand {
            grid-column: 1 / -1;
            border-bottom: 1px solid rgba(244,243,238,.18);
          }
          .foot-block:nth-child(2) { border-left: 0; }
          .foot-block:nth-child(4) { border-left: 0; }
        }
        .foot-legal-link {
          font-family: var(--f-mono);
          font-size: 10px;
          color: rgba(244,243,238,.55);
          letter-spacing: 0.04em;
          transition: color var(--t-base) var(--ease);
        }
        .foot-legal-link:hover { color: var(--ink-inv); }
        @media (max-width: 480px) {
          .foot-legal { flex-direction: column; gap: 12px; }
          .foot-legal div { flex-direction: column; gap: 8px; }
        }
      `}</style>
    </footer>
  );
}
