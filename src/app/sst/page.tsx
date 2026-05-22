"use client";

import { useState, useEffect, useRef } from "react";
import SignatureModal from "@/components/SignatureModal";
import { saveRegistro, type InspeccionPayload, type InspeccionRegistro } from "@/lib/inspeccionStore";
import { downloadInspeccionPdf } from "@/lib/inspeccionPdf";

const INSPECCION_CRITERIOS = [
  "Estado del motor",
  "Estado de los soportes del motor",
  "Estado del motor de arranque",
  "Estado del alternador",
  "Estado soportes del generador",
  "Estado del generador",
  "Estado del sistema eléctrico",
  "Estado de switch de encendido",
  "Niveles de aceite",
  "Estado de conexiones eléctricas",
  "Estado varilla puesta a tierra",
  "Estado de la batería",
  "Estado estado del exhosto",
  "Estado de las guardas",
  "Estado tanque de combustible",
  "Estado de manguera de combustible",
  "Estado de antivibraciones (patines)",
  "Estado tomas de salida de 110 y 220 AC",
  "Estado indicadores (horómetro - temperatura)",
  "Estado de caja de totalizadores",
];

const PERSONAL_CRITERIOS = [
  "El operador reconoce el funcionamiento del equipo",
  "El operador usa de manera adecuada los EPP cuando está haciendo uso del equipo",
  "El operador reporta actos y condiciones inseguras / seguras",
];

type Respuesta = "C" | "NC" | "";
type Item = { criterio: string; respuesta: Respuesta; observaciones: string };
type Persona = { nombre: string; firma: string };

type FormState = {
  proyecto: string;
  fecha_inspeccion: string;
  inspector_responsable: string;
  inspeccion: Item[];
  personal: Item[];
  aceptacion: [{ operador: Persona; elaborado_por: Persona }];
};

type Errors = {
  proyecto?: string;
  fecha_inspeccion?: string;
  inspector_responsable?: string;
  inspeccion?: Record<number, string>;
  personal?: Record<number, string>;
  operador_nombre?: string;
  operador_firma?: string;
  elaborado_nombre?: string;
  elaborado_firma?: string;
  general?: string;
};

type Status = "idle" | "loading" | "success" | "error";

const STORAGE_DRAFT = "inspeccion:draft";
const STORAGE_FIRMA_OP = "inspeccion:firma_operador";
const STORAGE_FIRMA_EL = "inspeccion:firma_elaborado_por";

const todayISO = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const isoToDisplay = (iso: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

const buildEmptyForm = (): FormState => ({
  proyecto: "",
  fecha_inspeccion: todayISO(),
  inspector_responsable: "",
  inspeccion: INSPECCION_CRITERIOS.map((criterio) => ({
    criterio,
    respuesta: "",
    observaciones: "",
  })),
  personal: PERSONAL_CRITERIOS.map((criterio) => ({
    criterio,
    respuesta: "",
    observaciones: "",
  })),
  aceptacion: [
    {
      operador: { nombre: "", firma: "" },
      elaborado_por: { nombre: "", firma: "" },
    },
  ],
});

export default function InspeccionPage() {
  const [form, setForm] = useState<FormState>(buildEmptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [refCode, setRefCode] = useState("INS-0000");
  const [timeStr, setTimeStr] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const [modalOperador, setModalOperador] = useState(false);
  const [modalElaborado, setModalElaborado] = useState(false);
  const [lastRegistro, setLastRegistro] = useState<InspeccionRegistro | null>(null);

  const proyectoRef = useRef<HTMLInputElement>(null);
  const inspectorRef = useRef<HTMLInputElement>(null);
  const opNombreRef = useRef<HTMLInputElement>(null);
  const elNombreRef = useRef<HTMLInputElement>(null);
  const inspeccionSectionRef = useRef<HTMLDivElement>(null);
  const aceptacionSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRefCode("INS-" + String(Math.floor(Math.random() * 9000) + 1000));
    const now = new Date();
    setTimeStr(
      now.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", hour12: false })
    );

    try {
      const draftRaw = localStorage.getItem(STORAGE_DRAFT);
      const firmaOp = localStorage.getItem(STORAGE_FIRMA_OP) || "";
      const firmaEl = localStorage.getItem(STORAGE_FIRMA_EL) || "";

      if (draftRaw) {
        const draft = JSON.parse(draftRaw) as Partial<FormState>;
        setForm((prev) => ({
          proyecto: draft.proyecto ?? prev.proyecto,
          fecha_inspeccion: draft.fecha_inspeccion ?? prev.fecha_inspeccion,
          inspector_responsable: draft.inspector_responsable ?? prev.inspector_responsable,
          inspeccion:
            Array.isArray(draft.inspeccion) && draft.inspeccion.length === INSPECCION_CRITERIOS.length
              ? draft.inspeccion
              : prev.inspeccion,
          personal:
            Array.isArray(draft.personal) && draft.personal.length === PERSONAL_CRITERIOS.length
              ? draft.personal
              : prev.personal,
          aceptacion: [
            {
              operador: {
                nombre: draft.aceptacion?.[0]?.operador?.nombre ?? "",
                firma: firmaOp || draft.aceptacion?.[0]?.operador?.firma || "",
              },
              elaborado_por: {
                nombre: draft.aceptacion?.[0]?.elaborado_por?.nombre ?? "",
                firma: firmaEl || draft.aceptacion?.[0]?.elaborado_por?.firma || "",
              },
            },
          ],
        }));
      } else if (firmaOp || firmaEl) {
        setForm((prev) => ({
          ...prev,
          aceptacion: [
            {
              operador: { ...prev.aceptacion[0].operador, firma: firmaOp || "" },
              elaborado_por: { ...prev.aceptacion[0].elaborado_por, firma: firmaEl || "" },
            },
          ],
        }));
      }
    } catch {
      // ignore corrupt draft
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      const { aceptacion, ...rest } = form;
      const draft = {
        ...rest,
        aceptacion: [
          {
            operador: { nombre: aceptacion[0].operador.nombre, firma: "" },
            elaborado_por: { nombre: aceptacion[0].elaborado_por.nombre, firma: "" },
          },
        ],
      };
      localStorage.setItem(STORAGE_DRAFT, JSON.stringify(draft));
    } catch {
      // ignore quota errors
    }
  }, [form, hydrated]);

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const setItem = (
    section: "inspeccion" | "personal",
    index: number,
    patch: Partial<Item>
  ) => {
    setForm((prev) => ({
      ...prev,
      [section]: prev[section].map((it, i) => (i === index ? { ...it, ...patch } : it)),
    }));
  };

  const setOperador = (patch: Partial<Persona>) => {
    setForm((prev) => ({
      ...prev,
      aceptacion: [
        {
          ...prev.aceptacion[0],
          operador: { ...prev.aceptacion[0].operador, ...patch },
        },
      ],
    }));
  };

  const setElaborado = (patch: Partial<Persona>) => {
    setForm((prev) => ({
      ...prev,
      aceptacion: [
        {
          ...prev.aceptacion[0],
          elaborado_por: { ...prev.aceptacion[0].elaborado_por, ...patch },
        },
      ],
    }));
  };

  const validate = (): { ok: boolean; errs: Errors; firstFocus: () => void } => {
    const errs: Errors = {};
    let firstFocus: () => void = () => {};

    if (!form.proyecto.trim()) {
      errs.proyecto = "Campo obligatorio.";
      firstFocus = () => proyectoRef.current?.focus();
    }
    if (!form.fecha_inspeccion.trim()) {
      errs.fecha_inspeccion = "Selecciona una fecha.";
    }
    if (!form.inspector_responsable.trim()) {
      errs.inspector_responsable = "Campo obligatorio.";
      if (!Object.keys(errs).length) firstFocus = () => inspectorRef.current?.focus();
      else if (!errs.proyecto) firstFocus = () => inspectorRef.current?.focus();
    }

    const inspeccionErrs: Record<number, string> = {};
    form.inspeccion.forEach((it, i) => {
      if (it.respuesta !== "C" && it.respuesta !== "NC") {
        inspeccionErrs[i] = "Selecciona C o NC.";
      }
    });
    if (Object.keys(inspeccionErrs).length) {
      errs.inspeccion = inspeccionErrs;
    }

    const personalErrs: Record<number, string> = {};
    form.personal.forEach((it, i) => {
      if (it.respuesta !== "C" && it.respuesta !== "NC") {
        personalErrs[i] = "Selecciona C o NC.";
      }
    });
    if (Object.keys(personalErrs).length) {
      errs.personal = personalErrs;
    }

    if (!form.aceptacion[0].operador.nombre.trim()) {
      errs.operador_nombre = "Campo obligatorio.";
    }
    if (!form.aceptacion[0].operador.firma || form.aceptacion[0].operador.firma.length < 100) {
      errs.operador_firma = "Captura la firma del operador.";
    }
    if (!form.aceptacion[0].elaborado_por.nombre.trim()) {
      errs.elaborado_nombre = "Campo obligatorio.";
    }
    if (!form.aceptacion[0].elaborado_por.firma || form.aceptacion[0].elaborado_por.firma.length < 100) {
      errs.elaborado_firma = "Captura la firma de quien elabora.";
    }

    if (errs.inspeccion || errs.personal) {
      const total =
        Object.keys(errs.inspeccion || {}).length + Object.keys(errs.personal || {}).length;
      errs.general = `Faltan ${total} respuesta${total === 1 ? "" : "s"} en los criterios.`;
    }

    if (errs.proyecto || errs.inspector_responsable || errs.fecha_inspeccion) {
      // already set firstFocus for proyecto/inspector
    } else if (errs.inspeccion) {
      firstFocus = () =>
        inspeccionSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (errs.personal) {
      firstFocus = () =>
        inspeccionSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (errs.operador_nombre) {
      firstFocus = () => opNombreRef.current?.focus();
    } else if (errs.elaborado_nombre) {
      firstFocus = () => elNombreRef.current?.focus();
    } else if (errs.operador_firma || errs.elaborado_firma) {
      firstFocus = () =>
        aceptacionSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    return { ok: Object.keys(errs).length === 0, errs, firstFocus };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { ok, errs, firstFocus } = validate();
    setErrors(errs);
    if (!ok) {
      setErrorMsg(errs.general || "Revisa los campos marcados.");
      setTimeout(firstFocus, 50);
      return;
    }
    setErrorMsg("");
    setStatus("loading");

    const payload: InspeccionPayload = {
      proyecto: form.proyecto.trim(),
      fecha_inspeccion: isoToDisplay(form.fecha_inspeccion),
      inspector_responsable: form.inspector_responsable.trim(),
      inspeccion: form.inspeccion.map((it) => ({
        criterio: it.criterio,
        respuesta: it.respuesta as "C" | "NC",
        observaciones: it.observaciones,
      })),
      personal: form.personal.map((it) => ({
        criterio: it.criterio,
        respuesta: it.respuesta as "C" | "NC",
        observaciones: it.observaciones,
      })),
      aceptacion: [
        {
          operador: {
            nombre: form.aceptacion[0].operador.nombre.trim(),
            firma: form.aceptacion[0].operador.firma,
          },
          elaborado_por: {
            nombre: form.aceptacion[0].elaborado_por.nombre.trim(),
            firma: form.aceptacion[0].elaborado_por.firma,
          },
        },
      ],
    };

    try {
      const res = await fetch("/api/sst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al enviar el registro.");

      const registro = saveRegistro(payload, { ref: refCode });
      setLastRegistro(registro);

      try {
        downloadInspeccionPdf(registro);
      } catch (pdfErr) {
        console.error("Error generando PDF:", pdfErr);
      }

      try {
        localStorage.removeItem(STORAGE_DRAFT);
        localStorage.removeItem(STORAGE_FIRMA_OP);
        localStorage.removeItem(STORAGE_FIRMA_EL);
      } catch {
        // ignore
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error desconocido");
    }
  };

  const resetForm = () => {
    setForm(buildEmptyForm());
    setErrors({});
    setErrorMsg("");
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
        <nav
          style={{
            borderBottom: "1px solid var(--g-5)",
            padding: "14px var(--pad-x)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <a
            href="/"
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              color: "var(--ink)",
              letterSpacing: "0.06em",
              textDecoration: "none",
            }}
          >
            ← VOLVER AL INICIO
          </a>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
            INS-01 · REV. 2026-Q2
          </span>
        </nav>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--pad-x)" }}>
          <div style={{ border: "1px solid var(--ink)", maxWidth: 480, width: "100%" }}>
            <div
              style={{
                padding: "14px 24px",
                borderBottom: "1px solid var(--ink)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  fontWeight: 600,
                  color: "var(--ink)",
                }}
              >
                INSPECCIÓN PRE-OPERACIONAL · INS-01
              </span>
              <span
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 11,
                  color: "var(--g-3)",
                  letterSpacing: "0.06em",
                }}
              >
                REF / <span style={{ color: "var(--ink)" }}>{refCode}</span>
              </span>
            </div>
            <div style={{ padding: "40px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.08em" }}>
                STATUS · REGISTRO ENVIADO
              </span>
              <h2
                style={{
                  fontSize: "clamp(28px, 3vw, 44px)",
                  fontWeight: 400,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.0,
                  color: "var(--ink)",
                }}
              >
                Inspección registrada.
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--g-2)", maxWidth: 380 }}>
                La inspección del proyecto{" "}
                <strong style={{ color: "var(--ink)" }}>{form.proyecto}</strong> realizada por{" "}
                <strong style={{ color: "var(--ink)" }}>{form.inspector_responsable}</strong> fue
                registrada correctamente. Se descargó automáticamente el PDF.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => lastRegistro && downloadInspeccionPdf(lastRegistro)}
                  disabled={!lastRegistro}
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    color: "var(--ink-inv)",
                    background: "var(--ink)",
                    border: "1px solid var(--ink)",
                    padding: "12px 18px",
                    cursor: lastRegistro ? "pointer" : "not-allowed",
                    textTransform: "uppercase",
                    opacity: lastRegistro ? 1 : 0.5,
                  }}
                >
                  ↓ DESCARGAR PDF
                </button>
                <a
                  href="/sst/registros"
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    color: "var(--ink)",
                    background: "transparent",
                    border: "1px solid var(--ink)",
                    padding: "12px 18px",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  VER TODAS LAS INSPECCIONES →
                </a>
              </div>

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
                  FECHA · {isoToDisplay(form.fecha_inspeccion)}
                </span>
                <button
                  onClick={resetForm}
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

        <footer
          style={{
            borderTop: "1px solid var(--g-5)",
            padding: "14px var(--pad-x)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "var(--g-3)", letterSpacing: "0.06em" }}>
            © 2026 JCAG S.A.S · SISTEMA DE GESTIÓN SST
          </span>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "var(--g-3)", letterSpacing: "0.06em" }}>
            INS-01 / 01 · SHEET 01 OF 01
          </span>
        </footer>
      </div>
    );
  }

  const op = form.aceptacion[0].operador;
  const el = form.aceptacion[0].elaborado_por;

  const renderItemRow = (
    section: "inspeccion" | "personal",
    index: number,
    item: Item
  ) => {
    const errMap = section === "inspeccion" ? errors.inspeccion : errors.personal;
    const err = errMap?.[index];
    const radioName = `${section}-${index}`;
    return (
      <div key={`${section}-${index}`} className={`insp-row ${err ? "insp-row-err" : ""}`}>
        <div className="insp-row-num">{String(index + 1).padStart(2, "0")}</div>
        <div className="insp-row-criterio">{item.criterio}</div>
        <div className="insp-row-radios">
          <label className={`insp-radio ${item.respuesta === "C" ? "is-checked" : ""}`}>
            <input
              type="radio"
              name={radioName}
              value="C"
              checked={item.respuesta === "C"}
              onChange={() => setItem(section, index, { respuesta: "C" })}
            />
            <span>C</span>
          </label>
          <label className={`insp-radio ${item.respuesta === "NC" ? "is-checked is-nc" : ""}`}>
            <input
              type="radio"
              name={radioName}
              value="NC"
              checked={item.respuesta === "NC"}
              onChange={() => setItem(section, index, { respuesta: "NC" })}
            />
            <span>NC</span>
          </label>
        </div>
        <div className="insp-row-obs">
          <input
            type="text"
            value={item.observaciones}
            placeholder="Observaciones (opcional)"
            onChange={(e) => setItem(section, index, { observaciones: e.target.value })}
          />
        </div>
        {err && <div className="insp-row-err-msg">↳ {err}</div>}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      <nav
        style={{
          borderBottom: "1px solid var(--g-5)",
          padding: "14px var(--pad-x)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            color: "var(--ink)",
            letterSpacing: "0.06em",
            textDecoration: "none",
          }}
        >
          ← VOLVER AL INICIO
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a
            href="/sst/registros"
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              color: "var(--ink)",
              letterSpacing: "0.06em",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            VER REGISTROS →
          </a>
          <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
            INS-01 · REV. 2026-Q2
          </span>
        </div>
      </nav>

      <div style={{ flex: 1, maxWidth: 960, width: "100%", margin: "0 auto", padding: "56px var(--pad-x) 80px" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                color: "var(--ink)",
                border: "1px solid var(--ink)",
                padding: "4px 10px",
              }}
            >
              JCAG S.A.S
            </span>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.08em", color: "var(--g-3)" }}>
              INSPECCIÓN PRE-OPERACIONAL · DIGITAL
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 400,
              letterSpacing: "-0.028em",
              lineHeight: 1.0,
              marginBottom: 16,
              color: "var(--ink)",
            }}
          >
            Inspección <em style={{ fontWeight: 300, fontStyle: "italic" }}>Pre-operacional</em>.
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--g-2)", maxWidth: 520 }}>
            Diligencia el estado del equipo, las observaciones y captura las firmas del operador y de
            quien elabora. Las firmas se almacenan localmente en el dispositivo.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ border: "1px solid var(--ink)" }}>
            <div
              style={{
                padding: "14px 24px",
                borderBottom: "1px solid var(--ink)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  fontWeight: 600,
                  color: "var(--ink)",
                }}
              >
                INSPECCIÓN PRE-OPERACIONAL · INS-01
              </span>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--g-3)", letterSpacing: "0.06em" }}>
                REF / <span style={{ color: "var(--ink)" }}>{refCode}</span>
              </span>
            </div>

            <div style={{ padding: "36px 32px", display: "flex", flexDirection: "column", gap: 28 }}>
              <div className="sst-field sst-full">
                <label>§ A · PROYECTO *</label>
                <input
                  ref={proyectoRef}
                  type="text"
                  value={form.proyecto}
                  onChange={(e) => setField("proyecto", e.target.value)}
                  placeholder="p. ej. MANTENIMIENTO A PLANTA B"
                />
                {errors.proyecto && <span className="insp-field-err">↳ {errors.proyecto}</span>}
              </div>

              <div className="sst-2col">
                <div className="sst-field">
                  <label>§ B · FECHA DE INSPECCIÓN *</label>
                  <input
                    type="date"
                    value={form.fecha_inspeccion}
                    onChange={(e) => setField("fecha_inspeccion", e.target.value)}
                  />
                  {errors.fecha_inspeccion && (
                    <span className="insp-field-err">↳ {errors.fecha_inspeccion}</span>
                  )}
                </div>
                <div className="sst-field">
                  <label>§ C · INSPECTOR RESPONSABLE *</label>
                  <input
                    ref={inspectorRef}
                    type="text"
                    value={form.inspector_responsable}
                    onChange={(e) => setField("inspector_responsable", e.target.value)}
                    placeholder="Nombre completo"
                  />
                  {errors.inspector_responsable && (
                    <span className="insp-field-err">↳ {errors.inspector_responsable}</span>
                  )}
                </div>
              </div>

              <div ref={inspeccionSectionRef}>
                <div className="insp-section-title">§ D · INSPECCIÓN DEL EQUIPO</div>
                <div className="insp-table">
                  <div className="insp-table-head">
                    <div>#</div>
                    <div>Criterio</div>
                    <div>Respuesta</div>
                    <div>Observaciones</div>
                  </div>
                  {form.inspeccion.map((it, i) => renderItemRow("inspeccion", i, it))}
                </div>
              </div>

              <div>
                <div className="insp-section-title">§ E · PERSONAL</div>
                <div className="insp-table">
                  <div className="insp-table-head">
                    <div>#</div>
                    <div>Criterio</div>
                    <div>Respuesta</div>
                    <div>Observaciones</div>
                  </div>
                  {form.personal.map((it, i) => renderItemRow("personal", i, it))}
                </div>
              </div>

              <div ref={aceptacionSectionRef}>
                <div className="insp-section-title">§ F · ACEPTACIÓN</div>
                <div className="insp-acept">
                  <div className="insp-acept-card">
                    <div className="insp-acept-title">OPERADOR</div>
                    <div className="sst-field">
                      <label>NOMBRE *</label>
                      <input
                        ref={opNombreRef}
                        type="text"
                        value={op.nombre}
                        onChange={(e) => setOperador({ nombre: e.target.value })}
                        placeholder="Nombre del operador"
                      />
                      {errors.operador_nombre && (
                        <span className="insp-field-err">↳ {errors.operador_nombre}</span>
                      )}
                    </div>
                    <div className="insp-firma-block">
                      <label>FIRMA *</label>
                      {op.firma ? (
                        <div className="insp-firma-preview">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={op.firma} alt="Firma operador" />
                        </div>
                      ) : (
                        <div className="insp-firma-empty">Sin firma capturada.</div>
                      )}
                      <button
                        type="button"
                        className="insp-btn-secondary"
                        onClick={() => setModalOperador(true)}
                      >
                        {op.firma ? "REEMPLAZAR FIRMA →" : "CAPTURAR FIRMA →"}
                      </button>
                      {errors.operador_firma && (
                        <span className="insp-field-err">↳ {errors.operador_firma}</span>
                      )}
                    </div>
                  </div>

                  <div className="insp-acept-card">
                    <div className="insp-acept-title">ELABORADO POR</div>
                    <div className="sst-field">
                      <label>NOMBRE *</label>
                      <input
                        ref={elNombreRef}
                        type="text"
                        value={el.nombre}
                        onChange={(e) => setElaborado({ nombre: e.target.value })}
                        placeholder="Nombre de quien elabora"
                      />
                      {errors.elaborado_nombre && (
                        <span className="insp-field-err">↳ {errors.elaborado_nombre}</span>
                      )}
                    </div>
                    <div className="insp-firma-block">
                      <label>FIRMA *</label>
                      {el.firma ? (
                        <div className="insp-firma-preview">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={el.firma} alt="Firma elaborado por" />
                        </div>
                      ) : (
                        <div className="insp-firma-empty">Sin firma capturada.</div>
                      )}
                      <button
                        type="button"
                        className="insp-btn-secondary"
                        onClick={() => setModalElaborado(true)}
                      >
                        {el.firma ? "REEMPLAZAR FIRMA →" : "CAPTURAR FIRMA →"}
                      </button>
                      {errors.elaborado_firma && (
                        <span className="insp-field-err">↳ {errors.elaborado_firma}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid var(--g-5)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
              }}
            >
              {[
                { k: "FECHA", v: isoToDisplay(form.fecha_inspeccion) },
                { k: "HORA", v: timeStr },
                { k: "UBICACIÓN", v: "MEDELLÍN, CO" },
              ].map(({ k, v }, i) => (
                <div
                  key={k}
                  style={{
                    padding: "16px 24px",
                    borderRight: i < 2 ? "1px solid var(--g-5)" : undefined,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--f-mono)",
                      fontSize: 9,
                      color: "var(--g-3)",
                      letterSpacing: "0.08em",
                      marginBottom: 4,
                    }}
                  >
                    {k}
                  </div>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--ink)", letterSpacing: "0.04em" }}>
                    {v}
                  </div>
                </div>
              ))}
            </div>

            {errorMsg && (
              <div
                style={{
                  borderTop: "1px solid var(--ink)",
                  padding: "14px 24px",
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--f-mono)",
                    fontSize: 10,
                    color: "var(--ink)",
                    letterSpacing: "0.06em",
                  }}
                >
                  ERROR ↳
                </span>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--ink)" }}>
                  {errorMsg}
                </span>
              </div>
            )}

            <div style={{ borderTop: "1px solid var(--ink)", padding: "20px 32px" }}>
              <button type="submit" disabled={status === "loading"} className="sst-submit">
                {status === "loading" ? "ENVIANDO REGISTRO…" : "↑ ENVIAR REGISTRO →"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <footer
        style={{
          borderTop: "1px solid var(--g-5)",
          padding: "14px var(--pad-x)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "var(--g-3)", letterSpacing: "0.06em" }}>
          © 2026 JCAG S.A.S · SISTEMA DE GESTIÓN SST
        </span>
        <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "var(--g-3)", letterSpacing: "0.06em" }}>
          INS-01 / 01 · SHEET 01 OF 01
        </span>
      </footer>

      <SignatureModal
        open={modalOperador}
        title="Firma · Operador"
        storageKey={STORAGE_FIRMA_OP}
        initialValue={op.firma || null}
        onClose={() => setModalOperador(false)}
        onConfirm={(dataUrl) => setOperador({ firma: dataUrl })}
      />
      <SignatureModal
        open={modalElaborado}
        title="Firma · Elaborado por"
        storageKey={STORAGE_FIRMA_EL}
        initialValue={el.firma || null}
        onClose={() => setModalElaborado(false)}
        onConfirm={(dataUrl) => setElaborado({ firma: dataUrl })}
      />

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
        .sst-field input {
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

        .insp-field-err {
          font-family: var(--f-mono);
          font-size: 10px;
          color: #b3261e;
          letter-spacing: 0.06em;
        }

        .insp-section-title {
          font-family: var(--f-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--ink);
          text-transform: uppercase;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--ink);
          margin-bottom: 12px;
        }

        .insp-table {
          display: flex;
          flex-direction: column;
        }
        .insp-table-head {
          display: grid;
          grid-template-columns: 36px minmax(0, 1.7fr) 140px minmax(0, 1.3fr);
          gap: 16px;
          padding: 8px 0;
          font-family: var(--f-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--g-3);
          border-bottom: 1px solid var(--g-5);
        }
        .insp-row {
          display: grid;
          grid-template-columns: 36px minmax(0, 1.7fr) 140px minmax(0, 1.3fr);
          gap: 16px;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid var(--g-5);
        }
        .insp-row.insp-row-err {
          background: rgba(179, 38, 30, 0.04);
        }
        .insp-row-num {
          font-family: var(--f-mono);
          font-size: 10px;
          color: var(--g-3);
          letter-spacing: 0.04em;
        }
        .insp-row-criterio {
          font-family: var(--f-ui);
          font-size: 14px;
          color: var(--ink);
          line-height: 1.4;
        }
        .insp-row-radios {
          display: flex;
          gap: 8px;
        }
        .insp-radio {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px 10px;
          border: 1px solid var(--g-4);
          font-family: var(--f-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--g-2);
          cursor: pointer;
          background: transparent;
          transition: all var(--t-fast) var(--ease);
          user-select: none;
        }
        .insp-radio input { display: none; }
        .insp-radio:hover { border-color: var(--ink); color: var(--ink); }
        .insp-radio.is-checked {
          background: var(--ink);
          color: var(--ink-inv);
          border-color: var(--ink);
        }
        .insp-radio.is-checked.is-nc {
          background: #b3261e;
          border-color: #b3261e;
          color: #fff;
        }
        .insp-row-obs input {
          width: 100%;
          font-family: var(--f-ui);
          font-size: 13px;
          color: var(--ink);
          border: 0;
          border-bottom: 1px solid var(--g-5);
          outline: 0;
          background: transparent;
          padding: 6px 2px;
        }
        .insp-row-obs input:focus { border-bottom-color: var(--ink); }
        .insp-row-obs input::placeholder { color: var(--g-4); }
        .insp-row-err-msg {
          grid-column: 1 / -1;
          font-family: var(--f-mono);
          font-size: 10px;
          color: #b3261e;
          letter-spacing: 0.06em;
          padding-top: 4px;
        }

        .insp-acept {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .insp-acept-card {
          border: 1px solid var(--g-5);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .insp-acept-title {
          font-family: var(--f-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          color: var(--ink);
          text-transform: uppercase;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--ink);
        }
        .insp-firma-block {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .insp-firma-block > label {
          font-family: var(--f-mono);
          font-size: 10px;
          color: var(--g-3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .insp-firma-preview {
          border: 1px solid var(--g-5);
          padding: 8px;
          background: var(--bg-soft);
        }
        .insp-firma-preview img {
          display: block;
          width: 100%;
          height: auto;
          max-height: 120px;
          object-fit: contain;
        }
        .insp-firma-empty {
          border: 1px dashed var(--g-4);
          padding: 16px;
          font-family: var(--f-mono);
          font-size: 10px;
          color: var(--g-3);
          letter-spacing: 0.08em;
          text-align: center;
        }
        .insp-btn-secondary {
          font-family: var(--f-mono);
          font-size: 10px;
          letter-spacing: 0.1em;
          color: var(--ink);
          background: transparent;
          border: 1px solid var(--ink);
          padding: 10px 14px;
          cursor: pointer;
          text-transform: uppercase;
          align-self: flex-start;
          transition: all var(--t-fast) var(--ease);
        }
        .insp-btn-secondary:hover {
          background: var(--ink);
          color: var(--ink-inv);
        }

        @media (max-width: 760px) {
          .sst-2col { grid-template-columns: 1fr; gap: 28px; }
          .insp-acept { grid-template-columns: 1fr; }
          .insp-table-head { display: none; }
          .insp-row {
            grid-template-columns: 1fr;
            gap: 8px;
            padding: 16px 0;
          }
          .insp-row-num {
            font-size: 9px;
            color: var(--g-3);
          }
          .insp-row-criterio {
            font-weight: 500;
          }
          .insp-row-radios { gap: 8px; }
        }
      `}</style>
    </div>
  );
}
