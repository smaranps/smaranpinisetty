"use client";

import React, { useState, useRef } from "react";

const GLITCH_CHARS =
  "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function GlitchedName({
  text = "Smaran Pinisetty",
}: {
  text?: string;
}) {
  const [displayText, setDisplayText] = useState(text);
  const isGlitching = useRef(false);

  const triggerGlitch = () => {
    if (isGlitching.current) return;
    isGlitching.current = true;

    let iterations = 0;
    const maxIterations = text.length * 3;

    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (index < iterations / 3) {
              return text[index];
            }

            return GLITCH_CHARS[
              Math.floor(Math.random() * GLITCH_CHARS.length)
            ];
          })
          .join("")
      );

      iterations += 1;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        isGlitching.current = false;
      }
    }, 36);
  };

  return (
    <span
      onMouseEnter={triggerGlitch}
      className="gradient-text"
      style={{
        cursor: "pointer",
        display: "inline-block",
        fontFamily: "monospace, sans-serif",
        userSelect: "none",
      }}
    >
      {displayText}
    </span>
  );
}
