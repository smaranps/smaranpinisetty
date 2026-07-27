"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LinkPreviewProps {
  imageSrc: string;
  children: React.ReactNode;
  className?: string;
}

export default function LinkPreview({
  imageSrc,
  children,
  className = "",
}: LinkPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ position: "relative" }}
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{
              position: "absolute",
              top: mousePos.y - 130,
              left: mousePos.x + 15,
              pointerEvents: "none",
              zIndex: 100,
            }}
          >
            <div
              style={{
                width: "200px",
                height: "125px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
                backgroundColor: "#111",
              }}
            >
              <img
                src={imageSrc}
                alt="Link Preview"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
