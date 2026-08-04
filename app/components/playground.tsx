"use client";

import React, { useState } from "react";

interface ProbableParams {
  gpa?: number;
  university?: string;
  program?: string;
}

interface EchoParams {
  simplify?: boolean;
}

interface EndpointConfig {
  name: string;
  method: string;
  url: string;
  defaultParams: Record<string, unknown>;
  getResponse: (params: Record<string, unknown>) => Record<string, unknown>;
}

const UNIVERSITIES = [
  "University of Waterloo",
  "University of Toronto",
  "McMaster University",
  "UBC",
];

const PROGRAMS = [
  "Computer Science",
  "Software Engineering",
  "Health Sciences",
  "Business Administration",
];

const ENDPOINTS: Record<"probable" | "echonotes", EndpointConfig> = {
  probable: {
    name: "Probable.ai — Admissions Engine",
    method: "POST",
    url: "/v1/probable/analyze-profile",
    defaultParams: {
      gpa: 94,
      university: "University of Waterloo",
      program: "Computer Science",
    },
    getResponse: (params: Record<string, unknown>) => {
      const typedParams = params as ProbableParams;
      const gpa = typedParams.gpa ?? 94;
      const uni = typedParams.university || "University of Waterloo";
      const prog = typedParams.program || "Computer Science";

      return {
        status: 200,
        execution_time_ms: 38,
        data: {
          student: "Smaran Pinisetty",
          target_university: uni,
          target_program: prog,
          input_average: `${gpa}%`,
          admission_tier:
            gpa >= 95
              ? "Competitive Match"
              : gpa >= 90
              ? "Target Reach"
              : "High Risk",
          historical_acceptance_rate: uni.includes("Waterloo")
            ? "11.2%"
            : "15.4%",
          confidence_score: 0.94,
          key_differentiators: [
            "SwiftUI / iOS Architecture",
            "Hackathon Awards",
            "Strong Extracurriculars",
          ],
        },
      };
    },
  },
  echonotes: {
    name: "EchoNotes — Lecture Summarizer",
    method: "POST",
    url: "/v1/echonotes/process-audio",
    defaultParams: { simplify: true },
    getResponse: (params: Record<string, unknown>) => {
      const typedParams = params as EchoParams;
      return {
        status: 200,
        execution_time_ms: 62,
        data: {
          audio_duration_sec: 1800,
          summary:
            "Lecture covers binary search tree balances and runtime complexities.",
          simplified_terms: typedParams.simplify
            ? [
                {
                  term: "Time Complexity",
                  definition: "How fast code runs as input grows.",
                },
                {
                  term: "Recursion",
                  definition: "A function calling itself until it stops.",
                },
              ]
            : [],
          ai_model: "Gemini Flash",
        },
      };
    },
  },
};

export default function ApiPlayground() {
  const [activeTab, setActiveTab] =
    useState<keyof typeof ENDPOINTS>("probable");
  const [gpa, setGpa] = useState<number>(94);
  const [university, setUniversity] = useState<string>(
    "University of Waterloo"
  );
  const [program, setProgram] = useState<string>("Computer Science");
  const [simplify, setSimplify] = useState<boolean>(true);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentEndpoint = ENDPOINTS[activeTab];

  const getOutputJson = () => {
    if (isRateLimited) {
      return {
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message: "Quota limit reached. Simulated 429 Error.",
          status: 429,
        },
      };
    }
    return currentEndpoint.getResponse({ gpa, university, program, simplify });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(getOutputJson(), null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="api-playground-container">
      <div className="api-header">
        <div>
          <h3
            className="api-title"
            style={{
              fontFamily: "var(--font-geist-mono), monospace, system-ui",
            }}
          >
            API Playground
          </h3>
          <p
            className="api-subtitle"
            style={{
              fontFamily: "var(--font-geist-mono), monospace, system-ui",
            }}
          >
            Test live payload execution and data schema outputs
          </p>
        </div>

        <div className="api-tabs">
          {(Object.keys(ENDPOINTS) as Array<keyof typeof ENDPOINTS>).map(
            (key) => (
              <button
                key={key}
                onClick={() => {
                  setActiveTab(key);
                  setIsRateLimited(false);
                }}
                className={`tab-btn ${activeTab === key ? "active" : ""}`}
              >
                {key === "probable" ? "Probable.ai" : "EchoNotes"}
              </button>
            )
          )}
        </div>
      </div>

      <div className="request-bar">
        <span className="method-badge">{currentEndpoint.method}</span>
        <span className="url-display">
          https://api.smaran.dev{currentEndpoint.url}
        </span>
        <button
          onClick={() => setIsRateLimited(!isRateLimited)}
          className={`rate-limit-btn ${isRateLimited ? "active" : ""}`}
        >
          {isRateLimited ? "Status: 429 Rate Limit" : "Simulate 429 Error"}
        </button>
      </div>

      {!isRateLimited && (
        <div className="params-bar" style={{ flexWrap: "wrap" }}>
          <span className="params-label">Params:</span>

          {activeTab === "probable" ? (
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <span className="param-control-label">Uni:</span>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                >
                  {UNIVERSITIES.map((uni) => (
                    <option key={uni} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>
              </div>
              <div
                style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <span className="param-control-label">Program:</span>
                <select
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                >
                  {PROGRAMS.map((prog) => (
                    <option key={prog} value={prog}>
                      {prog}
                    </option>
                  ))}
                </select>
              </div>

              <div className="param-control">
                <span>
                  Grade 12 Average:{" "}
                  <strong style={{ color: "#60a5fa" }}>{gpa}%</strong>
                </span>
                <input
                  type="range"
                  min="80"
                  max="99"
                  value={gpa}
                  onChange={(e) => setGpa(Number(e.target.value))}
                />
              </div>
            </div>
          ) : (
            <div
              className="param-control-checkbox"
              onClick={() => setSimplify(!simplify)}
            >
              <input type="checkbox" checked={simplify} onChange={() => {}} />
              <span>Simplify AI Vocabulary Terms</span>
            </div>
          )}
        </div>
      )}

      <div className="code-box">
        <div className="code-box-header">
          <div className="status-indicator">
            <span className={`dot ${isRateLimited ? "error" : "success"}`} />
            <span>
              {isRateLimited
                ? "429 Too Many Requests"
                : "200 OK — Response Body"}
            </span>
          </div>

          <button onClick={handleCopy} className="copy-btn">
            {copied ? "✓ Copied" : "Copy JSON"}
          </button>
        </div>

        <pre className="json-output">
          {JSON.stringify(getOutputJson(), null, 2)}
        </pre>
      </div>
    </div>
  );
}
