"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "9999px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        }}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
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
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
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
  );
}
