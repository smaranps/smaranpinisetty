"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Poppins } from "next/font/google";
import { useTheme } from "next-themes";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type CommandOutput = {
  command: string;
  response: React.ReactNode;
};

export default function TerminalCard() {
  const [input, setInput] = useState("");
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "smaran --info",
      response: "Full-Stack & iOS Dev | Toronto, ON",
    },
    {
      command: "smaran --stack",
      response: "SwiftUI, React Native, Next.js, Python, Tailwind",
    },
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let response: React.ReactNode = "";

    switch (true) {
      case cmd === "help":
        response =
          "Available: info, stack, projects, status, theme <dark/light>, date, whoami, clear";
        break;
      case cmd === "info" || cmd === "smaran --info":
        response = "Full-Stack & iOS Dev | Rising Grade 11";
        break;
      case cmd === "stack" || cmd === "smaran --stack":
        response = "SwiftUI, Next.js, React Native, Python, Postgres";
        break;
      case cmd === "projects":
        response =
          "ChronoCraft (Swift), EchoNotes (React Native), Doorstep Desserts";
        break;
      case cmd === "status":
        response = "⚡ In the lab building iOS apps & prepping for hackathons";
        break;
      case cmd === "future":
        response =
          "probable.ai (university helper), CommUnity (community app), ARKit app";
        break;
      case cmd === "theme dark":
        setTheme("dark");
        response = "Switched to dark theme.";
        break;
      case cmd === "theme light":
        setTheme("light");
        response = "Switched to light theme.";
        break;
      case cmd === "date":
        response = new Date().toUTCString();
        break;
      case cmd === "whoami":
        response = "guest@smaran-portfolio ~ running zsh v5.9";
        break;
      case cmd === "matrix":
        response =
          "1110011 01111001 01110011 01110100 01100101 01101101 00100000 01101111 01101110 01101100 01101001 01101110 01100101";
        break;
      case cmd === "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        response = `Command not found: "${cmd}". Type "help" for options.`;
    }

    setHistory((prev) => [...prev, { command: input, response }]);
    setInput("");
  };

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
        height: "360px",
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
        <span
          className={poppins.className}
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: headerTextColor,
            letterSpacing: "-0.01em",
            transition: "color 0.3s ease",
          }}
        >
          smaran:~ (zsh)
        </span>
      </div>

      <div
        style={{
          padding: "12px 14px",
          flex: 1,
          overflowY: "auto",
          fontSize: "12px",
          color: commandTextColor,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {history.map((item, index) => (
          <div
            key={index}
            style={{ display: "flex", flexDirection: "column", gap: "2px" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  color: promptColor,
                  fontWeight: 700,
                  transition: "color 0.3s ease",
                }}
              >
                ❯
              </span>
              <span
                style={{
                  fontWeight: 600,
                  color: commandTextColor,
                  transition: "color 0.3s ease",
                }}
              >
                {item.command}
              </span>
            </div>
            <div
              style={{
                color: responseTextColor,
                paddingLeft: "14px",
                lineHeight: "1.4",
                transition: "color 0.3s ease",
              }}
            >
              {item.response}
            </div>
          </div>
        ))}

        <form
          onSubmit={handleCommand}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "2px",
          }}
        >
          <span
            style={{
              color: promptColor,
              fontWeight: 700,
              transition: "color 0.3s ease",
            }}
          >
            ❯
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type 'help'..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: commandTextColor,
              fontFamily: "inherit",
              fontSize: "12px",
              width: "100%",
            }}
          />
        </form>
      </div>
    </motion.div>
  );
}
