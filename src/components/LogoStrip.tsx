const NAMES = [
  "EPM", "CHEC", "ISA", "CELSIA", "ENEL", "CENS", "AIR-E", "HMV",
  "EDEQ", "ESSA", "EMSA", "CINERGY", "METRO MEDELLÍN", "CRYOGAS", "EMCALI", "ELECTROHUILA",
];

export default function LogoStrip() {
  const doubled = [...NAMES, ...NAMES];

  return (
    <div className="strip">
      <span
        className="strip-label"
        style={{
          fontFamily: "var(--f-mono)",
          fontSize: 10,
          letterSpacing: "0.08em",
          color: "var(--g-3)",
          textTransform: "uppercase",
        }}
      >
        Aliados en operación
      </span>

      <div className="strip-track">
        {doubled.map((name, i) => (
          <span key={i} className="strip-name">
            {name}
          </span>
        ))}
      </div>

      <style>{`
        .strip {
          padding: 28px 0;
          border-top: 1px solid var(--g-5);
          border-bottom: 1px solid var(--g-5);
          overflow: hidden;
          position: relative;
          margin-top: var(--pad-y-tight);
        }
        .strip-label {
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          padding: 8px var(--pad-x);
          background: var(--bg);
          box-shadow: 24px 0 24px -8px var(--bg);
        }
        .strip-track {
          display: flex;
          gap: 64px;
          align-items: center;
          padding-left: 200px;
          width: max-content;
        }
        .strip-name {
          font-family: var(--f-mono);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--ink);
          white-space: nowrap;
          opacity: 0.6;
          transition: opacity var(--t-base) var(--ease);
        }
        .strip:hover .strip-name { opacity: 0.4; }
        .strip-name:hover { opacity: 1; }
      `}</style>
    </div>
  );
}
