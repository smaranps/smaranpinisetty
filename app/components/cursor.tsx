"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const interactiveEl = target.closest(
        "a, button, input, textarea, select, [role='button'], .card, .contact-item, .glass-card, .guestbook-glass"
      );

      setIsHovered(!!interactiveEl);
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 2147483647,
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <motion.div
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isMouseDown ? 0.8 : isHovered ? 1.6 : 1,
          opacity: isHovered ? 0.9 : 0.5,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 25,
          mass: 0.5,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1.5px solid rgba(0, 122, 255, 0.6)",
          backgroundColor: "rgba(0, 122, 255, 0.05)",
          boxShadow: "0 0 15px rgba(0, 122, 255, 0.3)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isMouseDown ? 0.5 : isHovered ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1200,
          damping: 40,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "#007aff",
          boxShadow: "0 0 8px rgba(0, 122, 255, 0.8)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
