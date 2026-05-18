"use client";

import React, { useState } from "react";

/* ── Project SVG diagrams ─────────────────────────────────────────── */
function DiagramSubestacion() {
  return (
    <svg viewBox="0 0 400 260" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
      <line x1="20" y1="60" x2="50" y2="60" />
      <text x="20" y="48" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.6">IN · 220kV</text>
      <line x1="50" y1="60" x2="380" y2="60" strokeWidth="2.5" />
      {[80, 160, 240, 320].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="60" x2={x} y2="80" />
          <rect x={x - 7} y="80" width="14" height="14" />
          <line x1={x} y1="94" x2={x} y2="115" />
          <line x1={x - 8} y1="120" x2={x + 8} y2="120" />
          <line x1={x} y1="115" x2={x} y2="125" />
          <circle cx={x} cy="138" r="8" />
          <circle cx={x} cy="156" r="8" />
          <line x1={x} y1="164" x2={x} y2="180" />
        </g>
      ))}
      <line x1="50" y1="180" x2="380" y2="180" strokeWidth="2.5" />
      {[80, 160, 240, 320].map((x, i) => (
        <line key={i} x1={x} y1="180" x2={x} y2="220" />
      ))}
      <text x="380" y="234" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.6" textAnchor="end">OUT · 4 × 34.5kV</text>
      <circle cx="160" cy="60" r="2.5" fill="currentColor" className="node-pulse" />
      <circle cx="240" cy="180" r="2.5" fill="currentColor" className="node-pulse" />
    </svg>
  );
}

function DiagramSolar() {
  return (
    <svg viewBox="0 0 400 260" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
      <text x="20" y="32" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.6">PV ARRAY · 15 PANELS</text>
      {[0, 1, 2].map((r) =>
        Array.from({ length: 5 }).map((_, c) => (
          <g key={`${r}-${c}`} transform={`translate(${20 + c * 26}, ${50 + r * 30})`}>
            <rect x="0" y="0" width="20" height="22" />
            <line x1="0" y1="11" x2="20" y2="11" />
            <line x1="10" y1="0" x2="10" y2="22" />
          </g>
        ))
      )}
      <line x1="155" y1="80" x2="200" y2="80" strokeDasharray="2 2" opacity="0.7" />
      <rect x="200" y="68" width="36" height="24" />
      <text x="218" y="106" fontFamily="var(--f-mono)" fontSize="8" fill="currentColor" opacity="0.7" textAnchor="middle">COMB.</text>
      <line x1="236" y1="80" x2="260" y2="80" className="flow-line" />
      <g transform="translate(260, 64)">
        <rect x="0" y="0" width="40" height="32" />
        <path d="M 8 22 Q 14 8, 20 22 T 32 22" strokeWidth="1" />
        <text x="20" y="48" fontFamily="var(--f-mono)" fontSize="8" fill="currentColor" opacity="0.7" textAnchor="middle">INVERTER</text>
      </g>
      <line x1="300" y1="80" x2="330" y2="80" />
      <g transform="translate(345, 80)">
        <circle cx="0" cy="0" r="8" />
        <circle cx="13" cy="0" r="8" />
      </g>
      <line x1="365" y1="80" x2="385" y2="80" className="flow-line" />
      <text x="385" y="68" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.6" textAnchor="end">↗ GRID 13.8kV</text>
      <line x1="20" y1="200" x2="380" y2="200" strokeDasharray="2 2" opacity="0.4" />
      <text x="200" y="218" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.55" textAnchor="middle">DC · 1500V — — — AC · 13.8 kV</text>
      <text x="200" y="238" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.55" textAnchor="middle">CAP. 5 MW</text>
      <circle cx="248" cy="80" r="2.5" fill="currentColor" className="node-pulse" />
    </svg>
  );
}

function DiagramMetro() {
  return (
    <svg viewBox="0 0 400 260" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
      <text x="20" y="32" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.6">CATENARIA · 1500 V DC</text>
      {[40, 110, 180, 250, 320].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="160" x2={x} y2="60" strokeWidth="1.5" />
          <line x1={x - 20} y1="80" x2={x + 20} y2="80" />
          <line x1={x - 16} y1="80" x2={x - 16} y2="100" />
          <line x1={x + 16} y1="80" x2={x + 16} y2="100" />
        </g>
      ))}
      <line x1="20" y1="80" x2="380" y2="80" />
      <line x1="20" y1="100" x2="380" y2="100" className="flow-line" />
      <g transform="translate(140, 124)">
        <rect x="0" y="0" width="120" height="36" rx="3" />
        <rect x="8" y="8" width="18" height="14" />
        <rect x="32" y="8" width="18" height="14" />
        <rect x="56" y="8" width="18" height="14" />
        <rect x="80" y="8" width="18" height="14" />
        <rect x="102" y="8" width="12" height="14" />
        <circle cx="20" cy="40" r="6" />
        <circle cx="100" cy="40" r="6" />
        <line x1="40" y1="0" x2="48" y2="-18" />
        <line x1="80" y1="0" x2="72" y2="-18" />
        <line x1="48" y1="-18" x2="72" y2="-18" />
        <line x1="48" y1="-22" x2="72" y2="-22" />
      </g>
      <line x1="20" y1="172" x2="380" y2="172" strokeWidth="1" />
      <line x1="20" y1="178" x2="380" y2="178" strokeWidth="1" />
      {Array.from({ length: 18 }).map((_, i) => (
        <line key={i} x1={20 + i * 20} y1="172" x2={20 + i * 20} y2="178" strokeWidth="1" />
      ))}
      <text x="20" y="218" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.55">SUBESTACIÓN RECTIFICADORA · 1500 V DC</text>
      <text x="380" y="238" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.55" textAnchor="end">LÍNEA 1 · 9.5 km</text>
      <circle cx="280" cy="100" r="2.5" fill="currentColor" className="node-pulse" />
    </svg>
  );
}

function DiagramTamanique() {
  return (
    <svg viewBox="0 0 400 260" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
      <text x="20" y="32" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.6">SV · 13°27′N 89°25′W</text>
      <rect x="320" y="20" width="60" height="20" />
      <text x="350" y="33" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" textAnchor="middle">EL SALVADOR</text>
      <line x1="40" y1="120" x2="80" y2="120" />
      <text x="40" y="108" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.6">IN · 115kV</text>
      <line x1="80" y1="100" x2="80" y2="200" strokeWidth="2.5" />
      {[100, 180, 260].map((x, i) => (
        <g key={i}>
          <line x1="80" y1="120" x2={x} y2="120" />
          <line x1={x} y1="120" x2={x} y2="140" />
          <rect x={x - 7} y="140" width="14" height="14" />
          <line x1={x} y1="154" x2={x} y2="175" />
          <circle cx={x} cy="184" r="6" />
          <circle cx={x} cy="198" r="6" />
          <line x1={x} y1="204" x2={x} y2="225" />
          <text x={x} y="240" fontFamily="var(--f-mono)" fontSize="8" fill="currentColor" opacity="0.6" textAnchor="middle">BAY {String(i + 1).padStart(2, "0")}</text>
        </g>
      ))}
      <circle cx="180" cy="120" r="2.5" fill="currentColor" className="node-pulse" />
    </svg>
  );
}

function DiagramDistribucion() {
  return (
    <svg viewBox="0 0 400 260" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
      <text x="20" y="32" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.6">RED · 34.5 / 13.8 kV</text>
      <line x1="20" y1="120" x2="60" y2="120" strokeWidth="2.5" />
      <circle cx="40" cy="100" r="2.5" fill="currentColor" className="node-pulse" />
      <line x1="60" y1="120" x2="160" y2="120" />
      <line x1="160" y1="60" x2="160" y2="220" />
      <line x1="160" y1="60" x2="280" y2="60" />
      <line x1="280" y1="60" x2="280" y2="40" />
      <line x1="280" y1="60" x2="380" y2="60" />
      <line x1="160" y1="120" x2="280" y2="120" />
      <line x1="280" y1="120" x2="380" y2="120" />
      <line x1="160" y1="180" x2="240" y2="180" />
      <line x1="240" y1="180" x2="240" y2="220" />
      <line x1="160" y1="220" x2="380" y2="220" />
      {[[280, 40], [380, 60], [380, 120], [240, 220], [380, 220]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="4" />
          <line x1={x - 3} y1={y - 3} x2={x + 3} y2={y + 3} strokeWidth="0.8" />
          <line x1={x + 3} y1={y - 3} x2={x - 3} y2={y + 3} strokeWidth="0.8" />
        </g>
      ))}
      <text x="380" y="245" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.55" textAnchor="end">5 ALIMENTADORES · COSTA</text>
    </svg>
  );
}

function DiagramRural() {
  const poles: [number, number][] = [[40, 90], [100, 100], [160, 80], [220, 110], [280, 95], [340, 130]];
  return (
    <svg viewBox="0 0 400 260" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
      <text x="20" y="32" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.6">RED RURAL · 13.2 kV</text>
      {poles.map(([x, y], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={x} y2={y + 50} strokeWidth="1.2" />
          <line x1={x - 12} y1={y + 10} x2={x + 12} y2={y + 10} />
          <circle cx={x - 10} cy={y + 10} r="2" fill="currentColor" />
          <circle cx={x} cy={y + 10} r="2" fill="currentColor" />
          <circle cx={x + 10} cy={y + 10} r="2" fill="currentColor" />
          {poles[i + 1] && (
            <>
              <line x1={x - 10} y1={y + 10} x2={poles[i + 1][0] - 10} y2={poles[i + 1][1] + 10} />
              <line x1={x} y1={y + 10} x2={poles[i + 1][0]} y2={poles[i + 1][1] + 10} />
              <line x1={x + 10} y1={y + 10} x2={poles[i + 1][0] + 10} y2={poles[i + 1][1] + 10} />
            </>
          )}
        </g>
      ))}
      <g transform="translate(220, 100)">
        <circle cx="0" cy="40" r="6" />
        <circle cx="0" cy="52" r="6" />
        <line x1="0" y1="58" x2="0" y2="68" />
        <line x1="-8" y1="68" x2="8" y2="68" />
      </g>
      <line x1="20" y1="190" x2="380" y2="190" strokeDasharray="2 2" opacity="0.4" />
      <text x="20" y="208" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.55">CALDAS · 24 km de línea</text>
      <text x="380" y="208" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.55" textAnchor="end">XFMR 50 kVA · 3φ</text>
      <text x="20" y="228" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.55">CLIENTE · CHEC</text>
      <text x="380" y="228" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.55" textAnchor="end">MANTENIMIENTO PREVENTIVO</text>
      <circle cx="220" cy="105" r="2.5" fill="currentColor" className="node-pulse" />
    </svg>
  );
}

/* ── Data ─────────────────────────────────────────────────────────── */
type Spec = [string, string];

const PROJECTS: {
  ref: string;
  name: string;
  client: string;
  cat: string;
  loc: string;
  year: string;
  desc: string;
  specs: Spec[];
  Diagram: () => React.ReactElement;
}[] = [
  {
    ref: "#001",
    name: "Subestación Betulia",
    client: "EPM",
    cat: "Obra Civil",
    loc: "Antioquia, CO",
    year: "2023",
    desc: "Construcción de obra civil para modernización de subestación de transmisión eléctrica con EPM.",
    specs: [
      ["ALCANCE",    "Obra civil + cimentaciones"],
      ["TENSIÓN",    "220 / 34.5 kV"],
      ["DURACIÓN",   "18 meses"],
      ["ESTÁNDARES", "NSR-10 · RETIE"],
    ],
    Diagram: DiagramSubestacion,
  },
  {
    ref: "#002",
    name: "Parque Solar Tepuy",
    client: "Privado",
    cat: "Energía Renovable",
    loc: "Colombia",
    year: "2023",
    desc: "Montaje electromecánico completo para planta de generación solar fotovoltaica.",
    specs: [
      ["ALCANCE",    "Montaje electromecánico"],
      ["CAPACIDAD",  "5 MW"],
      ["INVERSORES", "Centralizados · 1500 V DC"],
      ["INTERFAZ",   "Inyección 13.8 kV"],
    ],
    Diagram: DiagramSolar,
  },
  {
    ref: "#003",
    name: "Metro Línea 1",
    client: "Metro de Medellín",
    cat: "Infraestructura",
    loc: "Antioquia, CO",
    year: "2024",
    desc: "Diseño y montaje de infraestructura eléctrica para sistema de transporte masivo.",
    specs: [
      ["ALCANCE",  "Diseño + montaje catenaria"],
      ["SISTEMA",  "1500 V DC"],
      ["LONGITUD", "9.5 km · Línea 1"],
      ["SUBEST.",  "Rectificadoras · 3 nodos"],
    ],
    Diagram: DiagramMetro,
  },
  {
    ref: "#004",
    name: "Tamanique",
    client: "Privado",
    cat: "Internacional",
    loc: "El Salvador",
    year: "2023",
    desc: "Proyecto de infraestructura eléctrica en El Salvador, expandiendo operaciones a Centroamérica.",
    specs: [
      ["ALCANCE",    "Subestación compacta"],
      ["TENSIÓN",    "115 / 23 kV"],
      ["BAYS",       "3 salidas"],
      ["NORMATIVA",  "IEEE / IEC"],
    ],
    Diagram: DiagramTamanique,
  },
  {
    ref: "#005",
    name: "Diseños Air-e",
    client: "Air-e",
    cat: "Diseño Eléctrico",
    loc: "Costa Atlántica, CO",
    year: "2023",
    desc: "Servicios de diseño electromecánico para el operador de red del Caribe colombiano.",
    specs: [
      ["ALCANCE",    "Diseño de red"],
      ["CIRCUITOS",  "5 alimentadores"],
      ["TENSIÓN",    "34.5 / 13.8 kV"],
      ["NORMATIVA",  "RETIE · CREG"],
    ],
    Diagram: DiagramDistribucion,
  },
  {
    ref: "#006",
    name: "Dorada Norte CHEC",
    client: "CHEC",
    cat: "Mantenimiento",
    loc: "Caldas, CO",
    year: "2024",
    desc: "Instalación y mantenimiento de infraestructura eléctrica para CHEC en la región cafetera.",
    specs: [
      ["ALCANCE",   "Mantenimiento preventivo"],
      ["LONGITUD",  "24 km de línea rural"],
      ["ACTIVOS",   "XFMR 50 kVA · 3φ"],
      ["VIGENCIA",  "Contrato marco"],
    ],
    Diagram: DiagramRural,
  },
];

/* ── Component ───────────────────────────────────────────────────── */
export default function Projects() {
  const [open, setOpen] = useState<string | null>("#001");

  return (
    <section id="proyectos" style={{ paddingTop: "var(--pad-y)", paddingBottom: "var(--pad-y)" }}>
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
              SEC. 04 / 08
            </span>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--g-3)", textTransform: "uppercase" }}>
              Proyectos
            </span>
          </div>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
            06 DE +200
          </span>
        </div>

        {/* H2 + sub-copy */}
        <div className="proj-intro">
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              lineHeight: 1.02,
              color: "var(--ink)",
            }}
          >
            Un extracto del archivo.
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>Proyectos seleccionados.</em>
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--g-2)", maxWidth: 360, alignSelf: "end" }}>
            Selecciona cualquier fila para inspeccionar el diagrama unifilar y las especificaciones técnicas del proyecto.
          </p>
        </div>

        {/* Table */}
        <div
          style={{
            marginTop: 56,
            borderTop: "1px solid var(--ink)",
          }}
        >
          {/* Header row */}
          <div className="proj-row proj-header">
            <span>REF</span>
            <span>PROYECTO</span>
            <span>CLIENTE</span>
            <span className="hide-sm">CATEGORÍA</span>
            <span className="hide-sm">UBICACIÓN</span>
            <span style={{ textAlign: "right" }}>AÑO</span>
          </div>

          {/* Data rows */}
          {PROJECTS.map((p) => (
            <div key={p.ref}>
              <div
                className={`proj-row proj-data${open === p.ref ? " is-open" : ""}`}
                onClick={() => setOpen(open === p.ref ? null : p.ref)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setOpen(open === p.ref ? null : p.ref)}
              >
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.06em", color: "var(--g-3)" }}>
                  {p.ref}
                </span>
                <span style={{ fontWeight: 500 }}>{p.name}</span>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--g-2)" }}>{p.client}</span>
                <span className="hide-sm" style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--g-3)" }}>{p.cat}</span>
                <span className="hide-sm" style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--g-3)" }}>{p.loc}</span>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--g-2)", textAlign: "right" }}>
                  {open === p.ref ? "−" : "+"} {p.year}
                </span>
              </div>

              {open === p.ref && (
                <div className="proj-expand">
                  {/* Diagram */}
                  <div
                    style={{
                      background: "var(--bg-soft)",
                      padding: 32,
                      aspectRatio: "400 / 260",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p.Diagram />
                  </div>

                  {/* Specs */}
                  <div style={{ padding: "8px 0" }}>
                    <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.08em" }}>
                      FICHA TÉCNICA · {p.ref}
                    </span>
                    <h3
                      style={{
                        fontSize: "clamp(20px, 2vw, 28px)",
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                        marginTop: 8,
                        marginBottom: 12,
                        color: "var(--ink)",
                      }}
                    >
                      {p.name}
                    </h3>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--g-2)", marginBottom: 24 }}>
                      {p.desc}
                    </p>
                    {p.specs.map(([k, v]) => (
                      <div
                        key={k}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px 0",
                          borderTop: "1px solid var(--g-5)",
                        }}
                      >
                        <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.08em", color: "var(--g-3)" }}>
                          {k}
                        </span>
                        <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--ink)", fontWeight: 500 }}>
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Gallery */}
        <div style={{ marginTop: 96 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 32,
              paddingBottom: 16,
              borderBottom: "1px solid var(--g-5)",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(20px, 2.2vw, 30px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              Galería visual.
            </h3>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.08em" }}>
              06 DIAGRAMAS UNIFILARES
            </span>
          </div>

          <div className="gal-grid">
            {PROJECTS.map((p) => (
              <article key={p.ref} className="gal-card">
                <div className="diagram-frame">
                  <p.Diagram />
                </div>
                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
                    {p.ref}
                  </span>
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
                    {p.cat}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "var(--ink)",
                    marginTop: 8,
                  }}
                >
                  {p.name}
                </p>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
                  {p.loc} · {p.year}
                </span>
              </article>
            ))}
          </div>
        </div>

        {/* Archive link */}
        <div style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
          <a
            href="#contacto"
            className="proj-archive-link"
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 12,
              letterSpacing: "0.08em",
              color: "var(--ink)",
              paddingBottom: 2,
              borderBottom: "1px solid var(--ink)",
            }}
          >
            Ver el archivo completo · +200 proyectos →
          </a>
        </div>
      </div>

      <style>{`
        .proj-intro {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 56px;
          align-items: end;
        }
        .proj-row {
          display: grid;
          grid-template-columns: 60px 2fr 1.2fr 1.2fr 1.4fr 80px;
          gap: 16px;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid var(--g-5);
        }
        .proj-header {
          font-family: var(--f-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          color: var(--g-3);
        }
        .proj-data {
          cursor: pointer;
          transition: background var(--t-base) var(--ease);
          padding: 20px 12px;
          margin: 0 -12px;
        }
        .proj-data:hover  { background: var(--bg-soft); }
        .proj-data.is-open { background: var(--bg-soft); }
        .proj-expand {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 48px;
          padding: 32px 0 40px;
          border-bottom: 1px solid var(--g-5);
        }
        .gal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--g-5);
          border: 1px solid var(--g-5);
        }
        .gal-card {
          background: var(--bg);
          padding: 24px;
          transition: background var(--t-base) var(--ease);
          cursor: default;
        }
        .gal-card:hover { background: var(--bg-inv); color: var(--ink-inv); }
        .gal-card:hover span,
        .gal-card:hover p { color: var(--ink-inv) !important; opacity: 0.9; }
        .diagram-frame {
          aspect-ratio: 400 / 260;
          padding: 16px;
          background: var(--bg-soft);
          transition: background var(--t-base) var(--ease), color var(--t-base) var(--ease);
        }
        .gal-card:hover .diagram-frame { background: var(--bg-inv); filter: invert(1); }
        .proj-archive-link:hover { opacity: 0.6; }

        @media (max-width: 1024px) {
          .proj-intro { grid-template-columns: 1fr; gap: 24px; }
          .proj-expand { grid-template-columns: 1fr; gap: 32px; }
          .gal-grid { grid-template-columns: repeat(2, 1fr); }
          .proj-row { grid-template-columns: 52px 1fr 100px 80px; gap: 12px; }
        }
        @media (max-width: 768px) {
          .hide-sm { display: none; }
          .gal-grid { grid-template-columns: 1fr; }
          .proj-row { grid-template-columns: 52px 1fr 80px; gap: 8px; }
        }
      `}</style>
    </section>
  );
}
