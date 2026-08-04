"use client";

import React from "react";
import FeaturedProjectCard from "./components/project";
import LatencySimulator from "./components/simulator";
import Image from "next/image";
import FooterCopyright from "./components/year";
import Link from "next/link";
import { Google_Sans_Flex, Poppins } from "next/font/google";
import { motion, Variants, useSpring, useScroll } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import ApiPlayground from "./components/playground";
import Projects from "./components/projects";
import Typewriter from "./components/typewrite";
import GuestbookSection from "./components/guestbook";
import ContactForm from "./components/form";
import InteractiveGrid from "./components/InteractiveGrid";
import CustomCursor from "./components/cursor";
import GitHubStats from "./components/stats";
import LiveStatus from "./components/online";
import CursorGlow from "./components/glow";
import TimeLocation from "./components/time";
import ThemeToggle from "./components/themeToggle";
import TerminalCard from "./components/terminal";
import CounterBadges from "./components/badges";
import InteractiveTechStack from "./components/techStack";
import GlitchedName from "./components/glitchEffect";

import "./app.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="bg relative min-h-screen">
      <div style={{ position: "fixed", top: "20px", left: "20px", zIndex: 50 }}>
        <LiveStatus />
      </div>

      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
        className="responsive"
      >
        <TimeLocation />
        <ThemeToggle />
      </div>

      <CursorGlow />
      <CustomCursor />
      <InteractiveGrid />

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
          padding: "10px",
          paddingTop: "100px",
        }}
      >
        <nav className="floating-nav">
          <Link href="#about" className={poppins.className}>
            About
          </Link>
          <Link href="#experience" className={poppins.className}>
            Experience
          </Link>
          <Link href="#work" className={poppins.className}>
            Projects
          </Link>
          <Link href="#contact" className={poppins.className}>
            Contact Me
          </Link>

          <motion.div className="nav-progress-bar" style={{ scaleX }} />
        </nav>

        <section
          className="bento-hero"
          id="about"
          style={{
            width: "100%",
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "20px",
            paddingTop: "20px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bento-main-card"
            style={{
              padding: "32px",
              borderRadius: "28px",
              backgroundColor: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow: "0 20px 40px rgba(0, 113, 227, 0.08)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div>
              <h1
                className={poppins.className}
                style={{
                  fontSize: "42px",
                  fontWeight: 700,
                  lineHeight: "1.1",
                  margin: "0 0 6px 0",
                }}
              >
                <span className="gradient-text">
                  <GlitchedName text="Smaran Pinisetty" />
                </span>
              </h1>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  color: "#0071e3",
                  margin: "0 0 16px 0",
                  fontFamily: "var(--font-geist-mono), monospace, system-ui",
                }}
              >
                <Typewriter
                  words={[
                    "16 year old from Toronto, A Full Stack & iOS Developer",
                    "Building apps & competing in hackathons",
                    "Passionate about Full Stack Development and SwiftUI",
                  ]}
                />
              </h3>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 180px",
                gap: "20px",
                alignItems: "center",
              }}
              className="bento-bio-container"
            >
              <p
                className={googleSans.className}
                style={{
                  fontSize: "13.5px",
                  lineHeight: "1.65",
                  color: "#333336",
                  margin: 0,
                }}
              >
                A full-stack & iOS Developer building web apps, mobile software,
                and AI tools. An active hackathon competitor specializing mainly
                with SwiftUI, React Native, Next.js, and Python.
                <br />
                <br />I focus on building high performance applications with
                intuitive user interfaces. From real time data pipelines to
                mobile experiences, I enjoy transforming complex technical
                challenges into simple, user friendly software.
              </p>

              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#Faf9F9",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  borderRadius: "18px",
                  boxShadow: "0 10px 25px rgba(0, 113, 227, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.8)",
                }}
              >
                <Image
                  className="profile-photo-card"
                  src={"/memoji.png"}
                  alt="profile"
                  width={160}
                  height={185}
                  style={{ borderRadius: "12px", objectFit: "cover" }}
                  priority
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 14px",
                borderRadius: "14px",
                backgroundColor: "rgba(255, 255, 255, 0.35)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#86868b",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                  fontFamily: googleSans.style.fontFamily,
                }}
              >
                Focus:
              </span>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: "11px",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: "rgba(0, 113, 227, 0.08)",
                    color: "#0071e3",
                    fontWeight: 600,
                    fontFamily: googleSans.style.fontFamily,
                  }}
                >
                  React Native & SwiftUI
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: "rgba(0, 0, 0, 0.05)",
                    color: "#1d1d1f",
                    fontWeight: 500,
                    fontFamily: googleSans.style.fontFamily,
                  }}
                >
                  Hackathons
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    background: "rgba(0, 0, 0, 0.05)",
                    color: "#1d1d1f",
                    fontWeight: 500,
                    fontFamily: googleSans.style.fontFamily,
                  }}
                >
                  Machine Learning, Python
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <Link
                href="#work"
                className={poppins.className}
                style={{
                  padding: "10px 20px",
                  borderRadius: "9999px",
                  backgroundColor: "#0071e3",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                View Work
              </Link>
              <Link
                href="#contact"
                className={poppins.className}
                style={{
                  padding: "10px 20px",
                  borderRadius: "9999px",
                  backgroundColor: "black",
                  color: "gainsboro",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                }}
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>

          <div
            className="bento-side-column"
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <FeaturedProjectCard />
            <CounterBadges />
          </div>
        </section>

        <div
          style={{
            maxWidth: "1600px",
            margin: "0 auto",
            padding: "0 20px",
            width: "100%",
          }}
        >
          <GuestbookSection />
        </div>

        <GitHubStats username="smaranps" />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          id="experience"
          className={poppins.className}
          style={{ textAlign: "center", marginTop: "40px" }}
        >
          ⎯ My Experience ⎯
        </motion.h2>

        <InteractiveTechStack />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="work"
          style={{ width: "100%" }}
        >
          <Projects />
        </motion.div>
        <ApiPlayground />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
            width: "100%",
            maxWidth: "56rem",
            margin: "0 auto",
            alignItems: "stretch",
          }}
        >
          <LatencySimulator />
          <TerminalCard />
        </div>

        <h2
          className={poppins.className}
          style={{ textAlign: "center", marginTop: "40px" }}
        >
          ⎯ Contact Me ⎯
        </h2>
        <div style={{ width: "100%", padding: "0 20px", margin: "20px 0" }}>
          <ContactForm />
        </div>

        <div className="contact-box" id="contact">
          <a
            href="https://www.linkedin.com/in/smaran-pinisetty-42183a41b/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            <FaLinkedin size={22} />
            <span>@smaranpinisetty</span>
          </a>

          <a href="mailto:smaranpinisetty@gmail.com" className="contact-item">
            <FaEnvelope size={22} />
            <span>smaranpinisetty@gmail.com</span>
          </a>

          <a
            href="https://github.com/smaranps"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            <FaGithub size={22} />
            <span>github.com/smaranps</span>
          </a>
        </div>
        <FooterCopyright />
      </div>
    </div>
  );
}
