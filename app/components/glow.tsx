"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      animate={{
        x: mousePosition.x - 200,
        y: mousePosition.y - 200,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 30,
        mass: 0.1,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(0, 113, 227, 0.18) 0%, rgba(0, 113, 227, 0) 70%)",
        pointerEvents: "none",
        zIndex: 0,
        filter: "blur(20px)",
      }}
    />
  );
}
