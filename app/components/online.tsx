"use client";

import React, { useEffect, useState } from "react";
import { Google_Sans_Flex } from "next/font/google";
import { useTheme } from "next-themes";

const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
});

export default function LiveStatus() {
  const [mounted, setMounted] = useState(false);
  const [onlineCount, setOnlineCount] = useState(1);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    const initial = Math.floor(Math.random() * 3) + 1;
    setOnlineCount(initial);

    const interval = setInterval(() => {
      const change = Math.random() > 0.5 ? 1 : -1;
      setOnlineCount((prev) => Math.max(1, prev + change));
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const pillBg = isDark ? "rgba(15, 23, 42, 0.65)" : "rgba(255, 255, 255, 0.4)";
  const pillBorder = isDark
    ? "1px solid rgba(255, 255, 255, 0.1)"
    : "1px solid rgba(255, 255, 255, 0.5)";
  const pillTextColor = isDark ? "#f8fafc" : "#1d1d1f";
  const pillShadow = isDark
    ? "0 4px 15px rgba(0, 0, 0, 0.3)"
    : "0 4px 15px rgba(0, 0, 0, 0.05)";

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "20px",
        zIndex: 50,
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 16px",
        borderRadius: "9999px",
        backgroundColor: pillBg,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: pillBorder,
        boxShadow: pillShadow,
        fontFamily: googleSans.style.fontFamily,
        transition:
          "background-color 0.3s ease, border 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <span
        style={{
          position: "relative",
          display: "flex",
          height: "8px",
          width: "8px",
        }}
      >
        <span
          style={{
            position: "absolute",
            display: "inline-flex",
            height: "100%",
            width: "100%",
            borderRadius: "50%",
            backgroundColor: "#22c55e",
            opacity: 0.75,
            animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
          }}
        />
        <span
          style={{
            position: "relative",
            display: "inline-flex",
            borderRadius: "50%",
            height: "8px",
            width: "8px",
            backgroundColor: "#22c55e",
          }}
        />
      </span>

      <span
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: pillTextColor,
          letterSpacing: "-0.01em",
          transition: "color 0.3s ease",
        }}
      >
        {onlineCount} {onlineCount === 1 ? "person" : "people"} online
      </span>
    </div>
  );
}
