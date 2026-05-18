"use client";

import { useState } from "react";

/* ── Data ─────────────────────────────────────────────────────────── */
const DEPARTMENTS = [
  { code: "AMA", name: "Amazonas",       x: 255, y: 445, p: 2  },
  { code: "ANT", name: "Antioquia",      x: 145, y: 175, p: 38 },
  { code: "ARA", name: "Arauca",         x: 245, y: 165, p: 4  },
  { code: "ATL", name: "Atlántico",      x: 165, y: 75,  p: 6  },
  { code: "BOG", name: "Bogotá D.C.",    x: 195, y: 230, p: 22 },
  { code: "BOL", name: "Bolívar",        x: 155, y: 110, p: 9  },
  { code: "CAL", name: "Caldas",         x: 155, y: 215, p: 18 },
  { code: "CAU", name: "Cauca",          x: 100, y: 290, p: 7  },
  { code: "CES", name: "Cesar",          x: 195, y: 110, p: 5  },
  { code: "CHO", name: "Chocó",          x: 95,  y: 195, p: 3  },
  { code: "COR", name: "Córdoba",        x: 130, y: 130, p: 4  },
  { code: "CUN", name: "Cundinamarca",   x: 180, y: 230, p: 14 },
  { code: "HUI", name: "Huila",          x: 150, y: 280, p: 6  },
  { code: "GUA", name: "La Guajira",     x: 210, y: 65,  p: 5  },
  { code: "MAG", name: "Magdalena",      x: 180, y: 90,  p: 7  },
  { code: "MET", name: "Meta",           x: 215, y: 250, p: 11 },
  { code: "NAR", name: "Nariño",         x: 75,  y: 330, p: 4  },
  { code: "PUT", name: "Putumayo",       x: 105, y: 360, p: 3  },
  { code: "QUI", name: "Quindío",        x: 140, y: 235, p: 6  },
  { code: "RIS", name: "Risaralda",      x: 135, y: 220, p: 5  },
  { code: "SAN", name: "Santander",      x: 200, y: 160, p: 12 },
  { code: "SUC", name: "Sucre",          x: 145, y: 110, p: 3  },
  { code: "TOL", name: "Tolima",         x: 165, y: 250, p: 9  },
  { code: "VAL", name: "Valle",          x: 115, y: 260, p: 14 },
];

const INTERNATIONAL = [
  { code: "PA", name: "Panamá",               sub: "Centroamérica", projects: 8, since: "2019" },
  { code: "DO", name: "República Dominicana", sub: "Caribe",        projects: 4, since: "2021" },
  { code: "SV", name: "El Salvador",          sub: "Centroamérica", projects: 6, since: "2022" },
];

const CO_PATH =
  "M 155 50 L 195 48 L 230 55 L 245 65 L 240 95 L 235 120 L 260 140 L 280 170 L 290 195 L 300 220 L 280 235 L 270 260 L 280 290 L 290 320 L 280 355 L 265 380 L 270 410 L 280 440 L 260 460 L 230 465 L 190 460 L 150 440 L 115 410 L 90 380 L 75 350 L 70 320 L 65 280 L 75 240 L 80 200 L 85 165 L 95 135 L 105 110 L 115 90 L 130 70 Z";

/* ── Map subcomponent ─────────────────────────────────────────────── */
function CoverageMap({
  hovered,
  onHoverDept,
}: {
  hovered: string | null;
  onHoverDept: (code: string | null) => void;
}) {
  return (
    <svg
      viewBox="0 0 600 520"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "100%", maxHeight: 600, overflow: "visible" }}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="0.4" opacity="0.18" />
          <line x1="0" y1="0" x2="40" y2="0" stroke="currentColor" strokeWidth="0.4" opacity="0.18" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="600" height="520" fill="url(#mapGrid)" />

      {/* Corner crosshairs */}
      {([[10,10],[590,10],[590,510],[10,510]] as [number,number][]).map(([x,y],i) => (
        <g key={i} strokeWidth="0.75">
          <line x1={x-5} y1={y} x2={x+5} y2={y} />
          <line x1={x} y1={y-5} x2={x} y2={y+5} />
        </g>
      ))}

      {/* Title block */}
      <text x="20" y="32" fontFamily="var(--f-mono)" fontSize="10" fill="currentColor" opacity="0.55" letterSpacing="0.8">
        FIG. 04 · COBERTURA · 24 DEPTOS · 4 PAÍSES
      </text>
      <text x="580" y="32" fontFamily="var(--f-mono)" fontSize="10" fill="currentColor" opacity="0.55" letterSpacing="0.8" textAnchor="end">
        N ↑ · ESC. APROX.
      </text>

      {/* Colombia silhouette */}
      <path d={CO_PATH} strokeWidth="1.25" fill="rgba(20,20,15,0.04)" />

      {/* Colombia label */}
      <text x="180" y="395" fontFamily="var(--f-mono)" fontSize="11" fill="currentColor" opacity="0.55" letterSpacing="0.8">
        COLOMBIA
      </text>
      <text x="180" y="410" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.4" letterSpacing="0.8">
        SEDE · MEDELLÍN
      </text>

      {/* Department markers */}
      {DEPARTMENTS.map((d) => {
        const isHover = hovered === d.code;
        const r = isHover ? 6 : 3.5;
        /* Mirror tooltip to left for departments near right edge */
        const tooltipLeft = d.x > 220;
        const tx = tooltipLeft ? d.x - 198 : d.x + 28;
        const lx2 = tooltipLeft ? d.x - 28 : d.x + 28;
        return (
          <g
            key={d.code}
            onMouseEnter={() => onHoverDept(d.code)}
            onMouseLeave={() => onHoverDept(null)}
            style={{ cursor: "crosshair" }}
          >
            {/* Hit zone */}
            <circle cx={d.x} cy={d.y} r="14" fill="transparent" />

            {/* Crosshair ring on hover */}
            {isHover && (
              <g strokeWidth="1">
                <line x1={d.x - 14} y1={d.y} x2={d.x - 8} y2={d.y} />
                <line x1={d.x + 14} y1={d.y} x2={d.x + 8} y2={d.y} />
                <line x1={d.x} y1={d.y - 14} x2={d.x} y2={d.y - 8} />
                <line x1={d.x} y1={d.y + 14} x2={d.x} y2={d.y + 8} />
              </g>
            )}

            <circle
              cx={d.x}
              cy={d.y}
              r={r}
              fill="currentColor"
              opacity={isHover ? 1 : 0.85}
            />

            {/* Tooltip on hover */}
            {isHover && (
              <g>
                <line
                  x1={d.x} y1={d.y}
                  x2={lx2} y2={d.y - 28}
                  strokeWidth="0.75"
                />
                <rect
                  x={tx} y={d.y - 60}
                  width="170" height="38"
                  fill="var(--bg)" strokeWidth="0.75"
                />
                <text
                  x={tx + 8} y={d.y - 45}
                  fontFamily="var(--f-mono)" fontSize="9"
                  fill="currentColor" opacity="0.6" letterSpacing="0.6"
                >
                  {d.code}
                </text>
                <text
                  x={tx + 8} y={d.y - 32}
                  fontFamily="var(--f-mono)" fontSize="11"
                  fill="currentColor" fontWeight="600"
                >
                  {d.name}
                </text>
                <text
                  x={tx + 162} y={d.y - 32}
                  fontFamily="var(--f-mono)" fontSize="10"
                  fill="currentColor" textAnchor="end"
                >
                  {String(d.p).padStart(2, "0")} proy.
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Medellín HQ — pulsing ring */}
      <circle cx="145" cy="175" r="9" fill="none" strokeWidth="1" className="node-pulse" />

      {/* Coordinate ticks */}
      {Array.from({ length: 5 }).map((_, i) => (
        <g key={i} strokeWidth="0.5" opacity="0.4">
          <line x1={60 + i * 60} y1="495" x2={60 + i * 60} y2="500" />
          <text
            x={60 + i * 60} y="510"
            fontFamily="var(--f-mono)" fontSize="8"
            fill="currentColor" textAnchor="middle"
          >
            {75 - i * 2}°W
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ── Section ──────────────────────────────────────────────────────── */
export default function Coverage() {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredDept = DEPARTMENTS.find((d) => d.code === hovered) ?? null;

  return (
    <section
      id="cobertura"
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
              SEC. 06 / 08
            </span>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--g-3)", textTransform: "uppercase" }}>
              Cobertura
            </span>
          </div>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
            24 DEPTOS · 4 PAÍSES
          </span>
        </div>

        {/* Two-column layout */}
        <div className="cov-grid">

          {/* Left: text + tiles + readout */}
          <div>
            <h2
              style={{
                fontSize: "clamp(28px, 3.5vw, 52px)",
                fontWeight: 400,
                letterSpacing: "-0.028em",
                lineHeight: 1.0,
                marginBottom: 28,
                color: "var(--ink)",
              }}
            >
              Presentes en 4 países y 24 departamentos.
            </h2>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: "var(--g-2)",
                maxWidth: 380,
                marginBottom: 48,
              }}
            >
              Desde nuestra sede en Medellín ejecutamos proyectos en toda Colombia y operamos en tres países más de la región. Pasa el cursor sobre cualquier marca del mapa.
            </p>

            {/* International tiles */}
            <div
              style={{
                borderTop: "1px solid var(--g-5)",
                marginBottom: 40,
              }}
            >
              {INTERNATIONAL.map((c) => (
                <div
                  key={c.code}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr auto",
                    alignItems: "center",
                    gap: 20,
                    padding: "20px 0",
                    borderBottom: "1px solid var(--g-5)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      color: "var(--ink)",
                    }}
                  >
                    {c.code}
                  </span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: "var(--ink)", marginBottom: 2 }}>
                      {c.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 10,
                        color: "var(--g-3)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {c.sub} · DESDE {c.since}
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 16,
                      color: "var(--ink)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {c.projects}{" "}
                    <span style={{ color: "var(--g-3)", fontSize: 12 }}>proy.</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Live readout */}
            <div
              style={{
                border: "1px solid var(--g-5)",
                padding: "20px 24px",
              }}
              aria-live="polite"
            >
              <span
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 10,
                  color: "var(--g-3)",
                  letterSpacing: "0.08em",
                  display: "block",
                  marginBottom: 12,
                }}
              >
                READOUT
              </span>

              {hoveredDept ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    ["CÓDIGO",          hoveredDept.code],
                    ["DEPARTAMENTO",    hoveredDept.name],
                    ["PROYECTOS EJEC.", String(hoveredDept.p)],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        paddingTop: 8,
                        borderTop: "1px solid var(--g-6)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--f-mono)",
                          fontSize: 10,
                          color: "var(--g-3)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {k}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--f-mono)",
                          fontSize: 12,
                          color: "var(--ink)",
                          fontWeight: 500,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <span
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 11,
                    color: "var(--g-3)",
                    letterSpacing: "0.06em",
                  }}
                >
                  ↑ HOVER UN MARCADOR
                </span>
              )}
            </div>
          </div>

          {/* Right: map */}
          <div
            style={{
              border: "1px solid var(--g-5)",
              padding: 16,
              aspectRatio: "600 / 520",
              cursor: "crosshair",
            }}
          >
            <CoverageMap hovered={hovered} onHoverDept={setHovered} />
          </div>
        </div>
      </div>

      <style>{`
        .cov-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 80px;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .cov-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
      `}</style>
    </section>
  );
}
