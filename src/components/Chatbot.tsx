"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hola, soy el asistente de JCAG S.A.S. ¿En qué puedo ayudarte? Puedo orientarte sobre nuestros servicios eléctricos o información de empleo.",
};

const CV_UPLOAD_TRIGGER = "[MOSTRAR_CARGA_CV]";

// Keywords that signal the user wants to submit their CV — client-side fallback
const CV_INTENT_KEYWORDS = [
  "hoja de vida", "curriculum", "currículum", " cv ", "cv,", "cv.", "enviar mi cv",
  "mandar mi cv", "subir mi cv", "quiero aplicar", "quiero trabajar", "busco trabajo",
  "aplicar a", "postularme", "postular", "enviar mi hoja", "mandar mi hoja",
];

export default function Chatbot() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);

  // CV upload state
  const [showCVUpload, setShowCVUpload] = useState(false);
  const [cvDragging, setCvDragging]     = useState(false);
  const [cvStatus, setCvStatus]         = useState<"idle" | "uploading">("idle");

  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    // Client-side CV intent detection (fallback if LLM misses the token)
    const lc = text.toLowerCase();
    const userHasCVIntent = !showCVUpload &&
      CV_INTENT_KEYWORDS.some((kw) => lc.includes(kw));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      const raw: string = data.message || "Lo siento, hubo un error. Contáctenos al 604 479 67 87.";

      // Detect and strip the upload trigger token
      const llmTriggered = raw.includes(CV_UPLOAD_TRIGGER);
      const clean = raw.replace(CV_UPLOAD_TRIGGER, "").trim();

      setMessages([...updated, { role: "assistant", content: clean }]);

      // Show upload zone if LLM triggered it OR client-side intent matched
      if (llmTriggered || userHasCVIntent) setShowCVUpload(true);
    } catch {
      setMessages([...updated, { role: "assistant", content: "Error de conexión. Por favor contáctenos al 604 479 67 87." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ── CV upload ──────────────────────────────────────────────────── */
  const handleCV = async (file: File) => {
    if (cvStatus === "uploading") return;
    if (!file.type.includes("pdf")) {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Solo acepto archivos en formato PDF. Por favor intenta con otro archivo.",
      }]);
      setShowCVUpload(false);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "El archivo supera el límite de 5 MB. Por favor comprime el PDF e intenta de nuevo.",
      }]);
      return;
    }

    setCvStatus("uploading");

    const fd = new FormData();
    fd.append("cv", file);

    try {
      const res  = await fetch("/api/cv-screen", { method: "POST", body: fd });
      const data = await res.json();

      setShowCVUpload(false);
      setCvStatus("idle");

      if (data.result === "success") {
        setMessages((prev) => [...prev, {
          role: "assistant",
          content: "¡Tu perfil encaja muy bien con lo que buscamos! Hemos recibido tu hoja de vida. Nuestro equipo de RRHH la revisará y se pondrá en contacto contigo pronto. ¡Gracias por tu interés en JCAG!",
        }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, {
          role: "assistant",
          content: `No pudimos procesar tu CV: ${data.error}. También puedes enviarlo directamente a administracion@jcagsas.com.co`,
        }]);
      } else {
        setMessages((prev) => [...prev, {
          role: "assistant",
          content: "Gracias por tu interés en JCAG. En este momento estamos buscando perfiles con un enfoque diferente, pero guardamos tu información para futuras oportunidades. ¡Mucho éxito!",
        }]);
      }
    } catch {
      setCvStatus("idle");
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: "Hubo un problema al procesar tu hoja de vida. Por favor intenta de nuevo o envíala a administracion@jcagsas.com.co",
      }]);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setCvDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleCV(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleCV(file);
  };

  /* ── Render ─────────────────────────────────────────────────────── */
  return (
    <>
      <div style={{
        position: "fixed", bottom: 28, right: 28,
        zIndex: 50, display: "flex", flexDirection: "column",
        alignItems: "flex-end", gap: 12,
      }}>

        {/* Chat window */}
        {open && (
          <div className="chatbot-window">

            {/* Header */}
            <div style={{
              background: "var(--bg-inv)",
              padding: "14px 20px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em", fontWeight: 600, color: "var(--ink-inv)" }}>
                  ASISTENTE JCAG
                </span>
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.08em", color: "rgba(244,243,238,0.5)" }}>
                  ● EN LÍNEA · IA
                </span>
              </div>
              <button onClick={() => setOpen(false)} className="chatbot-close" aria-label="Cerrar chat">×</button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "chatbot-bubble-user" : "chatbot-bubble-assistant"}>
                  {m.content}
                </div>
              ))}

              {/* CV Upload zone */}
              {showCVUpload && (
                <div
                  className={`cv-dropzone${cvDragging ? " cv-dropzone--over" : ""}`}
                  onDragOver={(e) => { e.preventDefault(); setCvDragging(true); }}
                  onDragLeave={() => setCvDragging(false)}
                  onDrop={onDrop}
                  onClick={() => cvStatus === "idle" && fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    style={{ display: "none" }}
                    onChange={onFileChange}
                  />
                  {cvStatus === "uploading" ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                      <span style={{ fontFamily: "var(--f-mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--g-3)" }}>
                        ANALIZANDO PERFIL
                      </span>
                      <div style={{ display: "flex", gap: 5 }}>
                        <span className="chatbot-dot" />
                        <span className="chatbot-dot" />
                        <span className="chatbot-dot" />
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Top label */}
                      <div style={{
                        fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.1em",
                        color: "var(--g-3)", marginBottom: 12,
                      }}>
                        § CV · ADJUNTAR HOJA DE VIDA
                      </div>

                      {/* Arrow icon */}
                      <div style={{
                        width: 40, height: 40,
                        border: "1px solid var(--ink)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: 12,
                        transition: "background var(--t-base) var(--ease)",
                      }} className="cv-icon-box">
                        <span style={{ fontSize: 18, lineHeight: 1, color: "var(--ink)" }}>↑</span>
                      </div>

                      {/* Main label */}
                      <span style={{
                        fontFamily: "var(--f-mono)", fontSize: 11, letterSpacing: "0.08em",
                        fontWeight: 600, color: "var(--ink)", textTransform: "uppercase",
                        marginBottom: 6,
                      }}>
                        Arrastra tu CV aquí
                      </span>

                      {/* Sub label */}
                      <span style={{
                        fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.06em",
                        color: "var(--g-3)", textAlign: "center",
                      }}>
                        o haz clic para seleccionar
                      </span>
                      <span style={{
                        fontFamily: "var(--f-mono)", fontSize: 9, letterSpacing: "0.06em",
                        color: "var(--g-4)", marginTop: 2,
                      }}>
                        PDF · MÁX. 5 MB
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Loading dots */}
              {loading && (
                <div className="chatbot-bubble-assistant chatbot-loading">
                  <span className="chatbot-dot" />
                  <span className="chatbot-dot" />
                  <span className="chatbot-dot" />
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
              borderTop: "1px solid var(--g-5)", padding: "12px 20px",
              display: "flex", gap: 12, alignItems: "center", flexShrink: 0,
            }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Escribe tu mensaje…"
                disabled={loading}
                className="chatbot-input"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="chatbot-send"
                aria-label="Enviar"
              >
                ↑
              </button>
            </div>

          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setOpen(!open)}
          className="chatbot-toggle"
          aria-label={open ? "Cerrar chat" : "Abrir chat"}
        >
          {open ? "CERRAR ×" : "CHAT ↗"}
        </button>

      </div>

      <style>{`
        .chatbot-window {
          width: 360px;
          border: 1px solid var(--ink);
          background: var(--bg);
          display: flex;
          flex-direction: column;
          max-height: 520px;
        }
        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-height: 320px;
        }
        .chatbot-messages::-webkit-scrollbar { width: 3px; }
        .chatbot-messages::-webkit-scrollbar-track { background: transparent; }
        .chatbot-messages::-webkit-scrollbar-thumb { background: var(--g-4); }
        .chatbot-bubble-assistant {
          border: 1px solid var(--g-5);
          padding: 10px 14px;
          font-size: 14px;
          line-height: 1.55;
          color: var(--ink);
          max-width: 88%;
          align-self: flex-start;
        }
        .chatbot-bubble-user {
          background: var(--ink);
          color: var(--ink-inv);
          padding: 10px 14px;
          font-size: 14px;
          line-height: 1.55;
          max-width: 88%;
          align-self: flex-end;
        }
        .chatbot-loading {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 14px;
        }
        .chatbot-dot {
          width: 5px;
          height: 5px;
          background: var(--g-3);
          display: inline-block;
          animation: chatblink 1.4s infinite;
        }
        .chatbot-dot:nth-child(2) { animation-delay: 0.2s; }
        .chatbot-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes chatblink {
          0%, 80%, 100% { opacity: 0.15; }
          40% { opacity: 1; }
        }
        .chatbot-input {
          flex: 1;
          font-family: var(--f-ui);
          font-size: 14px;
          color: var(--ink);
          background: transparent;
          border: 0;
          border-bottom: 1px solid var(--ink);
          padding: 6px 0;
          outline: 0;
        }
        .chatbot-input::placeholder { color: var(--g-4); }
        .chatbot-input:disabled { opacity: 0.5; }
        .chatbot-send {
          width: 36px;
          height: 36px;
          background: var(--ink);
          color: var(--ink-inv);
          font-family: var(--f-mono);
          font-size: 14px;
          border: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity var(--t-fast) var(--ease);
        }
        .chatbot-send:disabled { opacity: 0.25; cursor: not-allowed; }
        .chatbot-send:not(:disabled):hover { opacity: 0.8; }
        .chatbot-close {
          background: transparent;
          border: 0;
          color: rgba(244,243,238,0.5);
          font-size: 20px;
          cursor: pointer;
          line-height: 1;
          padding: 0;
          transition: color var(--t-fast) var(--ease);
        }
        .chatbot-close:hover { color: var(--ink-inv); }
        .chatbot-toggle {
          height: 44px;
          padding: 0 20px;
          background: var(--ink);
          color: var(--ink-inv);
          font-family: var(--f-mono);
          font-size: 11px;
          letter-spacing: 0.1em;
          border: 0;
          cursor: pointer;
          transition: opacity var(--t-fast) var(--ease);
        }
        .chatbot-toggle:hover { opacity: 0.85; }

        /* CV upload zone */
        .cv-dropzone {
          align-self: flex-start;
          width: 88%;
          padding: 20px 16px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 1px dashed var(--g-3);
          background: var(--bg);
          transition: border-color var(--t-base) var(--ease), background var(--t-base) var(--ease);
        }
        .cv-dropzone:hover,
        .cv-dropzone--over {
          border-color: var(--ink);
          border-style: solid;
          background: rgba(26,26,24,0.03);
        }
        .cv-dropzone:hover .cv-icon-box,
        .cv-dropzone--over .cv-icon-box {
          background: var(--ink);
          color: var(--ink-inv);
        }
        .cv-dropzone:hover .cv-icon-box span,
        .cv-dropzone--over .cv-icon-box span {
          color: var(--ink-inv);
        }

        @media (max-width: 480px) {
          .chatbot-window { width: calc(100vw - 56px); }
        }
      `}</style>
    </>
  );
}
