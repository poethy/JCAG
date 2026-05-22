"use client";

import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "./SignatureCanvas";

interface Props {
  open: boolean;
  title: string;
  storageKey: string;
  initialValue?: string | null;
  onClose: () => void;
  onConfirm: (dataUrl: string) => void;
}

export default function SignatureModal({
  open,
  title,
  storageKey,
  initialValue,
  onClose,
  onConfirm,
}: Props) {
  const [draft, setDraft] = useState<string | null>(null);
  const [seedValue, setSeedValue] = useState<string | null>(null);
  const [canvasKey, setCanvasKey] = useState(0);
  const [error, setError] = useState<string>("");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    setError("");
    let stored: string | null = null;
    if (typeof window !== "undefined") {
      stored = localStorage.getItem(storageKey);
    }
    const seed = initialValue || stored || null;
    setSeedValue(seed);
    setDraft(seed);
    setCanvasKey((k) => k + 1);
  }, [open, storageKey, initialValue]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSave = () => {
    if (!draft) {
      setError("Dibuja la firma antes de guardar.");
      return;
    }
    try {
      localStorage.setItem(storageKey, draft);
    } catch {
      // localStorage may be unavailable (private mode, quota); continue anyway
    }
    onConfirm(draft);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
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
      }}
    >
      <div
        style={{
          background: "var(--bg)",
          border: "1px solid var(--ink)",
          width: "100%",
          maxWidth: 640,
          display: "flex",
          flexDirection: "column",
        }}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
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
              textTransform: "uppercase",
            }}
          >
            {title}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              color: "var(--g-3)",
              background: "transparent",
              border: 0,
              cursor: "pointer",
              padding: 0,
              letterSpacing: "0.08em",
            }}
          >
            CERRAR ✕
          </button>
        </div>

        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          <SignatureCanvas
            key={canvasKey}
            onChange={setDraft}
            initialValue={seedValue}
          />
          {error && (
            <span
              style={{
                fontFamily: "var(--f-mono)",
                fontSize: 10,
                color: "var(--ink)",
                letterSpacing: "0.06em",
              }}
            >
              ↳ {error}
            </span>
          )}
        </div>

        <div
          style={{
            borderTop: "1px solid var(--ink)",
            padding: "14px 24px",
            display: "flex",
            gap: 12,
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "var(--g-2)",
              background: "transparent",
              border: "1px solid var(--g-4)",
              padding: "10px 18px",
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={{
              fontFamily: "var(--f-mono)",
              fontSize: 11,
              letterSpacing: "0.08em",
              color: "var(--ink-inv)",
              background: "var(--ink)",
              border: "1px solid var(--ink)",
              padding: "10px 18px",
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            Guardar firma →
          </button>
        </div>
      </div>
    </div>
  );
}
