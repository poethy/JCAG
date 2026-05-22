"use client";

import { useEffect, useMemo, useState } from "react";
import {
  listRegistros,
  deleteRegistro,
  type InspeccionRegistro,
} from "@/lib/inspeccionStore";
import { downloadInspeccionPdf } from "@/lib/inspeccionPdf";

const formatCreated = (iso: string) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString("es-CO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const countResp = (items: { respuesta: "C" | "NC" }[], val: "C" | "NC") =>
  items.filter((it) => it.respuesta === val).length;

export default function RegistrosPage() {
  const [registros, setRegistros] = useState<InspeccionRegistro[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setRegistros(listRegistros());
    setHydrated(true);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return registros;
    return registros.filter(
      (r) =>
        r.proyecto.toLowerCase().includes(q) ||
        r.inspector_responsable.toLowerCase().includes(q) ||
        r.ref.toLowerCase().includes(q) ||
        r.fecha_inspeccion.toLowerCase().includes(q)
    );
  }, [registros, query]);

  const selected = selectedId
    ? registros.find((r) => r.id === selectedId) || null
    : null;

  const handleDelete = (id: string) => {
    if (!confirm("¿Eliminar este registro? Esta acción no se puede deshacer.")) return;
    deleteRegistro(id);
    setRegistros(listRegistros());
    if (selectedId === id) setSelectedId(null);
  };

  const handleDownload = (registro: InspeccionRegistro) => {
    try {
      downloadInspeccionPdf(registro);
    } catch (e) {
      console.error(e);
      alert("No se pudo generar el PDF.");
    }
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
          href="/sst"
          style={{
            fontFamily: "var(--f-mono)",
            fontSize: 11,
            color: "var(--ink)",
            letterSpacing: "0.06em",
            textDecoration: "none",
          }}
        >
          ← NUEVO REGISTRO
        </a>
        <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
          INS-REGISTROS · REV. 2026-Q2
        </span>
      </nav>

      <div style={{ flex: 1, maxWidth: 1100, width: "100%", margin: "0 auto", padding: "56px var(--pad-x) 80px" }}>
        <div style={{ marginBottom: 32 }}>
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
              INSPECCIONES PRE-OPERACIONALES · BASE LOCAL
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
            Registros <em style={{ fontWeight: 300, fontStyle: "italic" }}>guardados</em>.
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--g-2)", maxWidth: 520 }}>
            Lista completa de inspecciones pre-operacionales almacenadas en este dispositivo
            (localStorage). Puedes ver el detalle, descargar el PDF o eliminarlas.
          </p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por proyecto, inspector, ref o fecha…"
            style={{
              width: "100%",
              fontFamily: "var(--f-ui)",
              fontSize: 14,
              color: "var(--ink)",
              border: "1px solid var(--g-4)",
              outline: 0,
              background: "var(--bg)",
              padding: "12px 14px",
            }}
          />
        </div>

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
              {hydrated ? `${filtered.length} REGISTRO${filtered.length === 1 ? "" : "S"}` : "CARGANDO…"}
            </span>
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--g-3)", letterSpacing: "0.06em" }}>
              ALMACENAMIENTO LOCAL
            </span>
          </div>

          {!hydrated ? (
            <div style={{ padding: 40, fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--g-3)" }}>
              CARGANDO…
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                padding: 64,
                textAlign: "center",
                fontFamily: "var(--f-mono)",
                fontSize: 11,
                color: "var(--g-3)",
                letterSpacing: "0.08em",
              }}
            >
              {registros.length === 0 ? (
                <>
                  No hay inspecciones registradas.
                  <br />
                  <a
                    href="/sst"
                    style={{
                      display: "inline-block",
                      marginTop: 16,
                      color: "var(--ink)",
                      textDecoration: "underline",
                    }}
                  >
                    Crear nueva inspección →
                  </a>
                </>
              ) : (
                "Sin resultados para tu búsqueda."
              )}
            </div>
          ) : (
            <div className="reg-table">
              <div className="reg-row reg-head">
                <div>Ref</div>
                <div>Proyecto</div>
                <div>Fecha</div>
                <div>Inspector</div>
                <div>Resp.</div>
                <div>Creado</div>
                <div></div>
              </div>
              {filtered.map((r) => {
                const total = r.inspeccion.length + r.personal.length;
                const c = countResp(r.inspeccion, "C") + countResp(r.personal, "C");
                const nc = countResp(r.inspeccion, "NC") + countResp(r.personal, "NC");
                return (
                  <div className="reg-row" key={r.id}>
                    <div className="reg-mono">{r.ref}</div>
                    <div>{r.proyecto}</div>
                    <div className="reg-mono">{r.fecha_inspeccion}</div>
                    <div>{r.inspector_responsable}</div>
                    <div className="reg-mono">
                      <span className="reg-badge reg-c">{c}C</span>
                      <span className="reg-badge reg-nc">{nc}NC</span>
                      <span className="reg-badge reg-total">/{total}</span>
                    </div>
                    <div className="reg-mono reg-mut">{formatCreated(r.created_at)}</div>
                    <div className="reg-actions">
                      <button
                        type="button"
                        onClick={() => setSelectedId(r.id)}
                        className="reg-btn"
                        title="Ver detalle"
                      >
                        VER
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownload(r)}
                        className="reg-btn reg-btn-primary"
                        title="Descargar PDF"
                      >
                        PDF
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(r.id)}
                        className="reg-btn reg-btn-danger"
                        title="Eliminar"
                      >
                        ELIMINAR
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
          REGISTROS LOCALES
        </span>
      </footer>

      {selected && (
        <DetalleModal
          registro={selected}
          onClose={() => setSelectedId(null)}
          onDownload={() => handleDownload(selected)}
          onDelete={() => handleDelete(selected.id)}
        />
      )}

      <style>{`
        .reg-table { display: flex; flex-direction: column; }
        .reg-row {
          display: grid;
          grid-template-columns: 90px minmax(0, 1.6fr) 110px minmax(0, 1.2fr) 130px 140px auto;
          gap: 16px;
          padding: 14px 24px;
          align-items: center;
          border-bottom: 1px solid var(--g-5);
          font-family: var(--f-ui);
          font-size: 13px;
          color: var(--ink);
        }
        .reg-row.reg-head {
          background: var(--bg-soft);
          font-family: var(--f-mono);
          font-size: 9px;
          color: var(--g-3);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .reg-mono { font-family: var(--f-mono); font-size: 11px; letter-spacing: 0.04em; }
        .reg-mut { color: var(--g-3); }
        .reg-badge {
          display: inline-block;
          padding: 2px 6px;
          margin-right: 4px;
          font-family: var(--f-mono);
          font-size: 10px;
          letter-spacing: 0.06em;
          border: 1px solid var(--g-5);
        }
        .reg-badge.reg-c { color: var(--ink); border-color: var(--ink); }
        .reg-badge.reg-nc { color: #b3261e; border-color: #b3261e; }
        .reg-badge.reg-total { color: var(--g-3); border: none; padding-left: 0; }
        .reg-actions { display: flex; gap: 6px; justify-content: flex-end; }
        .reg-btn {
          font-family: var(--f-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          padding: 6px 10px;
          border: 1px solid var(--g-4);
          background: transparent;
          color: var(--ink);
          cursor: pointer;
          text-transform: uppercase;
          transition: all var(--t-fast) var(--ease);
        }
        .reg-btn:hover { border-color: var(--ink); }
        .reg-btn-primary {
          background: var(--ink);
          color: var(--ink-inv);
          border-color: var(--ink);
        }
        .reg-btn-primary:hover { opacity: 0.85; }
        .reg-btn-danger { color: #b3261e; border-color: rgba(179,38,30,0.4); }
        .reg-btn-danger:hover { border-color: #b3261e; background: rgba(179,38,30,0.06); }

        @media (max-width: 900px) {
          .reg-row {
            grid-template-columns: 1fr;
            gap: 6px;
            padding: 16px 20px;
          }
          .reg-row.reg-head { display: none; }
          .reg-row > div::before {
            content: attr(data-label);
            display: block;
            font-family: var(--f-mono);
            font-size: 9px;
            color: var(--g-3);
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-bottom: 2px;
          }
          .reg-actions { margin-top: 8px; justify-content: flex-start; }
        }
      `}</style>
    </div>
  );
}

function DetalleModal({
  registro,
  onClose,
  onDownload,
  onDelete,
}: {
  registro: InspeccionRegistro;
  onClose: () => void;
  onDownload: () => void;
  onDelete: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const renderItems = (items: InspeccionRegistro["inspeccion"]) => (
    <div className="det-list">
      {items.map((it, i) => (
        <div key={i} className="det-item">
          <span className="det-num">{String(i + 1).padStart(2, "0")}</span>
          <span className="det-criterio">{it.criterio}</span>
          <span
            className={`det-resp ${it.respuesta === "C" ? "det-resp-c" : "det-resp-nc"}`}
          >
            {it.respuesta}
          </span>
          <span className="det-obs">{it.observaciones || "—"}</span>
        </div>
      ))}
    </div>
  );

  const ace = registro.aceptacion[0];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(20, 20, 15, 0.55)",
        backdropFilter: "blur(2px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        overflowY: "auto",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        style={{
          background: "var(--bg)",
          border: "1px solid var(--ink)",
          width: "100%",
          maxWidth: 880,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            padding: "14px 24px",
            borderBottom: "1px solid var(--ink)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            background: "var(--bg)",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              letterSpacing: "0.06em",
              fontWeight: 600,
              color: "var(--ink)",
              textTransform: "uppercase",
            }}
          >
            DETALLE · {registro.ref}
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              color: "var(--g-3)",
              background: "transparent",
              border: 0,
              cursor: "pointer",
              letterSpacing: "0.08em",
            }}
          >
            CERRAR ✕
          </button>
        </div>

        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
          <section>
            <div className="det-section-title">Datos generales</div>
            <div className="det-grid">
              <div><strong>Proyecto</strong><span>{registro.proyecto}</span></div>
              <div><strong>Fecha</strong><span>{registro.fecha_inspeccion}</span></div>
              <div><strong>Inspector</strong><span>{registro.inspector_responsable}</span></div>
              <div><strong>Creado</strong><span>{formatCreated(registro.created_at)}</span></div>
            </div>
          </section>

          <section>
            <div className="det-section-title">Inspección del equipo ({registro.inspeccion.length})</div>
            {renderItems(registro.inspeccion)}
          </section>

          <section>
            <div className="det-section-title">Personal ({registro.personal.length})</div>
            {renderItems(registro.personal)}
          </section>

          <section>
            <div className="det-section-title">Aceptación</div>
            <div className="det-acept">
              {[
                { title: "Operador", persona: ace.operador },
                { title: "Elaborado por", persona: ace.elaborado_por },
              ].map((b) => (
                <div key={b.title} className="det-acept-card">
                  <div className="det-acept-title">{b.title}</div>
                  <div className="det-acept-row"><strong>Nombre</strong><span>{b.persona.nombre || "—"}</span></div>
                  <div className="det-firma">
                    {b.persona.firma ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.persona.firma} alt={`Firma ${b.title}`} />
                    ) : (
                      <span className="det-firma-empty">Sin firma</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--ink)",
            padding: "14px 24px",
            display: "flex",
            gap: 8,
            justifyContent: "flex-end",
            position: "sticky",
            bottom: 0,
            background: "var(--bg)",
          }}
        >
          <button type="button" onClick={onDelete} className="reg-btn reg-btn-danger">
            ELIMINAR
          </button>
          <button type="button" onClick={onDownload} className="reg-btn reg-btn-primary">
            ↓ DESCARGAR PDF
          </button>
        </div>
      </div>

      <style>{`
        .det-section-title {
          font-family: var(--f-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          color: var(--ink);
          text-transform: uppercase;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--ink);
          margin-bottom: 12px;
        }
        .det-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 24px;
        }
        .det-grid > div {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .det-grid strong {
          font-family: var(--f-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
          color: var(--g-3);
          text-transform: uppercase;
          font-weight: 500;
        }
        .det-grid span {
          font-family: var(--f-ui);
          font-size: 14px;
          color: var(--ink);
        }
        .det-list { display: flex; flex-direction: column; }
        .det-item {
          display: grid;
          grid-template-columns: 32px minmax(0, 1.6fr) 50px minmax(0, 1.2fr);
          gap: 12px;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid var(--g-5);
          font-family: var(--f-ui);
          font-size: 13px;
          color: var(--ink);
        }
        .det-num { font-family: var(--f-mono); font-size: 10px; color: var(--g-3); }
        .det-resp {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 4px 8px;
          font-family: var(--f-mono);
          font-size: 10px;
          letter-spacing: 0.08em;
          font-weight: 600;
          color: #fff;
        }
        .det-resp-c { background: var(--ink); }
        .det-resp-nc { background: #b3261e; }
        .det-obs { color: var(--g-2); font-size: 12px; }

        .det-acept { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .det-acept-card {
          border: 1px solid var(--g-5);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .det-acept-title {
          font-family: var(--f-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          color: var(--ink);
          text-transform: uppercase;
          padding-bottom: 6px;
          border-bottom: 1px solid var(--ink);
        }
        .det-acept-row {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .det-acept-row strong {
          font-family: var(--f-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
          color: var(--g-3);
          text-transform: uppercase;
          font-weight: 500;
        }
        .det-acept-row span {
          font-family: var(--f-ui);
          font-size: 14px;
          color: var(--ink);
        }
        .det-firma {
          border: 1px solid var(--g-5);
          padding: 8px;
          background: var(--bg-soft);
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .det-firma img { max-width: 100%; max-height: 100px; display: block; }
        .det-firma-empty {
          font-family: var(--f-mono);
          font-size: 10px;
          color: var(--g-3);
          letter-spacing: 0.08em;
        }

        @media (max-width: 700px) {
          .det-grid { grid-template-columns: 1fr; }
          .det-acept { grid-template-columns: 1fr; }
          .det-item { grid-template-columns: 28px minmax(0, 1.4fr) 50px; }
          .det-item .det-obs { grid-column: 2 / -1; padding-left: 0; }
        }
      `}</style>
    </div>
  );
}
