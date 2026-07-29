"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/services/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

interface Signature {
  id: string;
  name: string;
  dataUrl: string;
  created_at: string;
}
import { Google_Sans_Flex } from "next/font/google";
const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
});

export default function GuestbookSection() {
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState<"draw" | "type">("draw");
  const [typedText, setTypedText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    async function fetchSignatures() {
      try {
        const q = query(
          collection(db, "guestbook"),
          orderBy("created_at", "desc")
        );
        const querySnapshot = await getDocs(q);
        const loadedSignatures: Signature[] = [];
        querySnapshot.forEach((doc) => {
          loadedSignatures.push({ id: doc.id, ...doc.data() } as Signature);
        });
        setSignatures(loadedSignatures);
      } catch (error) {
        console.error("Error fetching signatures: ", error);
      }
    }
    fetchSignatures();
  }, []);

  useEffect(() => {
    if (isOpen && activeTab === "draw") {
      const timer = setTimeout(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeTab]);

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x =
      "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y =
      "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = "#1d1d1f";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x =
      "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y =
      "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const generateTypedSignatureDataUrl = (text: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 340;
    canvas.height = 120;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#1d1d1f";
      ctx.font = "italic 32px serif";
      ctx.fillText(text || "Anonymous", 20, 70);
    }
    return canvas.toDataURL("image/png");
  };

  const handleSubmit = async () => {
    let dataUrl = "";
    if (activeTab === "draw") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      dataUrl = canvas.toDataURL("image/png");
    } else {
      dataUrl = generateTypedSignatureDataUrl(typedText);
    }

    const newEntry = {
      name: name || "Anonymous",
      dataUrl,
      created_at: new Date().toISOString(),
    };

    try {
      const docRef = await addDoc(collection(db, "guestbook"), newEntry);
      setSignatures([{ id: docRef.id, ...newEntry }, ...signatures]);
      setIsOpen(false);
      setName("");
      setTypedText("");
      if (activeTab === "draw") clearCanvas();
    } catch (error) {
      console.error("Error saving signature: ", error);
    }
  };

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          borderRadius: "24px",
          padding: "28px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#1d1d1f",
                margin: 0,
              }}
              className={googleSans.className}
            >
              Visitor Guestbook
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#666666",
                margin: "4px 0 0 0",
              }}
              className={googleSans.className}
            >
              Add your note and signature before you leave!
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: "#333333" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(true)}
            style={{
              padding: "10px 20px",
              borderRadius: "99px",
              backgroundColor: "#1d1d1f",
              color: "#fff",
              fontWeight: 500,
              fontSize: "14px",
              border: "none",
              cursor: "pointer",
            }}
            className={googleSans.className}
          >
            Sign Guestbook
          </motion.button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "15px",
          }}
        >
          {signatures.map((sig) => (
            <div
              key={sig.id}
              style={{
                padding: "12px",
                borderRadius: "14px",
                background: "#ffffff",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
              }}
            >
              <div
                style={{
                  background: "#fafafa",
                  borderRadius: "8px",
                  padding: "4px",
                  border: "1px dashed #eee",
                }}
              >
                <img
                  src={sig.dataUrl}
                  alt={`${sig.name}'s signature`}
                  style={{
                    width: "100%",
                    height: "45px",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  marginTop: "8px",
                  color: "#333333",
                }}
                className={googleSans.className}
              >
                {sig.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
              cursor: "default",
            }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              style={{
                background: "#ffffff",
                color: "#1d1d1f",
                padding: "24px",
                borderRadius: "24px",
                width: "420px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                cursor: "default",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "4px",
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#1d1d1f",
                  }}
                  className={googleSans.className}
                >
                  sign the guestbook
                </h4>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "16px",
                    cursor: "pointer",
                    color: "#888",
                  }}
                >
                  ✕
                </button>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#71717a",
                  marginBottom: "16px",
                }}
                className={googleSans.className}
              >
                Add your name, then draw or type a signature.
              </p>

              <input
                type="text"
                placeholder="your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid #e4e4e7",
                  background: "#ffffff",
                  color: "#1d1d1f",
                  marginBottom: "16px",
                  fontSize: "13px",
                  outline: "none",
                  cursor: "text",
                }}
                className={googleSans.className}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#a1a1aa",
                    letterSpacing: "0.5px",
                  }}
                  className={googleSans.className}
                >
                  SIGNATURE
                </span>
                <button
                  onClick={
                    activeTab === "draw" ? clearCanvas : () => setTypedText("")
                  }
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "12px",
                    color: "#71717a",
                    cursor: "pointer",
                  }}
                  className={googleSans.className}
                >
                  clear
                </button>
              </div>

              <div
                style={{
                  display: "flex",
                  background: "#f4f4f5",
                  padding: "3px",
                  borderRadius: "10px",
                  marginBottom: "12px",
                  gap: "4px",
                }}
              >
                <button
                  onClick={() => setActiveTab("draw")}
                  style={{
                    flex: 1,
                    padding: "6px",
                    borderRadius: "8px",
                    border: "none",
                    background:
                      activeTab === "draw" ? "#ffffff" : "transparent",
                    color: activeTab === "draw" ? "#1d1d1f" : "#71717a",
                    fontSize: "12px",
                    fontWeight: 500,
                    cursor: "pointer",
                    boxShadow:
                      activeTab === "draw"
                        ? "0 2px 4px rgba(0,0,0,0.05)"
                        : "none",
                  }}
                  className={googleSans.className}
                >
                  ✏️ draw
                </button>
                <button
                  onClick={() => setActiveTab("type")}
                  style={{
                    flex: 1,
                    padding: "6px",
                    borderRadius: "8px",
                    border: "none",
                    background:
                      activeTab === "type" ? "#ffffff" : "transparent",
                    color: activeTab === "type" ? "#1d1d1f" : "#71717a",
                    fontSize: "12px",
                    fontWeight: 500,
                    cursor: "pointer",
                    boxShadow:
                      activeTab === "type"
                        ? "0 2px 4px rgba(0,0,0,0.05)"
                        : "none",
                  }}
                  className={googleSans.className}
                >
                  ⌨️ type
                </button>
              </div>

              {activeTab === "draw" ? (
                <div
                  style={{
                    border: "1px dashed #d4d4d8",
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginBottom: "20px",
                    background: "#fafafa",
                  }}
                >
                  <canvas
                    ref={canvasRef}
                    width={360}
                    height={120}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    style={{
                      cursor: "crosshair",
                      display: "block",
                      margin: "0 auto",
                      touchAction: "none",
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    border: "1px dashed #d4d4d8",
                    borderRadius: "12px",
                    padding: "20px",
                    marginBottom: "20px",
                    background: "#fafafa",
                    textAlign: "center",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Type your signature..."
                    value={typedText}
                    onChange={(e) => setTypedText(e.target.value)}
                    style={{
                      width: "100%",
                      border: "none",
                      background: "transparent",
                      textAlign: "center",
                      fontFamily: "serif",
                      fontStyle: "italic",
                      fontSize: "28px",
                      outline: "none",
                      color: "#1d1d1f",
                      cursor: "text",
                    }}
                  />
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                }}
              >
                <motion.button
                  whileHover={{ backgroundColor: "#f4f4f5" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: "8px 16px",
                    background: "transparent",
                    color: "#52525b",
                    border: "1px solid #e4e4e7",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                  className={googleSans.className}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "#27272a" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  style={{
                    padding: "8px 18px",
                    background: "#18181b",
                    color: "#ffffff",
                    fontWeight: 500,
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                  className={googleSans.className}
                >
                  Done
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
