"use client";

import React, { useState } from "react";
import { Google_Sans_Flex } from "next/font/google";
import Image from "next/image";
import ClientPortal from "@/app/components/portal";
import LinkPreview from "@/app/components/preview";
import Link from "next/link";

const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
});

export default function BentoProjects() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <section
        style={{
          width: "100%",
          maxWidth: "1100px",
          margin: "50px auto",
          padding: "0 20px",
          fontFamily: "var(--font-geist-sans, system-ui, sans-serif)",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "26px",
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Featured Work
          </h3>
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-secondary, #666)",
              margin: "6px 0 0 0",
            }}
          >
            AI powered apps, machine learning models, and community mobile apps.
          </p>
        </div>

        <div
          className="bento-grid-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "20px",
          }}
        >
          <div
            onClick={() =>
              window.open("https://github.com/smaranps/EchoNotes", "_blank")
            }
            style={{
              gridColumn: "span 5",
              background: "var(--card-bg, rgba(255, 255, 255, 0.75))",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid var(--card-border, rgba(255, 255, 255, 0.6))",
              borderRadius: "28px",
              padding: "36px 36px 0 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow:
                "0 15px 35px rgba(0, 113, 227, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.8)",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="bento-hover-card"
          >
            <LinkPreview imageSrc="https://opengraph.githubassets.com/1/smaranps/echoNotes">
              <div
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "-50px",
                  width: "180px",
                  height: "180px",
                  background:
                    "radial-gradient(circle, rgba(0, 122, 255, 0.12) 0%, transparent 70%)",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />

              <div>
                <div style={{ zIndex: 1 }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#007aff",
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                      fontFamily: "var(--font-geist-mono, monospace)",
                    }}
                  >
                    Personal AI Tutor/Helper
                  </span>
                  <h4
                    style={{
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      margin: "10px 0 10px 0",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    EchoNotes
                  </h4>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-secondary, #555)",
                      lineHeight: "1.6",
                      margin: 0,
                    }}
                  >
                    An app that takes long lectures and converts them into
                    simplifies sentences, making it easier to interpret for
                    students with learning disabilities. It also features a
                    question and confusing words simplifier. Built using React
                    Native and Google&apos;s Gemini Flash. Click to view the
                    repository.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "24px",
                    flexWrap: "wrap",
                    zIndex: 1,
                  }}
                >
                  {["React Native", "Gemini Flash", "AI Audio"].map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: "12px",
                        padding: "6px 12px",
                        borderRadius: "10px",
                        background: "rgba(0, 0, 0, 0.04)",
                        color: "var(--text-primary)",
                        fontWeight: 500,
                        fontFamily: "var(--font-geist-mono, monospace)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "170px",
                  background:
                    "linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.06) 100%)",
                  borderRadius: "16px 16px 0 0",
                  marginTop: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
                className="image-preview-box"
              >
                <Image
                  src={"/echo.jpg"}
                  alt="EchoNotes"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </LinkPreview>
          </div>

          <div
            onClick={() =>
              window.open("https://github.com/smaranps/ChronoCraft", "_blank")
            }
            style={{
              gridColumn: "span 7",
              background: "var(--card-bg, rgba(255, 255, 255, 0.75))",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid var(--card-border, rgba(255, 255, 255, 0.6))",
              borderRadius: "28px",
              padding: "36px 36px 0 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow:
                "0 15px 35px rgba(0, 113, 227, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.8)",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="bento-hover-card"
          >
            <LinkPreview imageSrc="https://opengraph.githubassets.com/1/smaranps/ChronoCraft">
              <div
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "-50px",
                  width: "180px",
                  height: "180px",
                  background:
                    "radial-gradient(circle, rgba(140, 80, 255, 0.15) 0%, transparent 70%)",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "11px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.8px",
                      padding: "6px 12px",
                      borderRadius: "99px",
                      background: "rgba(140, 80, 255, 0.12)",
                      color: "#7c3aed",
                      fontFamily: "var(--font-geist-mono, monospace)",
                    }}
                  >
                    Swift Student Challenge 2026
                  </div>
                </div>

                <div style={{ marginTop: "36px", zIndex: 1 }}>
                  <h4
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      margin: "0 0 10px 0",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    ChronoCraft
                  </h4>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "var(--text-secondary, #555)",
                      lineHeight: "1.65",
                      margin: 0,
                    }}
                  >
                    An interactive World Builder allowing users to understand
                    the cause and effect relationship of historical decisions.
                    Created using SwiftUI as my submission for the Swift Student
                    Challenge 2026. Click the card to view the repository.
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "24px",
                    flexWrap: "wrap",
                    zIndex: 1,
                  }}
                >
                  {["SwiftUI", "iOS", "Interactive Simulation"].map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: "12px",
                        padding: "6px 12px",
                        borderRadius: "10px",
                        background: "rgba(0, 0, 0, 0.04)",
                        color: "var(--text-primary)",
                        fontWeight: 500,
                        fontFamily: "var(--font-geist-mono, monospace)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "170px",
                  background:
                    "linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.06) 100%)",
                  borderRadius: "16px 16px 0 0",
                  marginTop: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}
                className="image-preview-box"
              >
                <Image
                  src={"/ChronoCraft.png"}
                  alt="ChronoCraft"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </LinkPreview>
          </div>

          <div
            onClick={handleCardClick}
            style={{
              gridColumn: "span 7",
              background: "var(--card-bg, rgba(255, 255, 255, 0.75))",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid var(--card-border, rgba(255, 255, 255, 0.6))",
              borderRadius: "28px",
              padding: "36px 36px 0 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow:
                "0 15px 35px rgba(0, 113, 227, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.8)",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="bento-hover-card"
          >
            <div
              style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "180px",
                height: "180px",
                background:
                  "radial-gradient(circle, rgba(18, 181, 59, 0.15) 0%, transparent 70%)",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "11px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    padding: "6px 12px",
                    borderRadius: "99px",
                    background: "rgba(18, 181, 59, 0.12)",
                    color: "#12b53b",
                    fontFamily: "var(--font-geist-mono, monospace)",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "red",
                      boxShadow: "0 0 8px #12b53b",
                    }}
                    className="live-pulse-dot"
                  />
                  Real Time Data Processor
                </div>
              </div>

              <div style={{ marginTop: "36px", zIndex: 1 }}>
                <h4
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    margin: "0 0 10px 0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Probable.ai
                </h4>
                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--text-secondary, #555)",
                    lineHeight: "1.65",
                    margin: 0,
                  }}
                >
                  An intelligent platform built for Canadian students, using
                  real-time data to deliver accurate academic pathways and
                  insights, helping students have a clear plan to get accepted
                  into their top university.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "24px",
                  flexWrap: "wrap",
                  zIndex: 1,
                }}
              >
                {[
                  "Next.js",
                  "Firebase",
                  "Python",
                  "Gemini AI",
                  "Live Historical Data",
                ].map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: "12px",
                      padding: "6px 12px",
                      borderRadius: "10px",
                      background: "rgba(0, 0, 0, 0.04)",
                      color: "var(--text-primary)",
                      fontWeight: 500,
                      fontFamily: "var(--font-geist-mono, monospace)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                width: "100%",
                height: "170px",
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.06) 100%)",
                borderRadius: "16px 16px 0 0",
                marginTop: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderTop: "1px solid rgba(0,0,0,0.06)",
                overflow: "hidden",
              }}
              className="image-preview-box"
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary, #888)",
                  fontWeight: 500,
                  fontFamily: "var(--font-geist-mono, monospace)",
                }}
              >
                Click to launch Preview
              </span>
            </div>
          </div>

          <div
            onClick={handleCardClick}
            style={{
              gridColumn: "span 5",
              background: "var(--card-bg, rgba(255, 255, 255, 0.75))",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid var(--card-border, rgba(255, 255, 255, 0.6))",
              borderRadius: "28px",
              padding: "36px 36px 0 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow:
                "0 15px 35px rgba(0, 113, 227, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.8)",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="bento-hover-card"
          >
            <div
              style={{
                position: "absolute",
                top: "-50px",
                right: "-50px",
                width: "180px",
                height: "180px",
                background:
                  "radial-gradient(circle, rgba(0, 122, 255, 0.12) 0%, transparent 70%)",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />

            <div>
              <div style={{ zIndex: 1 }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#007aff",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    fontFamily: "var(--font-geist-mono, monospace)",
                  }}
                >
                  React Native Android App
                </span>
                <h4
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    margin: "10px 0 10px 0",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Community Platform
                </h4>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-secondary, #555)",
                    lineHeight: "1.6",
                    margin: 0,
                  }}
                >
                  Designed to help bring communities together. A robust platform
                  allowing users to create groups, share resources, and connect
                  seamlessly.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "24px",
                  flexWrap: "wrap",
                  zIndex: 1,
                }}
              >
                {["Expo", "Android", "React Native", "Firebase", "BETA"].map(
                  (tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: "12px",
                        padding: "6px 12px",
                        borderRadius: "10px",
                        background: "rgba(0, 0, 0, 0.04)",
                        color: "var(--text-primary)",
                        fontWeight: 500,
                        fontFamily: "var(--font-geist-mono, monospace)",
                      }}
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            <div
              style={{
                width: "100%",
                height: "170px",
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.06) 100%)",
                borderRadius: "16px 16px 0 0",
                marginTop: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderTop: "1px solid rgba(0,0,0,0.06)",
                overflow: "hidden",
              }}
              className="image-preview-box"
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--text-secondary, #888)",
                  fontWeight: 500,
                  fontFamily: "var(--font-geist-mono, monospace)",
                }}
              >
                Click to launch Preview
              </span>
            </div>
          </div>
        </div>
      </section>
      <ClientPortal>
        {isModalOpen && (
          <div
            onClick={closeModal}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2147483647,
              padding: "20px",
              cursor: "default",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "var(--card-bg, rgba(255, 255, 255, 0.85))",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                border:
                  "1px solid var(--card-border, rgba(255, 255, 255, 0.4))",
                borderRadius: "28px",
                padding: "36px 32px",
                width: "100%",
                maxWidth: "400px",
                textAlign: "center",
                boxShadow:
                  "0 30px 60px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
                animation: "popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background: "rgba(0, 122, 255, 0.12)",
                  color: "#007aff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px auto",
                  boxShadow: "inset 0 0 10px rgba(0, 122, 255, 0.15)",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>

              <h4
                style={{
                  fontSize: "21px",
                  fontWeight: 700,
                  color: "var(--text-primary, #1d1d1f)",
                  margin: "0 0 10px 0",
                }}
                className={googleSans.className}
              >
                Under Development
              </h4>

              <p
                style={{
                  fontSize: "14.5px",
                  color: "var(--text-primary, #48484a)",
                  opacity: 0.85,
                  lineHeight: "1.6",
                  margin: "0 0 28px 0",
                }}
                className={googleSans.className}
              >
                Sorry! This app is still under development. More information
                will be revealed soon.
              </p>

              <button
                onClick={closeModal}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  background: "var(--text-primary, #111)",
                  color: "var(--bg-primary, #fff)",
                  border: "none",
                  borderRadius: "99px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
                  transition: "transform 0.2s ease, opacity 0.2s ease",
                }}
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "scale(0.97)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </ClientPortal>

      <style jsx>{`
        .bento-hover-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 113, 227, 0.09),
            inset 0 1px 1px rgba(255, 255, 255, 0.9);
        }
        .image-preview-box:hover {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.05) 0%,
            rgba(0, 0, 0, 0.09) 100%
          ) !important;
        }
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @media screen and (max-width: 768px) {
          .bento-grid-container {
            grid-template-columns: 1fr !important;
          }
          .bento-grid-container > div {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </>
  );
}
