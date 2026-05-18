const TESTIMONIALS = [
  {
    ref: "T-01",
    quote: "Mil gracias por el apoyo y ser aliado estratégico durante la ejecución de este contrato. JCAG es una gran empresa.",
    author: "Cliente EPM",
    project: "Proyecto Plan de Choque",
    rating: 5,
  },
  {
    ref: "T-02",
    quote: "Excelente estructura administrativa en campo. Disponibilidad de personal técnico ágil y oportuna de acuerdo a las necesidades.",
    author: "Cliente CHEC",
    project: "Proyecto Regivit",
    rating: 5,
  },
  {
    ref: "T-03",
    quote: "La empresa JCAG cumplió con los requerimientos técnicos del proyecto de manera satisfactoria.",
    author: "Cliente EPM",
    project: "Modernización Subestación Betulia",
    rating: 4,
  },
  {
    ref: "T-04",
    quote: "JCAG ha sido un aliado estratégico en el desarrollo de muchos proyectos del sector eléctrico, con cumplimiento total.",
    author: "Cinergy",
    project: "Proyectos sector energético",
    rating: 5,
  },
];

const AVG = (TESTIMONIALS.reduce((s, t) => s + t.rating, 0) / TESTIMONIALS.length).toFixed(2);

function RatingBlocks({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span
        style={{
          fontFamily: "var(--f-mono)",
          fontSize: 12,
          letterSpacing: "0.06em",
          color: "var(--ink)",
        }}
      >
        {Array.from({ length: 5 }).map((_, i) =>
          i < rating ? "■" : "□"
        ).join("")}
      </span>
      <span
        style={{
          fontFamily: "var(--f-mono)",
          fontSize: 10,
          color: "var(--g-3)",
          letterSpacing: "0.06em",
        }}
      >
        {rating}.0 / 5.0
      </span>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonios"
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
              SEC. 05 / 08
            </span>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--g-3)", textTransform: "uppercase" }}>
              Testimonios
            </span>
          </div>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
            04 RECIENTES · FUENTE VERIFICADA
          </span>
        </div>

        {/* H2 + sub-copy */}
        <div className="test-intro">
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 52px)",
              fontWeight: 400,
              letterSpacing: "-0.028em",
              lineHeight: 1.02,
              color: "var(--ink)",
            }}
          >
            Lo que dicen
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 300 }}>nuestros clientes.</em>
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--g-2)", maxWidth: 360, alignSelf: "end" }}>
            Calificaciones recogidas directamente de los responsables de cada contrato. Calificación promedio:{" "}
            <span style={{ fontFamily: "var(--f-mono)", color: "var(--ink)", fontWeight: 500 }}>
              {AVG} / 5.00.
            </span>
          </p>
        </div>

        {/* Cards grid */}
        <div className="test-grid" style={{ marginTop: 56 }}>
          {TESTIMONIALS.map((t) => (
            <article key={t.ref} className="test-card">
              {/* Card top */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.08em" }}>
                  {t.ref}
                </span>
                <RatingBlocks rating={t.rating} />
              </div>

              {/* Quote */}
              <blockquote
                style={{
                  borderLeft: "2px solid var(--g-4)",
                  paddingLeft: 20,
                  margin: 0,
                  flexGrow: 1,
                }}
              >
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "var(--g-1)",
                    fontStyle: "italic",
                    fontWeight: 300,
                  }}
                >
                  "{t.quote}"
                </p>
              </blockquote>

              {/* Card footer */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 28,
                  paddingTop: 20,
                  borderTop: "1px solid var(--g-5)",
                }}
              >
                <div>
                  <p style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)", marginBottom: 3 }}>
                    {t.author}
                  </p>
                  <p style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
                    {t.project}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 9,
                    letterSpacing: "0.1em",
                    color: "var(--ink)",
                    border: "1px solid var(--g-4)",
                    padding: "5px 10px",
                  }}
                >
                  ✓ VERIFICADO
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .test-intro {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 56px;
          align-items: end;
        }
        .test-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border: 1px solid var(--g-5);
          gap: 0;
        }
        .test-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--g-5);
          border-bottom: 1px solid var(--g-5);
          min-height: 280px;
        }
        .test-card:nth-child(2n) { border-right: 0; }
        .test-card:nth-child(3),
        .test-card:nth-child(4) { border-bottom: 0; }
        @media (max-width: 1024px) {
          .test-intro { grid-template-columns: 1fr; gap: 24px; }
        }
        @media (max-width: 700px) {
          .test-grid { grid-template-columns: 1fr; }
          .test-card { border-right: 0 !important; }
          .test-card:nth-child(3) { border-bottom: 1px solid var(--g-5) !important; }
        }
      `}</style>
    </section>
  );
}
