"use client";

import { useRef, useEffect, useCallback, useLayoutEffect } from "react";

interface Props {
  onChange: (dataUrl: string | null) => void;
  initialValue?: string | null;
}

export default function SignatureCanvas({ onChange, initialValue }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const hasStroke = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const getPos = (e: MouseEvent | Touch, rect: DOMRect) => ({
    x: (e.clientX - rect.left) * (canvasRef.current!.width / rect.width),
    y: (e.clientY - rect.top) * (canvasRef.current!.height / rect.height),
  });

  const startDraw = useCallback((x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    drawing.current = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, []);

  const draw = useCallback((x: number, y: number) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    hasStroke.current = true;
    ctx.lineTo(x, y);
    ctx.stroke();
  }, []);

  const endDraw = useCallback(() => {
    drawing.current = false;
    if (hasStroke.current && canvasRef.current) {
      onChangeRef.current(canvasRef.current.toDataURL("image/png"));
    }
  }, []);

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(0,0,0,0.07)";
    ctx.lineWidth = 0.5;
    const step = 20;
    for (let x = 0; x <= canvas.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawGrid();
    ctx.strokeStyle = "#1a1a18";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (initialValue) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        hasStroke.current = true;
      };
      img.src = initialValue;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#1a1a18";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const onMouseDown = (e: MouseEvent) => {
      const pos = getPos(e, canvas.getBoundingClientRect());
      startDraw(pos.x, pos.y);
    };
    const onMouseMove = (e: MouseEvent) => {
      const pos = getPos(e, canvas.getBoundingClientRect());
      draw(pos.x, pos.y);
    };
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const pos = getPos(e.touches[0], canvas.getBoundingClientRect());
      startDraw(pos.x, pos.y);
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const pos = getPos(e.touches[0], canvas.getBoundingClientRect());
      draw(pos.x, pos.y);
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", endDraw);
    canvas.addEventListener("mouseleave", endDraw);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchend", endDraw);

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", endDraw);
      canvas.removeEventListener("mouseleave", endDraw);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", endDraw);
    };
  }, [startDraw, draw, endDraw]);

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    drawGrid();
    ctx.strokeStyle = "#1a1a18";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    hasStroke.current = false;
    onChange(null);
  };

  return (
    <div>
      <div style={{
        border: "1px solid var(--ink)",
        overflow: "hidden",
        background: "var(--bg)",
        touchAction: "none",
      }}>
        <canvas
          ref={canvasRef}
          width={600}
          height={160}
          style={{ width: "100%", cursor: "crosshair", display: "block", touchAction: "none" }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
        <span style={{ fontFamily: "var(--f-mono)", fontSize: 9, color: "var(--g-3)", letterSpacing: "0.06em" }}>
          FIRMA CON EL DEDO O EL MOUSE
        </span>
        <button
          type="button"
          onClick={clear}
          style={{
            fontFamily: "var(--f-mono)",
            fontSize: 9,
            letterSpacing: "0.08em",
            color: "var(--g-3)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
            textTransform: "uppercase",
          }}
        >
          LIMPIAR →
        </button>
      </div>
    </div>
  );
}
