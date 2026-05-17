"use client";

import { useRef, useEffect, useCallback } from "react";

interface Props {
  onChange: (dataUrl: string | null) => void;
}

export default function SignatureCanvas({ onChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const hasStroke = useRef(false);

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
      onChange(canvasRef.current.toDataURL("image/png"));
    }
  }, [onChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#0f172a";
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasStroke.current = false;
    onChange(null);
  };

  return (
    <div>
      <div className="border-2 border-dashed border-slate-300 rounded-xl overflow-hidden bg-white touch-none">
        <canvas
          ref={canvasRef}
          width={600}
          height={160}
          className="w-full cursor-crosshair"
          style={{ touchAction: "none" }}
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-slate-400">Firma con el dedo o el mouse</p>
        <button
          type="button"
          onClick={clear}
          className="text-xs text-slate-500 hover:text-red-600 font-medium transition-colors cursor-pointer"
        >
          Limpiar firma
        </button>
      </div>
    </div>
  );
}
