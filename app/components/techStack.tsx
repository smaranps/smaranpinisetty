"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Poppins } from "next/font/google";
import { Google_Sans_Flex } from "next/font/google";
const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
});

type TechItem = {
  name: string;
  icon: string;
  width: number;
  height: number;
  builtWith: string;
};

const techStack: TechItem[] = [
  {
    name: "SwiftUI",
    icon: "/swiftui.png",
    width: 45,
    height: 45,
    builtWith: "ChronoCraft (Swift Challenge)",
  },
  {
    name: "React Native",
    icon: "/download.png",
    width: 45,
    height: 45,
    builtWith: "EchoNotes AI App",
  },
  {
    name: "Next.js",
    icon: "/nextjs.png",
    width: 80,
    height: 80,
    builtWith: "Doorstep Desserts & Portfolio",
  },
  {
    name: "Python",
    icon: "/python.png",
    width: 45,
    height: 45,
    builtWith: "Backend Scripts & AI Tools",
  },
  {
    name: "Expo",
    icon: "/expoapp.png",
    width: 40,
    height: 40,
    builtWith: "Cross-Platform Mobile Builds",
  },
  {
    name: "JavaScript",
    icon: "/js.png",
    width: 45,
    height: 45,
    builtWith: "Web Apps & Dynamic Logic",
  },
  {
    name: "Tailwind CSS",
    icon: "/css.png",
    width: 100,
    height: 60,
    builtWith: "Modern UI Development",
  },
  {
    name: "Node.js",
    icon: "/node.png",
    width: 60,
    height: 40,
    builtWith: "APIs & Server Logic",
  },
  {
    name: "PostgreSQL",
    icon: "/postgres.png",
    width: 55,
    height: 55,
    builtWith: "Relational Databases",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export default function InteractiveTechStack() {
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "850px",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "16px",
          padding: "20px 10px",
        }}
      >
        {techStack.map((tech) => (
          <motion.div
            key={tech.name}
            variants={itemVariants}
            whileHover={{ scale: 1.08, y: -4 }}
            onMouseEnter={() => setHoveredTech(tech)}
            onMouseLeave={() => setHoveredTech(null)}
            style={{
              padding: "12px 20px",
              borderRadius: "18px",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border:
                hoveredTech?.name === tech.name
                  ? "1px solid rgba(0, 113, 227, 0.5)"
                  : "1px solid rgba(255, 255, 255, 0.5)",
              boxShadow:
                hoveredTech?.name === tech.name
                  ? "0 12px 25px rgba(0, 113, 227, 0.15)"
                  : "0 4px 15px rgba(0, 0, 0, 0.04)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "70px",
              minWidth: "100px",
              transition: "border 0.2s, box-shadow 0.2s",
            }}
          >
            <Image
              src={tech.icon}
              alt={tech.name}
              width={tech.width}
              height={tech.height}
              style={{ objectFit: "contain" }}
            />
          </motion.div>
        ))}
      </motion.div>

      <div
        style={{
          height: "42px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "8px",
        }}
      >
        <AnimatePresence mode="wait">
          {hoveredTech ? (
            <motion.div
              key={hoveredTech.name}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              style={{
                padding: "6px 16px",
                borderRadius: "9999px",
                backgroundColor: "rgba(29, 29, 31, 0.85)",
                backdropFilter: "blur(10px)",
                color: "#ffffff",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
              }}
            >
              <span
                className={poppins.className}
                style={{ fontWeight: 600, color: "#38edf8" }}
              >
                {hoveredTech.name}:
              </span>
              <span style={{ fontFamily: googleSans.style.fontFamily }}>
                {hoveredTech.builtWith}
              </span>
            </motion.div>
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                fontSize: "12px",
                color: "#86868b",
                fontFamily: googleSans.style.fontFamily,
              }}
            >
              Hover over a tool to see what I built with it
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
