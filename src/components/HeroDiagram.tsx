export default function HeroDiagram() {
  return (
    <svg
      viewBox="0 0 720 500"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {/* Background dot grid */}
      <defs>
        <pattern id="g8" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="0.5" fill="currentColor" opacity="0.18" />
        </pattern>
      </defs>
      <rect width="720" height="500" fill="url(#g8)" opacity="0.4" />

      {/* Frame corner ticks */}
      {(
        [
          [10, 10, "tl"],
          [710, 10, "tr"],
          [710, 490, "br"],
          [10, 490, "bl"],
        ] as [number, number, string][]
      ).map(([x, y, k]) => (
        <g key={k} opacity="0.8">
          <line x1={x - 6} y1={y} x2={x + 6} y2={y} />
          <line x1={x} y1={y - 6} x2={x} y2={y + 6} />
        </g>
      ))}

      {/* Title block */}
      <text
        x="20" y="32"
        fontFamily="var(--f-mono)" fontSize="10"
        fill="currentColor" opacity="0.55" letterSpacing="0.8"
      >
        FIG. 01 · DIAGRAMA UNIFILAR · FLUJO DE POTENCIA
      </text>
      <text
        x="700" y="32"
        fontFamily="var(--f-mono)" fontSize="10"
        fill="currentColor" opacity="0.55" letterSpacing="0.8" textAnchor="end"
      >
        ESC. 1:1 · 60 Hz
      </text>

      {/* ── Generation: solar field ── */}
      <g transform="translate(40, 180)" strokeWidth="1.25">
        <text x="40" y="-12" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.7" letterSpacing="0.6" textAnchor="middle">FUENTE</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(${i * 22}, 0)`}>
            <rect x="0" y="0" width="18" height="34" />
            <line x1="0" y1="11" x2="18" y2="11" />
            <line x1="0" y1="22" x2="18" y2="22" />
            <line x1="9" y1="0" x2="9" y2="34" />
          </g>
        ))}
        <text x="40" y="58" fontFamily="var(--f-mono)" fontSize="10" fill="currentColor" letterSpacing="0.6" textAnchor="middle">PV · 13.8 kV</text>
      </g>

      {/* Bus 1 collector */}
      <line x1="155" y1="220" x2="200" y2="220" />
      <line x1="200" y1="200" x2="200" y2="240" strokeWidth="2.5" />

      {/* Step-up transformer */}
      <g transform="translate(225, 220)">
        <circle cx="0" cy="0" r="16" />
        <circle cx="22" cy="0" r="16" />
        <text x="11" y="-26" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.7" letterSpacing="0.6" textAnchor="middle">XFMR · 13.8/220 kV</text>
      </g>
      <line x1="263" y1="220" x2="295" y2="220" />

      {/* Transmission tower */}
      <g transform="translate(310, 220)" strokeWidth="1">
        <line x1="0" y1="-50" x2="0" y2="40" strokeWidth="1.5" />
        <line x1="-22" y1="-30" x2="22" y2="-30" />
        <line x1="-14" y1="-30" x2="-22" y2="-50" />
        <line x1="14"  y1="-30" x2="22"  y2="-50" />
        <line x1="-18" y1="-10" x2="18"  y2="-10" />
        <line x1="-12" y1="40"  x2="12"  y2="40" />
        <line x1="-12" y1="40"  x2="0"   y2="20" />
        <line x1="12"  y1="40"  x2="0"   y2="20" />
        <circle cx="-22" cy="-30" r="2.5" fill="currentColor" />
        <circle cx="22"  cy="-30" r="2.5" fill="currentColor" />
        <circle cx="-18" cy="-10" r="2.5" fill="currentColor" />
        <circle cx="18"  cy="-10" r="2.5" fill="currentColor" />
      </g>

      {/* Transmission lines — animated flow */}
      <line x1="335" y1="190" x2="525" y2="190" className="flow-line" />
      <line x1="335" y1="220" x2="525" y2="220" className="flow-line" />
      <line x1="335" y1="250" x2="525" y2="250" className="flow-line" />
      <text x="430" y="178" fontFamily="var(--f-mono)" fontSize="10" fill="currentColor" opacity="0.7" letterSpacing="0.6" textAnchor="middle">↗ 220 kV · TRANSMISIÓN</text>

      {/* ── Substation ── */}
      <g transform="translate(530, 130)">
        <rect x="0" y="0" width="120" height="180" strokeDasharray="2 2" opacity="0.6" />
        <text x="60" y="-8" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.7" letterSpacing="0.6" textAnchor="middle">SUBESTACIÓN</text>
        {/* Incoming busbar */}
        <line x1="0" y1="60" x2="120" y2="60" strokeWidth="2.5" />
        {/* Breakers */}
        <rect x="20" y="80" width="12" height="12" />
        <rect x="54" y="80" width="12" height="12" />
        <rect x="88" y="80" width="12" height="12" />
        <line x1="26" y1="60" x2="26" y2="80" />
        <line x1="60" y1="60" x2="60" y2="80" />
        <line x1="94" y1="60" x2="94" y2="80" />
        {/* Step-down transformers */}
        <g transform="translate(20, 105)"><circle cx="6" cy="6" r="6" /><circle cx="6" cy="18" r="6" /></g>
        <g transform="translate(54, 105)"><circle cx="6" cy="6" r="6" /><circle cx="6" cy="18" r="6" /></g>
        <g transform="translate(88, 105)"><circle cx="6" cy="6" r="6" /><circle cx="6" cy="18" r="6" /></g>
        {/* Outgoing busbar */}
        <line x1="0"  y1="140" x2="120" y2="140" strokeWidth="2.5" />
        <line x1="26" y1="129" x2="26"  y2="140" />
        <line x1="60" y1="129" x2="60"  y2="140" />
        <line x1="94" y1="129" x2="94"  y2="140" />
        {/* Feeders */}
        <line x1="20"  y1="140" x2="20"  y2="170" />
        <line x1="60"  y1="140" x2="60"  y2="170" />
        <line x1="100" y1="140" x2="100" y2="170" />
        <text x="60" y="194" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.7" letterSpacing="0.6" textAnchor="middle">13.8 kV · DISTRIBUCIÓN</text>
      </g>

      {/* ── Distribution fan-out ── */}
      <g transform="translate(550, 330)" strokeWidth="1">
        <line x1="0"   y1="0" x2="0"  y2="20" />
        <line x1="40"  y1="0" x2="40" y2="40" />
        <line x1="80"  y1="0" x2="80" y2="20" />
        <line x1="-20" y1="20" x2="100" y2="20" />
        {[0, 40, 80].map((x, i) => (
          <g key={i} transform={`translate(${x - 20}, 60)`}>
            <rect x="0" y="0" width="40" height="32" opacity="0.7" />
            <line x1="0"  y1="10" x2="40" y2="10" opacity="0.7" />
            <line x1="20" y1="10" x2="20" y2="32" opacity="0.7" />
          </g>
        ))}
        <text x="40" y="110" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.7" letterSpacing="0.6" textAnchor="middle">USUARIOS · CARGAS</text>
      </g>

      {/* ── Annotations ── */}
      <line x1="40"  y1="430" x2="155" y2="430" strokeDasharray="2 2" opacity="0.5" />
      <text x="40"  y="450" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.6" letterSpacing="0.6">§A · GENERACIÓN</text>
      <line x1="200" y1="430" x2="335" y2="430" strokeDasharray="2 2" opacity="0.5" />
      <text x="200" y="450" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.6" letterSpacing="0.6">§B · TRANSFORMACIÓN</text>
      <line x1="340" y1="430" x2="525" y2="430" strokeDasharray="2 2" opacity="0.5" />
      <text x="340" y="450" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.6" letterSpacing="0.6">§C · TRANSMISIÓN</text>
      <line x1="530" y1="430" x2="700" y2="430" strokeDasharray="2 2" opacity="0.5" />
      <text x="530" y="450" fontFamily="var(--f-mono)" fontSize="9" fill="currentColor" opacity="0.6" letterSpacing="0.6">§D · SUBEST + DIST</text>

      {/* ── Pulsing live nodes ── */}
      <circle cx="200" cy="220" r="3" fill="currentColor" className="node-pulse" />
      <circle cx="430" cy="220" r="3" fill="currentColor" className="node-pulse" />
      <circle cx="590" cy="280" r="3" fill="currentColor" className="node-pulse" />
    </svg>
  );
}
