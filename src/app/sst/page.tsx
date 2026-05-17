"use client";

import { useState } from "react";
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

  if (status === "success") {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 max-w-md w-full text-center">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">¡Registro exitoso!</h2>
          <p className="text-slate-500 text-sm mb-6">
            El formulario <strong>{form.tipoFormulario}</strong> fue registrado correctamente para <strong>{form.nombre}</strong>.
          </p>
          <button
            onClick={() => {
              setStatus("idle");
              setForm({ nombre: "", cedula: "", cargo: "", empresa: "", tipoFormulario: "" });
              setFirma(null);
            }}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
          >
            Registrar otro formulario
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="text-sky-700 hover:text-sky-900 text-sm font-medium flex items-center gap-1.5 mb-5 cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </a>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-sky-700 font-semibold uppercase tracking-widest">JCAG S.A.S</p>
              <h1 className="text-2xl font-black text-slate-900">Registro SST Digital</h1>
            </div>
          </div>
          <p className="text-slate-500 text-sm">
            Diligencia el formulario y firma electrónicamente. El documento se guardará automáticamente en Drive.
          </p>
        </div>

        {/* Form card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 space-y-5">

            {/* Tipo de formulario */}
            <div>
              <label htmlFor="tipo" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Tipo de formulario <span className="text-red-500">*</span>
              </label>
              <select
                id="tipo"
                required
                value={form.tipoFormulario}
                onChange={(e) => set("tipoFormulario", e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white cursor-pointer"
              >
                <option value="">Selecciona un tipo...</option>
                {FORM_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Nombre */}
              <div className="sm:col-span-2">
                <label htmlFor="nombre" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <input
                  id="nombre"
                  type="text"
                  required
                  value={form.nombre}
                  onChange={(e) => set("nombre", e.target.value)}
                  placeholder="Ej. Juan Carlos Pérez"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Cédula */}
              <div>
                <label htmlFor="cedula" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Número de cédula <span className="text-red-500">*</span>
                </label>
                <input
                  id="cedula"
                  type="text"
                  required
                  inputMode="numeric"
                  value={form.cedula}
                  onChange={(e) => set("cedula", e.target.value.replace(/\D/g, ""))}
                  placeholder="Ej. 1088827353"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Cargo */}
              <div>
                <label htmlFor="cargo" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Cargo / Rol <span className="text-red-500">*</span>
                </label>
                <input
                  id="cargo"
                  type="text"
                  required
                  value={form.cargo}
                  onChange={(e) => set("cargo", e.target.value)}
                  placeholder="Ej. Técnico Electricista"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Empresa */}
              <div className="sm:col-span-2">
                <label htmlFor="empresa" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Empresa / Contratista <span className="text-slate-400 font-normal">(opcional)</span>
                </label>
                <input
                  id="empresa"
                  type="text"
                  value={form.empresa}
                  onChange={(e) => set("empresa", e.target.value)}
                  placeholder="Ej. JCAG S.A.S"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Firma */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Firma electrónica <span className="text-red-500">*</span>
              </label>
              <SignatureCanvas onChange={setFirma} />
              {!firma && status !== "idle" && (
                <p className="text-red-500 text-xs mt-1">Por favor añade tu firma.</p>
              )}
            </div>

            {/* Fecha automática */}
            <div className="bg-slate-50 rounded-lg px-4 py-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-slate-500">
                Fecha de registro: <span className="font-semibold text-slate-700">{new Date().toLocaleDateString("es-CO", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
              </p>
            </div>

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <p className="text-red-600 text-sm">{errorMsg}</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 sm:px-8 py-5 bg-slate-50 border-t border-slate-200">
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors text-sm cursor-pointer flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Guardando en Drive...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Enviar y guardar en Drive
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-400 mt-3">
              El documento se guardará automáticamente en Google Drive de JCAG
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
