"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Google_Sans_Flex } from "next/font/google";

const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
});
const ACCENT_PRESETS = [
  { name: "Electric Blue", value: "#0066ff" },
  { name: "Emerald Green", value: "#10b981" },
  { name: "Vibrant Violet", value: "#8b5cf6" },
  { name: "Cyber Pink", value: "#ec4899" },
  { name: "Sunset Orange", value: "#f97316" },
];

export default function ThemeSelectCanvas() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [accentColor, setAccentColor] = useState("#0066ff");

  useEffect(() => {
    setMounted(true);
    const savedAccent = localStorage.getItem("portfolio-accent") || "#0066ff";
    setAccentColor(savedAccent);
    document.documentElement.style.setProperty("--accent-color", savedAccent);
  }, []);

  const handleAccentChange = (color: string) => {
    setAccentColor(color);
    localStorage.setItem("portfolio-accent", color);
    document.documentElement.style.setProperty("--accent-color", color);
  };

  if (!mounted) {
    return (
      <div
        style={{
          width: "38px",
          height: "38px",
          borderRadius: "9999px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        }}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <motion.button
          onClick={() => setTheme(isDark ? "light" : "dark")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle theme"
          style={{
            position: "relative",
            width: "38px",
            height: "38px",
            borderRadius: "9999px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            outline: "none",
            border: isDark
              ? "1px solid rgba(99, 102, 241, 0.35)"
              : "1px solid rgba(251, 191, 36, 0.5)",
            backgroundColor: isDark
              ? "rgba(15, 23, 42, 0.65)"
              : "rgba(255, 255, 255, 0.55)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: isDark
              ? "0 4px 15px rgba(99, 102, 241, 0.15)"
              : "0 4px 15px rgba(245, 158, 11, 0.12)",
            transition:
              "background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isDark ? "dark" : "light"}
              initial={{ y: -10, opacity: 0, rotate: -45, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
              exit={{ y: 10, opacity: 0, rotate: 45, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              {isDark ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c7d2fe"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#b45309"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open Theme Canvas"
          style={{
            position: "relative",
            width: "38px",
            height: "38px",
            borderRadius: "9999px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            outline: "none",
            border: `1px solid ${accentColor}80`,
            backgroundColor: isDark
              ? "rgba(15, 23, 42, 0.65)"
              : "rgba(255, 255, 255, 0.55)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: `0 4px 15px ${accentColor}33`,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={accentColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
            <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
            <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
            <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.71 1.7-1.63 0-.42-.16-.83-.43-1.14-.28-.32-.43-.72-.43-1.15 0-.92.78-1.68 1.7-1.68H17c2.76 0 5-2.24 5-5 0-5.52-4.48-10-10-10Z" />
          </svg>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: "48px",
              right: 0,
              zIndex: 50,
              width: "240px",
              padding: "16px",
              borderRadius: "16px",
              backgroundColor: isDark
                ? "rgba(15, 23, 42, 0.85)"
                : "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: isDark
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "600",
                marginBottom: "12px",
                color: isDark ? "#cbd5e1" : "#475569",
                fontFamily: googleSans.style.fontFamily,
              }}
            >
              Theme Accent Canvas
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              {ACCENT_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handleAccentChange(preset.value)}
                  title={preset.name}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: preset.value,
                    border:
                      accentColor === preset.value
                        ? "2px solid #ffffff"
                        : "none",
                    boxShadow:
                      accentColor === preset.value
                        ? `0 0 10px ${preset.value}`
                        : "none",
                    cursor: "pointer",
                    outline: "none",
                  }}
                />
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  color: isDark ? "#94a3b8" : "#64748b",
                  fontFamily: googleSans.style.fontFamily,
                }}
              >
                Custom Accent
              </span>
              <input
                type="color"
                value={accentColor}
                onChange={(e) => handleAccentChange(e.target.value)}
                style={{
                  width: "24px",
                  height: "24px",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "none",
                  background: "none",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
