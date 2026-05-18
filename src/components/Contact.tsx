"use client";

import { useState, useEffect } from "react";

export default function Contact() {
  const [refCode, setRefCode] = useState("FC-0000");
  const [dateStr, setDateStr] = useState("");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", company: "", phone: "", projectType: "", message: "",
  });

  useEffect(() => {
    setRefCode("FC-" + String(Math.floor(Math.random() * 9000) + 1000));
    setDateStr(new Date().toISOString().slice(0, 10));
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="contacto"
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
              SEC. 08 / 08
            </span>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", color: "var(--g-3)", textTransform: "uppercase" }}>
              Contacto · Solicitud
            </span>
          </div>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
            SLA · 24 H
          </span>
        </div>

        {/* Two-column grid */}
        <div className="contact-grid">

          {/* Left: form card */}
          <div style={{ border: "1px solid var(--ink)" }}>

            {/* Card title bar */}
            <div
              style={{
                padding: "14px 24px",
                borderBottom: "1px solid var(--ink)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.06em", fontWeight: 600, color: "var(--ink)" }}>
                SOLICITUD DE CONTACTO · FORM-01
              </span>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.06em", color: "var(--g-3)" }}>
                REF / <span style={{ color: "var(--ink)" }}>{refCode}</span>
              </span>
            </div>

            {/* Card body */}
            <div style={{ padding: "36px 32px" }}>
              {sent ? (
                /* Success state */
                <div
                  style={{
                    minHeight: 320,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 24,
                  }}
                >
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.08em" }}>
                    STATUS · ENVIADO
                  </span>
                  <h2
                    style={{
                      fontSize: "clamp(28px, 3vw, 48px)",
                      fontWeight: 400,
                      letterSpacing: "-0.025em",
                      lineHeight: 1.0,
                      color: "var(--ink)",
                    }}
                  >
                    Solicitud recibida.
                  </h2>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--g-2)", maxWidth: 420 }}>
                    Nuestro equipo revisará tu solicitud y te responderá en menos de 24 horas hábiles.
                  </p>
                  <div
                    style={{
                      paddingTop: 20,
                      borderTop: "1px solid var(--g-5)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
                      FECHA · {dateStr} · MEDELLÍN, CO
                    </span>
                    <button
                      onClick={() => { setSent(false); setForm({ name:"", email:"", company:"", phone:"", projectType:"", message:"" }); }}
                      style={{
                        fontFamily: "var(--f-mono)",
                        fontSize: 10,
                        letterSpacing: "0.08em",
                        color: "var(--g-3)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      NUEVA SOLICITUD →
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2
                    style={{
                      fontSize: "clamp(28px, 3vw, 48px)",
                      fontWeight: 400,
                      letterSpacing: "-0.025em",
                      lineHeight: 1.0,
                      marginBottom: 12,
                      color: "var(--ink)",
                    }}
                  >
                    ¿Tienes un proyecto?
                  </h2>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--g-2)", marginBottom: 32 }}>
                    Diligencia esta solicitud — nuestro equipo te responderá en menos de 24 horas.
                  </p>

                  <form onSubmit={handleSubmit} className="contact-form-fields">
                    {/* NOMBRE */}
                    <div className="cf-field">
                      <label>NOMBRE</label>
                      <input type="text" placeholder="Tu nombre completo" required value={form.name} onChange={set("name")} />
                    </div>

                    {/* EMAIL */}
                    <div className="cf-field">
                      <label>EMAIL</label>
                      <input type="email" placeholder="email@empresa.com" required value={form.email} onChange={set("email")} />
                    </div>

                    {/* EMPRESA */}
                    <div className="cf-field">
                      <label>EMPRESA</label>
                      <input type="text" placeholder="Nombre de la empresa" value={form.company} onChange={set("company")} />
                    </div>

                    {/* TELÉFONO */}
                    <div className="cf-field">
                      <label>TELÉFONO</label>
                      <input type="tel" placeholder="+57 ___ ___ ____" value={form.phone} onChange={set("phone")} />
                    </div>

                    {/* TIPO DE PROYECTO — full width */}
                    <div className="cf-field cf-full">
                      <label>TIPO DE PROYECTO</label>
                      <input
                        type="text"
                        placeholder="p. ej. modernización de subestación, parque solar, mantenimiento…"
                        value={form.projectType}
                        onChange={set("projectType")}
                      />
                    </div>

                    {/* MENSAJE — full width */}
                    <div className="cf-field cf-full">
                      <label>MENSAJE / DESCRIPCIÓN</label>
                      <textarea
                        placeholder="Cuéntanos brevemente el alcance, ubicación y plazos del proyecto."
                        rows={5}
                        value={form.message}
                        onChange={set("message")}
                      />
                    </div>

                    {/* Footer row */}
                    <div
                      className="cf-full"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: 20,
                        borderTop: "1px solid var(--g-5)",
                        marginTop: 8,
                      }}
                    >
                      <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
                        FECHA · {dateStr} · MEDELLÍN, CO
                      </span>
                      <button
                        type="submit"
                        className="cf-submit"
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                      >
                        Enviar solicitud <span style={{ transition: "transform var(--t-base) var(--ease)", display: "inline-block" }}>↗</span>
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Right: contact info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              {
                k: "DIRECCIÓN",
                v: "Calle 49 SUR # 45A-300\nCentro Empresarial S48\nEnvigado — Antioquia",
                href: null,
              },
              {
                k: "TELÉFONO",
                v: "+57 604 479 67 87",
                href: "tel:+576044796787",
              },
              {
                k: "EMAIL",
                v: "administracion@jcagsas.com.co",
                href: "mailto:administracion@jcagsas.com.co",
              },
              {
                k: "WHATSAPP",
                v: "+57 604 479 67 87 ↗",
                href: "https://wa.me/576044796787",
              },
              {
                k: "HORARIO",
                v: "L–V · 08:00 – 17:30",
                href: null,
              },
              {
                k: "FORMULARIO SST",
                v: "Acceso para personal en campo →",
                href: "/sst",
              },
            ].map(({ k, v, href }) => (
              <div
                key={k}
                style={{
                  padding: "20px 0",
                  borderBottom: "1px solid var(--g-5)",
                  display: "flex",
                  gap: 12,
                  alignItems: "baseline",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 10,
                    color: "var(--g-3)",
                    letterSpacing: "0.08em",
                    flexShrink: 0,
                  }}
                >
                  {k}
                </span>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{
                      fontSize: 15,
                      color: "var(--ink)",
                      borderBottom: "1px solid var(--ink)",
                      lineHeight: 1.5,
                    }}
                  >
                    {v}
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: 15,
                      color: "var(--ink)",
                      lineHeight: 1.5,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {v}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 56px;
          align-items: start;
        }
        .contact-form-fields {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 32px;
        }
        .cf-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-bottom: 1px solid var(--ink);
          padding-bottom: 8px;
        }
        .cf-full { grid-column: 1 / -1; }
        .cf-field label {
          font-family: var(--f-mono);
          font-size: 10px;
          color: var(--g-3);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .cf-field input,
        .cf-field textarea {
          font-family: var(--f-ui);
          font-size: 16px;
          color: var(--ink);
          border: 0;
          outline: 0;
          background: transparent;
          padding: 4px 0;
          width: 100%;
        }
        .cf-field input::placeholder,
        .cf-field textarea::placeholder { color: var(--g-4); }
        .cf-field textarea { min-height: 96px; resize: vertical; }
        .cf-submit {
          height: 56px;
          padding: 0 28px;
          background: var(--ink);
          color: var(--ink-inv);
          font-family: var(--f-mono);
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-weight: 500;
          border: 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: opacity var(--t-fast) var(--ease);
        }
        @media (max-width: 1024px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .contact-form-fields { grid-template-columns: 1fr; gap: 18px; }
        }
      `}</style>
    </section>
  );
}
