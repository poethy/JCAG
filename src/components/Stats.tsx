"use client";

import { useState, useEffect } from "react";

function useCounter(
  target: number,
  opts: { duration?: number; suffix?: string; prefix?: string } = {}
) {
  const { duration = 1600, suffix = "", prefix = "" } = opts;
  const fmt = (n: number) => prefix + Math.round(n).toString() + suffix;
  const [val, setVal] = useState(fmt(0));

  useEffect(() => {
    let done = false;
    const t0 = performance.now();
    const tick = () => {
      if (done) return;
      const p = Math.min(1, (performance.now() - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(fmt(target * eased));
      if (p < 1) requestAnimationFrame(tick);
      else done = true;
    };
    requestAnimationFrame(tick);
    const fb = setTimeout(() => { if (!done) { done = true; setVal(fmt(target)); } }, duration + 300);
    return () => { done = true; clearTimeout(fb); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return val;
}

const STATS = [
  { k: "PAÍSES DE OPERACIÓN",   target: 4,   opts: {},                        sub: "CO · PA · DO · SV"         },
  { k: "PROYECTOS EJECUTADOS",  target: 200, opts: { prefix: "+" },           sub: "2014 — 2024"               },
  { k: "ALIADOS EMPRESARIALES", target: 40,  opts: { prefix: "+" },           sub: "EPM · CHEC · ISA · CELSIA …"},
  { k: "SATISFACCIÓN PROMEDIO", target: 98,  opts: { suffix: "%" },           sub: "CALIFICACIÓN VERIFICADA"   },
];

function StatCell({ k, target, opts, sub }: typeof STATS[0]) {
  const val = useCounter(target, { duration: 1600, ...opts });
  return (
    <div
      style={{
        background: "var(--bg-inv)",
        padding: "32px 32px 36px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        minHeight: 280,
      }}
    >
      <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "rgba(244,243,238,.55)", letterSpacing: "0.08em" }}>
        {k}
      </span>
      <span
        style={{
          fontFamily: "var(--f-mono)",
          fontWeight: 300,
          fontSize: "clamp(48px, 6vw, 88px)",
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
          color: "var(--ink-inv)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {val}
      </span>
      <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "rgba(244,243,238,.55)", letterSpacing: "0.06em", marginTop: "auto" }}>
        {sub}
      </span>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="datos" style={{ background: "var(--bg-inv)", color: "var(--ink-inv)" }}>
      <div style={{ maxWidth: "var(--max)", margin: "0 auto", padding: "var(--pad-y-tight) var(--pad-x)" }}>

        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            paddingBottom: 20,
            marginBottom: 56,
            borderBottom: "1px solid rgba(244,243,238,.18)",
          }}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--ink-inv)", letterSpacing: "0.08em", fontWeight: 600 }}>
              SEC. 03 / 08
            </span>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "rgba(244,243,238,.55)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Datos operativos
            </span>
          </div>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "rgba(244,243,238,.55)", letterSpacing: "0.06em" }}>
            VIGENCIA · 2024-Q4
          </span>
        </div>

        {/* Stats grid */}
        <div className="stats-grid">
          {STATS.map((s) => (
            <StatCell key={s.k} {...s} />
          ))}
        </div>

        {/* Misión / Visión */}
        <div className="stats-mv">
          {[
            { label: "§02.A · MISIÓN", body: "Desarrollar soluciones integrales de ingeniería eléctrica con altos estándares de calidad para nuestros clientes." },
            { label: "§02.B · VISIÓN", body: "Ser la empresa líder en energía y obras civiles a nivel nacional, reconocida por calidad y excelencia." },
          ].map(({ label, body }) => (
            <div key={label}>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "rgba(244,243,238,.55)", letterSpacing: "0.08em" }}>
                {label}
              </span>
              <p style={{ fontSize: 22, lineHeight: 1.4, color: "var(--ink-inv)", marginTop: 14, maxWidth: 480 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(244,243,238,.18);
          border: 1px solid rgba(244,243,238,.18);
        }
        .stats-mv {
          margin-top: 56px;
          padding-top: 32px;
          border-top: 1px solid rgba(244,243,238,.18);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
        }
        @media (max-width: 1024px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px)  {
          .stats-grid { grid-template-columns: 1fr; }
          .stats-mv   { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </section>
  );
}
