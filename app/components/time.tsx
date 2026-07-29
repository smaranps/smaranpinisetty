"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TimeLocation() {
  const [timeState, setTimeState] = useState<{
    hoursMinutes: string;
    tensDigit: string;
    onesDigit: string;
    ampm: string;
  } | null>(null);

  const [location, setLocation] = useState<string>("Loading...");
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined);
  const [isNight, setIsNight] = useState<boolean>(false);
  const [timeOffsetLabel, setTimeOffsetLabel] = useState<string>("");

  useEffect(() => {
    async function fetchLocation() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error("Location fetch failed");

        const data = await res.json();
        const formattedLocation =
          data.city && data.region_code
            ? `${data.city}, ${data.region_code}`
            : data.city || "Unknown";

        setLocation(formattedLocation);
        setTimeZone(data.timezone);

        if (data.timezone) {
          try {
            const now = new Date();

            const localOffsetMinutes = now.getTimezoneOffset();

            const utcDate = new Date(
              now.toLocaleString("en-US", { timeZone: "UTC" })
            );
            const tzDate = new Date(
              now.toLocaleString("en-US", { timeZone: data.timezone })
            );
            const diffMins =
              (tzDate.getTime() - utcDate.getTime()) / (1000 * 60);

            const hostTzDate = new Date(
              now.toLocaleString("en-US", { timeZone: "America/Toronto" })
            );
            const hostDiffMins =
              (hostTzDate.getTime() - utcDate.getTime()) / (1000 * 60);

            let offsetDiffHours = (diffMins - hostDiffMins) / 60;

            if (Math.abs(offsetDiffHours) < 0.25) {
              setTimeOffsetLabel("Same time");
            } else {
              const sign = offsetDiffHours > 0 ? "+ hrs ahead" : "- hrs behind";
              setTimeOffsetLabel(
                `${sign}${Number(offsetDiffHours.toFixed(1))}h`
              );
            }
          } catch (e) {
            console.error("Error calculating timezone offset:", e);
          }
        }
      } catch (err) {
        console.error("Failed to detect location:", err);
        setLocation("Toronto, ON");
      }
    }

    fetchLocation();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const timeString = now.toLocaleTimeString("en-US", {
        ...(timeZone ? { timeZone } : {}),
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const currentHour = timeZone
        ? new Date(now.toLocaleString("en-US", { timeZone })).getHours()
        : now.getHours();

      setIsNight(currentHour >= 19 || currentHour < 6);

      const [hm, ampm] = timeString.split(" ");
      const secondsStr = now.getSeconds().toString().padStart(2, "0");

      setTimeState({
        hoursMinutes: hm,
        tensDigit: secondsStr[0],
        onesDigit: secondsStr[1],
        ampm: ampm || "",
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  if (!timeState) return null;

  const theme = isNight
    ? {
        bg: "rgba(15, 23, 42, 0.65)",
        border: "rgba(99, 102, 241, 0.35)",
        shadow: "0 4px 20px rgba(99, 102, 241, 0.2)",
        textColor: "#f8fafc",
        dotColor: "#818cf8",
        dotShadow: "0 0 10px rgba(129, 140, 248, 0.9)",
        badgeBg: "rgba(255, 255, 255, 0.12)",
        badgeText: "#c7d2fe",
      }
    : {
        bg: "rgba(255, 255, 255, 0.55)",
        border: "rgba(251, 191, 36, 0.5)",
        shadow: "0 4px 20px rgba(245, 158, 11, 0.12)",
        textColor: "#1d1d1f",
        dotColor: "#f59e0b",
        dotShadow: "0 0 10px rgba(245, 158, 11, 0.9)",
        badgeBg: "rgba(0, 0, 0, 0.06)",
        badgeText: "#b45309",
      };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 16px",
        borderRadius: "9999px",
        backgroundColor: theme.bg,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${theme.border}`,
        boxShadow: theme.shadow,
        fontSize: "13px",
        fontWeight: 500,
        color: theme.textColor,
        letterSpacing: "-0.01em",
        fontFamily: "var(--font-geist-mono), monospace, system-ui",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <span
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          backgroundColor: theme.dotColor,
          boxShadow: theme.dotShadow,
          transition: "all 0.5s ease-in-out",
        }}
      />

      <span>{location}</span>

      {timeOffsetLabel && (
        <span
          style={{
            fontSize: "10px",
            fontWeight: 600,
            padding: "2px 6px",
            borderRadius: "6px",
            backgroundColor: theme.badgeBg,
            color: theme.badgeText,
            lineHeight: 1,
            transition: "all 0.5s ease-in-out",
          }}
        >
          {timeOffsetLabel}
        </span>
      )}

      <span style={{ opacity: 0.3 }}>•</span>

      <div style={{ display: "inline-flex", alignItems: "center" }}>
        <span>{timeState.hoursMinutes}:</span>

        <div
          style={{
            position: "relative",
            width: "10px",
            height: "18px",
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "middle",
          }}
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={timeState.tensDigit}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 25,
              }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                display: "inline-block",
              }}
            >
              {timeState.tensDigit}
            </motion.span>
          </AnimatePresence>
        </div>

        <div
          style={{
            position: "relative",
            width: "10px",
            height: "18px",
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "middle",
          }}
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={timeState.onesDigit}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 25,
              }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                display: "inline-block",
              }}
            >
              {timeState.onesDigit}
            </motion.span>
          </AnimatePresence>
        </div>

        <span style={{ marginLeft: "4px", fontSize: "11px", opacity: 0.8 }}>
          {timeState.ampm}
        </span>
      </div>
    </div>
  );
}
