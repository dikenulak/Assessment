"use client";

import { useEffect, useRef } from "react";

interface AnimatedBorderProps {
  active?: boolean;
}

export function AnimatedBorder({ active = true }: AnimatedBorderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let angle = 0;
    const speed = 0.01; // radians per frame

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const w = rect.width;
      const h = rect.height;
      const r = 32; // border-radius
      const lineW = 5;

      ctx.clearRect(0, 0, w, h);

      // Build rounded rect path
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(w - r, 0);
      ctx.arcTo(w, 0, w, r, r);
      ctx.lineTo(w, h - r);
      ctx.arcTo(w, h, w - r, h, r);
      ctx.lineTo(r, h);
      ctx.arcTo(0, h, 0, h - r, r);
      ctx.lineTo(0, r);
      ctx.arcTo(0, 0, r, 0, r);
      ctx.closePath();

      // Create rotating conic gradient centered on the box
      const cx = w / 2;
      const cy = h / 2;
      const gradient = ctx.createConicGradient(angle, cx, cy);

      // Orange flowing highlight with transparent gaps
      gradient.addColorStop(0, "#fc791200");
      gradient.addColorStop(0.05, "#fc7912");
      gradient.addColorStop(0.15, "#ff9a44");
      gradient.addColorStop(0.25, "#fc7912");
      gradient.addColorStop(0.35, "#fc791200");
      gradient.addColorStop(0.5, "#fc791220");
      gradient.addColorStop(0.55, "#fc791200");
      gradient.addColorStop(0.6, "#d31db8");
      gradient.addColorStop(0.7, "#fc7912");
      gradient.addColorStop(0.8, "#fc791200");
      gradient.addColorStop(0.9, "#fc791220");
      gradient.addColorStop(1, "#fc791200");

      ctx.strokeStyle = gradient;
      ctx.lineWidth = lineW;
      ctx.stroke();

      // Draw a softer glow pass
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 8;
      ctx.filter = "blur(8px)";
      ctx.stroke();
      ctx.filter = "none";
      ctx.globalAlpha = 1;

      ctx.shadowOffsetX = 9;
      ctx.shadowOffsetY = 9;
      ctx.shadowBlur = 9;
      ctx.shadowColor = "#fc7912";

      angle += speed;
      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none rounded-4xl z-20 transition-opacity duration-300"
      style={{ mixBlendMode: "screen", opacity: active ? 1 : 0 }}
    />
  );
}
