"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { useTheme } from "next-themes";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function FeaturedProjectCard() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [activeTab, setActiveTab] = useState<"overview" | "preview">("preview");

  const cardBg = isDark
    ? "rgba(15, 23, 42, 0.75)"
    : "rgba(255, 255, 255, 0.45)";
  const headerBg = isDark
    ? "rgba(30, 41, 59, 0.6)"
    : "rgba(255, 255, 255, 0.5)";
  const borderColor = isDark
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(255, 255, 255, 0.6)";
  const headerBorder = isDark
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(0, 0, 0, 0.06)";
  const headerTextColor = isDark ? "#94a3b8" : "#6e6e73";
  const promptColor = isDark ? "#38bdf8" : "#0071e3";
  const commandTextColor = isDark ? "#f8fafc" : "#1d1d1f";
  const responseTextColor = isDark ? "#cbd5e1" : "#515154";
  const uiInnerBg = isDark
    ? "rgba(15, 23, 42, 0.9)"
    : "rgba(255, 255, 255, 0.8)";
  const cardShadow = isDark
    ? "0 20px 40px rgba(0, 0, 0, 0.4)"
    : "0 20px 40px rgba(0, 113, 227, 0.18)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        width: "350px",
        height: "370px",
        borderRadius: "20px",
        marginLeft: "40px",
        backgroundColor: cardBg,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${borderColor}`,
        boxShadow: cardShadow,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        marginTop: "30px",
        fontFamily: "'Fira Code', 'Geist Mono', monospace",
        transition:
          "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div
        style={{
          padding: "10px 14px",
          background: headerBg,
          borderBottom: `1px solid ${headerBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#ff5f56",
            }}
          />
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#ffbd2e",
            }}
          />
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#27c93f",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "4px" }}>
          <button
            onClick={() => setActiveTab("preview")}
            style={{
              background: activeTab === "preview" ? promptColor : "transparent",
              color: activeTab === "preview" ? "#ffffff" : headerTextColor,
              border: "none",
              borderRadius: "4px",
              fontSize: "10px",
              fontWeight: 600,
              padding: "2px 6px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            UI Mockup
          </button>
          <button
            onClick={() => setActiveTab("overview")}
            style={{
              background:
                activeTab === "overview" ? promptColor : "transparent",
              color: activeTab === "overview" ? "#ffffff" : headerTextColor,
              border: "none",
              borderRadius: "4px",
              fontSize: "10px",
              fontWeight: 600,
              padding: "2px 6px",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Specs
          </button>
        </div>
      </div>

      <div
        style={{
          padding: "12px 14px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {activeTab === "preview" ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              borderRadius: "12px",
              backgroundColor: uiInnerBg,
              border: `1px solid ${headerBorder}`,
              overflow: "hidden",
              padding: "10px",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "11px",
                  color: commandTextColor,
                }}
              >
                Probable.ai
              </span>
              <span
                style={{
                  fontSize: "9px",
                  padding: "2px 6px",
                  borderRadius: "9999px",
                  backgroundColor: "#10b981",
                  color: "#ffffff",
                  fontWeight: 600,
                }}
              >
                In Progress
              </span>
            </div>

            <div
              style={{
                flex: 1,
                borderRadius: "8px",
                border: "1px dashed rgba(100, 116, 139, 0.4)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.02)",
                padding: "8px",
                textAlign: "center",
              }}
            >
              {/* <Image
                src="/probable.png"
                alt="Image"
                width={280}
                height={300}
                style={{
                  flex: 1,
                  borderRadius: "8px",

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.02)",

                  textAlign: "center",
                }}
              ></Image> */}
              <span style={{ fontSize: "10px", color: "#1d1d1f" }}>
                More details coming soon...
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "10px",
                color: responseTextColor,
                padding: "4px 6px",
                borderRadius: "6px",
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
              }}
            >
              <span>
                Acc: <strong>94%</strong>
              </span>
              <span>
                Avg Latency: <strong>38ms</strong>
              </span>
            </div>
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontSize: "11px",
              color: commandTextColor,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: promptColor, fontWeight: 700 }}>❯</span>
              <span style={{ fontWeight: 600 }}>probable --specs</span>
            </div>

            <p
              style={{
                color: responseTextColor,
                margin: 0,
                fontSize: "10px",
                lineHeight: "1.4",
              }}
            >
              Stay tuned for more details!
            </p>

            <div style={{ marginTop: "auto" }}>
              <span
                style={{
                  fontSize: "10px",
                  color: promptColor,
                  fontWeight: 600,
                }}
              >
                Stack:
              </span>
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  flexWrap: "wrap",
                  marginTop: "4px",
                }}
              >
                {["Next.js 14", "Gemini API", "Firebase", "Tailwind"].map(
                  (tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: "9px",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        backgroundColor: isDark ? "#1e293b" : "#e2e8f0",
                        color: commandTextColor,
                      }}
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <a
            href="https://github.com/smaranps/probable-ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              textAlign: "center",
              padding: "6px",
              borderRadius: "8px",
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.05)",
              color: commandTextColor,
              fontSize: "10px",
              fontWeight: 600,
              textDecoration: "none",
              border: `1px solid ${headerBorder}`,
            }}
          >
            GitHub (In Progress)
          </a>
          <a
            href="https://probable-ai.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              textAlign: "center",
              padding: "6px",
              borderRadius: "8px",
              backgroundColor: promptColor,
              color: "#ffffff",
              fontSize: "10px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Live Site (In Progress)
          </a>
        </div>
      </div>
    </motion.div>
  );
}
