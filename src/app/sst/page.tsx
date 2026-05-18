"use client";

import { useState, useEffect } from "react";
import SignatureCanvas from "@/components/SignatureCanvas";

const FORM_TYPES = [
  "Inducción SST",
  "Permiso de Trabajo en Alturas",
  "Permiso de Trabajo Eléctrico",
  "Inspección Pre-operacional",
  "Reporte de Incidente / Accidente",
];

type Status = "idle" | "loading" | "success" | "error";

export default function SSTPage() {
  const [form, setForm] = useState({
    nombre: "",
    cedula: "",
    cargo: "",
    empresa: "",
    tipoFormulario: "",
  });
  const [firma, setFirma] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [refCode, setRefCode] = useState("SST-0000");
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    setRefCode("SST-" + String(Math.floor(Math.random() * 9000) + 1000));
    const now = new Date();
    setDateStr(now.toISOString().slice(0, 10));
    setTimeStr(now.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", hour12: false }));
  }, []);

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firma) {
      setErrorMsg("La firma electrónica es obligatoria.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/sst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, firma }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  /* ── Success state ─────────────────────────────────────────────── */
  if (status === "success") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
        {/* Top nav */}
        <nav style={{
          borderBottom: "1px solid var(--g-5)",
          padding: "14px var(--pad-x)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <a href="/" style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--ink)", letterSpacing: "0.06em", textDecoration: "none" }}>
            ← VOLVER AL INICIO
          </a>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
            FORM-02 · REV. 2024-Q4
          </span>
        </nav>

        {/* Success card */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--pad-x)" }}>
          <div style={{ border: "1px solid var(--ink)", maxWidth: 480, width: "100%" }}>
            <div style={{
              padding: "14px 24px",
              borderBottom: "1px solid var(--ink)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.06em", fontWeight: 600, color: "var(--ink)" }}>
                REGISTRO SST · FORM-02
              </span>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--g-3)", letterSpacing: "0.06em" }}>
                REF / <span style={{ color: "var(--ink)" }}>{refCode}</span>
              </span>
            </div>
            <div style={{ padding: "40px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.08em" }}>
                STATUS · GUARDADO EN DRIVE
              </span>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 400, letterSpacing: "-0.025em", lineHeight: 1.0, color: "var(--ink)" }}>
                Registro completado.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--g-2)", maxWidth: 380 }}>
                El formulario <strong style={{ color: "var(--ink)" }}>{form.tipoFormulario}</strong> fue registrado
                correctamente para <strong style={{ color: "var(--ink)" }}>{form.nombre}</strong> y guardado en Google Drive.
              </p>
              <div style={{
                paddingTop: 20,
                borderTop: "1px solid var(--g-5)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
                  FECHA · {dateStr} · MEDELLÍN, CO
                </span>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm({ nombre: "", cedula: "", cargo: "", empresa: "", tipoFormulario: "" });
                    setFirma(null);
                  }}
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
                  NUEVO REGISTRO →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page footer */}
        <footer style={{
          borderTop: "1px solid var(--g-5)",
          padding: "14px var(--pad-x)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "var(--g-3)", letterSpacing: "0.06em" }}>
            © 2024 JCAG S.A.S · SISTEMA DE GESTIÓN SST
          </span>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "var(--g-3)", letterSpacing: "0.06em" }}>
            FORM-02 / 02 · SHEET 01 OF 01
          </span>
        </footer>
      </div>
    );
  }

  /* ── Main form ─────────────────────────────────────────────────── */
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>

      {/* Top nav */}
      <nav style={{
        borderBottom: "1px solid var(--g-5)",
        padding: "14px var(--pad-x)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <a href="/" style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--ink)", letterSpacing: "0.06em", textDecoration: "none" }}>
          ← VOLVER AL INICIO
        </a>
        <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
          FORM-02 · REV. 2024-Q4
        </span>
      </nav>

      {/* Page body */}
      <div style={{ flex: 1, maxWidth: 720, width: "100%", margin: "0 auto", padding: "56px var(--pad-x) 80px" }}>

        {/* Intro */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{
              fontFamily: "var(--f-mono)",
              fontSize: 10,
              letterSpacing: "0.1em",
              color: "var(--ink)",
              border: "1px solid var(--ink)",
              padding: "4px 10px",
            }}>
              JCAG S.A.S
            </span>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.08em", color: "var(--g-3)" }}>
              FORMULARIO INTERNO · SST · DIGITAL
            </span>
          </div>
          <h1 style={{
            fontSize: "clamp(32px, 4vw, 56px)",
            fontWeight: 400,
            letterSpacing: "-0.028em",
            lineHeight: 1.0,
            marginBottom: 16,
            color: "var(--ink)",
          }}>
            Registro <em style={{ fontWeight: 300, fontStyle: "italic" }}>SST</em> Digital.
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--g-2)", maxWidth: 480 }}>
            Diligencia el formulario y añade tu firma electrónica. El documento se guardará automáticamente en Google Drive de JCAG.
          </p>
        </div>

        {/* Form card */}
        <form onSubmit={handleSubmit}>
          <div style={{ border: "1px solid var(--ink)" }}>

            {/* Card title bar */}
            <div style={{
              padding: "14px 24px",
              borderBottom: "1px solid var(--ink)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.06em", fontWeight: 600, color: "var(--ink)" }}>
                REGISTRO SST · FORM-02
              </span>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--g-3)", letterSpacing: "0.06em" }}>
                REF / <span style={{ color: "var(--ink)" }}>{refCode}</span>
              </span>
            </div>

            {/* Fields */}
            <div style={{ padding: "36px 32px", display: "flex", flexDirection: "column", gap: 28 }}>

              {/* §A TIPO DE FORMULARIO */}
              <div className="sst-field sst-full">
                <label>§ A · TIPO DE FORMULARIO *</label>
                <select
                  required
                  value={form.tipoFormulario}
                  onChange={(e) => set("tipoFormulario", e.target.value)}
                  className="sst-select"
                >
                  <option value="">Selecciona un tipo…</option>
                  {FORM_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* §B NOMBRE */}
              <div className="sst-field sst-full">
                <label>§ B · NOMBRE COMPLETO *</label>
                <input
                  type="text"
                  required
                  value={form.nombre}
                  onChange={(e) => set("nombre", e.target.value)}
                  placeholder="Tu nombre completo"
                />
              </div>

              {/* §C + §D — 2 col */}
              <div className="sst-2col">
                <div className="sst-field">
                  <label>§ C · CÉDULA *</label>
                  <input
                    type="text"
                    required
                    inputMode="numeric"
                    value={form.cedula}
                    onChange={(e) => set("cedula", e.target.value.replace(/\D/g, ""))}
                    placeholder="Número de cédula"
                  />
                </div>
                <div className="sst-field">
                  <label>§ D · CARGO / ROL *</label>
                  <input
                    type="text"
                    required
                    value={form.cargo}
                    onChange={(e) => set("cargo", e.target.value)}
                    placeholder="p. ej. Técnico Electricista"
                  />
                </div>
              </div>

              {/* §E EMPRESA */}
              <div className="sst-field sst-full">
                <label>§ E · EMPRESA / CONTRATISTA</label>
                <input
                  type="text"
                  value={form.empresa}
                  onChange={(e) => set("empresa", e.target.value)}
                  placeholder="Nombre de la empresa (opcional)"
                />
              </div>

              {/* §F FIRMA */}
              <div className="sst-field sst-full" style={{ borderBottom: 0, paddingBottom: 0 }}>
                <label>§ F · FIRMA ELECTRÓNICA *</label>
                <SignatureCanvas onChange={setFirma} />
                {errorMsg && errorMsg.includes("firma") && (
                  <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--ink)", letterSpacing: "0.06em", marginTop: 6 }}>
                    ↳ {errorMsg}
                  </span>
                )}
              </div>

            </div>

            {/* Metadata row */}
            <div style={{
              borderTop: "1px solid var(--g-5)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}>
              {[
                { k: "FECHA", v: dateStr },
                { k: "HORA", v: timeStr },
                { k: "UBICACIÓN", v: "MEDELLÍN, CO" },
              ].map(({ k, v }, i) => (
                <div key={k} style={{
                  padding: "16px 24px",
                  borderRight: i < 2 ? "1px solid var(--g-5)" : undefined,
                }}>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "var(--g-3)", letterSpacing: "0.08em", marginBottom: 4 }}>
                    {k}
                  </div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--ink)", letterSpacing: "0.04em" }}>
                    {v}
                  </div>
                </div>
              ))}
            </div>

            {/* Error message */}
            {errorMsg && !errorMsg.includes("firma") && (
              <div style={{
                borderTop: "1px solid var(--ink)",
                padding: "14px 24px",
                display: "flex",
                gap: 12,
                alignItems: "center",
              }}>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--ink)", letterSpacing: "0.06em" }}>
                  ERROR ↳
                </span>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--ink)" }}>
                  {errorMsg}
                </span>
              </div>
            )}

            {/* Submit */}
            <div style={{ borderTop: "1px solid var(--ink)", padding: "20px 32px" }}>
              <button
                type="submit"
                disabled={status === "loading"}
                className="sst-submit"
              >
                {status === "loading" ? (
                  "GUARDANDO EN DRIVE…"
                ) : (
                  "↑ ENVIAR Y GUARDAR EN DRIVE →"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Page footer */}
      <footer style={{
        borderTop: "1px solid var(--g-5)",
        padding: "14px var(--pad-x)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "var(--g-3)", letterSpacing: "0.06em" }}>
          © 2024 JCAG S.A.S · SISTEMA DE GESTIÓN SST
        </span>
        <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "var(--g-3)", letterSpacing: "0.06em" }}>
          FORM-02 / 02 · SHEET 01 OF 01
        </span>
      </footer>

      <style>{`
        .sst-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-bottom: 1px solid var(--ink);
          padding-bottom: 12px;
        }
        .sst-field label {
          font-family: var(--f-mono);
          font-size: 10px;
          color: var(--g-3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .sst-field input,
        .sst-select {
          font-family: var(--f-ui);
          font-size: 16px;
          color: var(--ink);
          border: 0;
          outline: 0;
          background: transparent;
          padding: 4px 0;
          width: 100%;
          -webkit-appearance: none;
          appearance: none;
        }
        .sst-field input::placeholder { color: var(--g-4); }
        .sst-select option { background: var(--bg); color: var(--ink); }
        .sst-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px 32px;
        }
        .sst-submit {
          width: 100%;
          height: 56px;
          background: var(--ink);
          color: var(--ink-inv);
          font-family: var(--f-mono);
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
          border: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity var(--t-fast) var(--ease);
        }
        .sst-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .sst-submit:not(:disabled):hover { opacity: 0.85; }
        @media (max-width: 600px) {
          .sst-2col { grid-template-columns: 1fr; gap: 28px; }
        }
      `}</style>
    </div>
  );
}
