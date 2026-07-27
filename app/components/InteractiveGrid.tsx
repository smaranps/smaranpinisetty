"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const mouse = { x: -1000, y: -1000 };
    const spacing = 35;
    const radius = 2;
    const mouseRadius = 120;

    interface Dot {
      baseX: number;
      baseY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
    }

    let dots: Dot[] = [];

    const resizeAndInit = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      dots = [];
      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          dots.push({
            baseX: x,
            baseY: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    resizeAndInit();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resizeAndInit);

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const isDark = resolvedTheme === "dark";
      const baseDotColor = isDark
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.25)";
      const activeDotColor = isDark ? "#38bdf8" : "#0071e3";

      dots.forEach((dot) => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseRadius - dist) / mouseRadius;
          dot.vx -= Math.cos(angle) * force * 10;
          dot.vy -= Math.sin(angle) * force * 10;
        }

        dot.vx += (dot.baseX - dot.x) * 0.08;
        dot.vy += (dot.baseY - dot.y) * 0.08;

        dot.vx *= 0.82;
        dot.vy *= 0.82;

        dot.x += dot.vx;
        dot.y += dot.vy;

        const displacement = Math.sqrt(
          (dot.x - dot.baseX) ** 2 + (dot.y - dot.baseY) ** 2
        );

        ctx.beginPath();
        ctx.arc(
          dot.x,
          dot.y,
          radius + Math.min(displacement * 0.1, 1.5),
          0,
          Math.PI * 2
        );

        ctx.fillStyle = displacement > 2 ? activeDotColor : baseDotColor;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeAndInit);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
