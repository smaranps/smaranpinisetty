"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Poppins, Google_Sans_Flex } from "next/font/google";
import { useTheme } from "next-themes";

const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
});

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString() + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} className={poppins.className} />;
}

export default function CounterBadges() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const stats = [
    { value: 7, suffix: "+", label: "Projects Built" },
    { value: 3, suffix: "+ Yrs", label: "Dev Experience" },
    { value: 10, suffix: "+", label: "Tech Stack Tools" },
  ];

  const badgeBg = isDark
    ? "rgba(15, 23, 42, 0.65)"
    : "rgba(255, 255, 255, 0.45)";
  const badgeBorder = isDark
    ? "1px solid rgba(255, 255, 255, 0.1)"
    : "1px solid rgba(255, 255, 255, 0.6)";
  const numberColor = isDark ? "#38bdf8" : "#0071e3";
  const labelColor = isDark ? "#94a3b8" : "#6e6e73";
  const shadow = isDark
    ? "0 10px 25px rgba(0, 0, 0, 0.3)"
    : "0 10px 25px rgba(0, 113, 227, 0.08)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        display: "flex",
        gap: "16px",
        justifyContent: "center",
        flexWrap: "wrap",
        margin: "30px 0 10px 0",
        width: "100%",
        maxWidth: "800px",
      }}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          style={{
            flex: "1 1 180px",
            padding: "16px 20px",
            borderRadius: "20px",
            backgroundColor: badgeBg,
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: badgeBorder,
            boxShadow: shadow,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            transition:
              "background-color 0.3s ease, border 0.3s ease, color 0.3s ease",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: numberColor,
              lineHeight: "1.1",
            }}
          >
            <Counter value={stat.value} suffix={stat.suffix} />
          </div>
          <span
            style={{
              fontSize: "12px",
              color: labelColor,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              fontFamily: googleSans.style.fontFamily,
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
