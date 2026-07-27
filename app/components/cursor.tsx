"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest(".card") ||
        target.closest(".contact-item") ||
        target.closest(".glass-card") ||
        target.closest("a")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovered ? 1.25 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1500,
          damping: 50,
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        <svg
          width="20"
          height="24"
          viewBox="0 0 20 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: "drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.2))",
          }}
        >
          <path
            d="M2 2L18 11.5L10.5 13.5L7 21L2 2Z"
            fill="#0071e3"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
