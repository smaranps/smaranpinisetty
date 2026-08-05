"use client";

import React, { useState } from "react";
import { Poppins, Google_Sans_Flex } from "next/font/google";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
  FaEnvelope,
} from "react-icons/fa";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
});

async function submitContactForm(formData: FormData) {
  "use server";

  const apiKey = "c2607d24-9921-4355-bb40-49ad73ac64b0";
  formData.append("access_key", apiKey);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Network error on server. Please check connection.",
    };
  }
}

export default function ContactForm() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const formElements = e.currentTarget
      .elements as typeof e.currentTarget.elements & {
      name: HTMLInputElement;
      email: HTMLInputElement;
      message: HTMLTextAreaElement;
    };

    const name = formElements.name.value.trim();
    const email = formElements.email.value.trim();
    const message = formElements.message.value.trim();

    if (!name) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!message) {
      setErrorMessage("Please enter a message before sending.");
      return;
    }

    setStatus("submitting");

    try {
      const formData = new FormData(e.currentTarget);
      const data = await submitContactForm(formData);

      if (data.success) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  const cardBg = isDark ? "rgba(15, 23, 42, 0.65)" : "rgba(255, 255, 255, 0.5)";
  const cardBorder = isDark
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(255, 255, 255, 0.6)";
  const inputBg = isDark ? "rgba(30, 41, 59, 0.5)" : "rgba(255, 255, 255, 0.6)";
  const inputBorder = isDark
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.08)";
  const textColor = isDark ? "#f8fafc" : "#1d1d1f";
  const placeholderColor = isDark ? "#64748b" : "#86868b";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "36px",
        borderRadius: "28px",
        backgroundColor: cardBg,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${cardBorder}`,
        boxShadow: isDark
          ? "0 20px 40px rgba(0, 0, 0, 0.4)"
          : "0 20px 40px rgba(0, 113, 227, 0.08)",
        transition: "background-color 0.3s ease, border 0.3s ease",
      }}
    >
      <h3
        style={{
          fontSize: "22px",
          fontWeight: 600,
          color: textColor,
          margin: "0 0 8px 0",
          fontFamily: "var(--font-geist-mono), monospace, system-ui",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        Send a Message <FaEnvelope size={18} />
      </h3>
      <p
        style={{
          fontSize: "14px",
          color: placeholderColor,
          margin: "0 0 24px 0",
          lineHeight: "1.5",
          fontFamily: "var(--font-geist-mono), monospace, system-ui",
        }}
      >
        Got a project in mind, a question, or just want to connect? Drop a
        message below and I will get back to you shortly.
      </p>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            textAlign: "center",
            gap: "12px",
          }}
        >
          <FaCheckCircle size={40} style={{ color: "#22c55e" }} />
          <h4
            className={poppins.className}
            style={{ fontSize: "18px", color: textColor, margin: 0 }}
          >
            Message Sent Successfully!
          </h4>
          <p
            className={googleSans.className}
            style={{ fontSize: "14px", color: placeholderColor, margin: 0 }}
          >
            Thanks for reaching out. I'll get back to you soon!
          </p>
          <button
            onClick={() => setStatus("idle")}
            className={poppins.className}
            style={{
              marginTop: "16px",
              padding: "8px 20px",
              borderRadius: "9999px",
              backgroundColor: "#0071e3",
              color: "#fff",
              border: "none",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Send Another
          </button>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          noValidate
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
            className="form-grid"
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: textColor,
                  fontFamily: "var(--font-geist-mono), monospace, system-ui",
                }}
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className={googleSans.className}
                style={{
                  padding: "12px 16px",
                  borderRadius: "14px",
                  backgroundColor: inputBg,
                  border: `1px solid ${inputBorder}`,
                  color: textColor,
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
              />
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <label
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: textColor,
                  fontFamily: "var(--font-geist-mono), monospace, system-ui",
                }}
              >
                Your Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                className={googleSans.className}
                style={{
                  padding: "12px 16px",
                  borderRadius: "14px",
                  backgroundColor: inputBg,
                  border: `1px solid ${inputBorder}`,
                  color: textColor,
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: textColor,
                fontFamily: "var(--font-geist-mono), monospace, system-ui",
              }}
            >
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              placeholder="What's on your mind?"
              className={googleSans.className}
              style={{
                padding: "12px 16px",
                borderRadius: "14px",
                backgroundColor: inputBg,
                border: `1px solid ${inputBorder}`,
                color: textColor,
                fontSize: "14px",
                outline: "none",
                resize: "vertical",
                transition: "border-color 0.2s ease",
              }}
            />
          </div>
          {errorMessage && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className={googleSans.className}
              style={{
                fontSize: "13px",
                color: "#ef4444",
                margin: 0,
                fontWeight: 500,
              }}
            >
              {errorMessage}
            </motion.p>
          )}
          <motion.button
            type="submit"
            disabled={status === "submitting"}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={poppins.className}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "14px 24px",
              borderRadius: "9999px",
              backgroundColor: "#0071e3",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(0, 113, 227, 0.2)",
              opacity: status === "submitting" ? 0.7 : 1,
            }}
          >
            {status === "submitting" ? (
              <>
                <FaSpinner className="fa-spin" /> Sending...
              </>
            ) : (
              <>
                <FaPaperPlane size={13} /> Send Message
              </>
            )}
          </motion.button>
        </form>
      )}
    </motion.div>
  );
}
