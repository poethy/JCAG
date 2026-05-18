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

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages([...updated, { role: "assistant", content: data.message || "Lo siento, hubo un error. Contáctenos al 604 479 67 87." }]);
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

  return (
    <>
      <div style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 12,
      }}>

        {/* Chat window */}
        {open && (
          <div className="chatbot-window">

            {/* Header */}
            <div style={{
              background: "var(--bg-inv)",
              padding: "14px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
            }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  fontWeight: 600,
                  color: "var(--ink-inv)",
                }}>
                  ASISTENTE JCAG
                </span>
                <span style={{
                  fontFamily: "var(--f-mono)",
                  fontSize: 9,
                  letterSpacing: "0.08em",
                  color: "rgba(244,243,238,0.5)",
                }}>
                  ● EN LÍNEA · IA
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="chatbot-close"
                aria-label="Cerrar chat"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={m.role === "user" ? "chatbot-bubble-user" : "chatbot-bubble-assistant"}
                >
                  {m.content}
                </div>
              ))}

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
              borderTop: "1px solid var(--g-5)",
              padding: "12px 20px",
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexShrink: 0,
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
        @media (max-width: 480px) {
          .chatbot-window { width: calc(100vw - 56px); }
        }
      `}</style>
    </>
  );
}
