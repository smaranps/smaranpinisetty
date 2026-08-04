"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function FooterCopyright() {
  const [year, setYear] = useState<number | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const isDark = resolvedTheme === "dark";
  const textColor = isDark ? "#94a3b8" : "#6e6e73";

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "2rem 1rem",
        fontSize: "12px",
        fontFamily: "'Fira Code', 'Geist Mono', monospace",
        color: textColor,
        transition: "color 0.3s ease",
      }}
    >
      <p style={{ margin: 0 }}>
        © {year ?? "2026"} Smaran Pinisetty. All rights reserved.
      </p>
    </footer>
  );
}
