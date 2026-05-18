"use client";

import { useState, useEffect } from "react";
import HeroDiagram from "./HeroDiagram";

/* ── Animated counter hook ─────────────────────────────────────────── */
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
      const elapsed = performance.now() - t0;
      const p = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(fmt(target * eased));
      if (p < 1) requestAnimationFrame(tick);
      else done = true;
    };

    requestAnimationFrame(tick);
    // Fallback: snap if rAF is throttled (e.g. in sandboxed iframes)
    const fb = setTimeout(() => {
      if (!done) { done = true; setVal(fmt(target)); }
    }, duration + 300);

    return () => { done = true; clearTimeout(fb); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return val;
}

/* ── Hero ──────────────────────────────────────────────────────────── */
export default function Hero() {
  const v1 = useCounter(4,   { duration: 1100 });
  const v2 = useCounter(200, { duration: 1600, prefix: "+" });
  const v3 = useCounter(40,  { duration: 1400, prefix: "+" });
  const v4 = useCounter(98,  { duration: 1300, suffix: "%" });

  const tiles = [
    { k: "PAÍSES",       v: v1 },
    { k: "PROYECTOS",    v: v2 },
    { k: "ALIADOS",      v: v3 },
    { k: "SATISFACCIÓN", v: v4 },
  ];

  return (
    <section
      id="top"
      style={{
        paddingTop: 124,
        paddingBottom: "var(--pad-y-tight)",
        position: "relative",
      }}
    >
      <div
        className="hero-inner"
        style={{
          maxWidth: "var(--max)",
          margin: "0 auto",
          padding: "0 var(--pad-x)",
        }}
      >
        {/* ── Left column ── */}
        <div>
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              marginBottom: 32,
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--g-3)",
              fontWeight: 500,
            }}
          >
            <span>FIG. 01</span>
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                background: "var(--ink)",
                flexShrink: 0,
              }}
            />
            <span>Infraestructura eléctrica · Colombia &amp; Latam</span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontSize: "clamp(48px, 9.5vw, 144px)",
              fontWeight: 400,
              letterSpacing: "-0.035em",
              lineHeight: 0.93,
              marginBottom: 32,
              fontFamily: "var(--f-ui)",
            }}
          >
            Diseño,
            <br />
            montaje y
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>puesta en</em>
            <br />
            servicio.
          </h1>

          {/* Sub-copy */}
          <p
            style={{
              maxWidth: 480,
              fontSize: 17,
              lineHeight: 1.5,
              color: "var(--g-2)",
              marginBottom: 40,
            }}
          >
            Firma colombiana especializada en infraestructura eléctrica de alta
            tensión: subestaciones, redes, generación solar y obra civil asociada.
          </p>

          {/* ── Stat tiles ── */}
          <div
            className="hero-tiles-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 1,
              background: "var(--g-4)",
              border: "1px solid var(--g-4)",
              maxWidth: 600,
              marginBottom: 32,
            }}
          >
            {tiles.map(({ k, v }) => (
              <div
                key={k}
                style={{
                  background: "var(--bg)",
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 10,
                    color: "var(--g-3)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {k}
                </span>
                <span
                  className="hero-tile-val"
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontWeight: 500,
                    fontSize: 32,
                    letterSpacing: "-0.03em",
                    color: "var(--ink)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>

          {/* ── CTAs ── */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {/* Primary */}
            <a
              href="#contacto"
              style={{
                height: 56,
                padding: "0 28px",
                background: "var(--ink)",
                color: "var(--ink-inv)",
                fontFamily: "var(--f-mono)",
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                transition: "opacity var(--t-fast) var(--ease)",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
                const arr = e.currentTarget.querySelector<HTMLElement>(".arr");
                if (arr) arr.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                const arr = e.currentTarget.querySelector<HTMLElement>(".arr");
                if (arr) arr.style.transform = "translateX(0)";
              }}
            >
              Solicitar cotización{" "}
              <span
                className="arr"
                style={{ transition: "transform var(--t-base) var(--ease)" }}
              >
                ↗
              </span>
            </a>

            {/* Ghost */}
            <a
              href="#proyectos"
              style={{
                height: 56,
                padding: "0 28px",
                background: "transparent",
                color: "var(--ink)",
                border: "1px solid var(--ink)",
                fontFamily: "var(--f-mono)",
                fontSize: 12,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                transition: `background var(--t-base) var(--ease), color var(--t-base) var(--ease)`,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--ink)";
                e.currentTarget.style.color = "var(--ink-inv)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--ink)";
              }}
            >
              Ver proyectos
            </a>
          </div>
        </div>

        {/* ── Right column — technical diagram ── */}
        <div
          className="hero-diagram-col"
          style={{
            alignSelf: "end",
            position: "relative",
            width: "100%",
            aspectRatio: "720 / 500",
            color: "var(--ink)",
            paddingLeft: 32,
            cursor: "crosshair",
          }}
        >
          {/* Vertical hairline divider */}
          <span
            className="hero-diagram-border"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: 1,
              background: "var(--g-5)",
            }}
          />

          {/* Frame label */}
          <span
            style={{
              position: "absolute",
              top: -28,
              left: 32,
              fontFamily: "var(--f-mono)",
              fontSize: 10,
              letterSpacing: "0.08em",
              color: "var(--g-3)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            DIAGRAMA UNIFILAR · FLUJO DE POTENCIA
          </span>

          <HeroDiagram />
        </div>
      </div>

      <style>{`
        .hero-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: end;
          min-height: 70vh;
        }
        @media (max-width: 1024px) {
          .hero-inner { grid-template-columns: 1fr; gap: 48px; min-height: unset; }
          .hero-diagram-border { display: none !important; }
          .hero-diagram-col    { padding-left: 0 !important; }
        }
        @media (max-width: 768px) {
          .hero-tiles-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-tile-val   { font-size: 24px !important; }
        }
      `}</style>
    </section>
  );
}
