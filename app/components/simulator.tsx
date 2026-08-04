"use client";

import React, { useState } from "react";

interface RegionData {
  name: string;
  location: string;
  baseLatency: number;
  edgeServer: string;
  cacheHitRatio: string;
}

const REGIONS: Record<string, RegionData> = {
  useast: {
    name: "US East (N. Virginia)",
    location: "iad1",
    baseLatency: 18,
    edgeServer: "iad-edge-01.vercel.net",
    cacheHitRatio: "98.4%",
  },
  euwest: {
    name: "Europe (Frankfurt)",
    location: "fra1",
    baseLatency: 84,
    edgeServer: "fra-edge-04.vercel.net",
    cacheHitRatio: "94.1%",
  },
  asiapac: {
    name: "Asia Pacific (Tokyo)",
    location: "tyo1",
    baseLatency: 142,
    edgeServer: "tyo-edge-02.vercel.net",
    cacheHitRatio: "91.8%",
  },
};

export default function LatencySimulator() {
  const [selectedRegion, setSelectedRegion] =
    useState<keyof typeof REGIONS>("useast");
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [pings, setPings] = useState<number[] | null>(null);

  const region = REGIONS[selectedRegion];

  const handleTest = () => {
    setIsTesting(true);
    setPings(null);

    setTimeout(() => {
      const base = region.baseLatency;
      const results = [
        base + Math.floor(Math.random() * 4) - 2,
        base + Math.floor(Math.random() * 6) - 3,
        base + Math.floor(Math.random() * 4) - 2,
      ];
      setPings(results);
      setIsTesting(false);
    }, 600);
  };

  const avgLatency = pings
    ? Math.round(pings.reduce((a, b) => a + b, 0) / pings.length)
    : null;

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
            Latency Simulator
          </h3>
          <p
            className="api-subtitle"
            style={{
              fontFamily: "var(--font-geist-mono), monospace, system-ui",
            }}
          >
            Test simulated edge response times across CDN PoPs
          </p>
        </div>
      </div>

      <div className="request-bar">
        <span
          className="params-label"
          style={{
            paddingLeft: "0.5rem",
            fontFamily: "var(--font-geist-mono), monospace, system-ui",
          }}
        >
          Region:
        </span>
        <select
          value={selectedRegion}
          onChange={(e) => {
            setSelectedRegion(e.target.value as keyof typeof REGIONS);
            setPings(null);
          }}
          style={{
            flex: 1,
            borderRadius: "0.375rem",
            border: "1px solid #cbd5e1",
            backgroundColor: "#ffffff",
            color: "#0f172a",
            fontSize: "0.75rem",
            fontFamily: "var(--font-geist-mono), monospace, system-ui",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {Object.keys(REGIONS).map((key) => (
            <option key={key} value={key}>
              {REGIONS[key].name} ({REGIONS[key].location})
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleTest}
        disabled={isTesting}
        className="rate-limit-btn active"
        style={{
          backgroundColor: isTesting ? "#334155" : "#2563eb",
          borderColor: "#2563eb",
          color: "#ffffff",
          marginBottom: "1rem",
        }}
      >
        {isTesting ? "Testing..." : "Test Connection"}
      </button>

      <div className="code-box" style={{ padding: "1rem" }}>
        <div
          className="code-box-header"
          style={{ margin: "-1rem -1rem 1rem -1rem" }}
        >
          <div className="status-indicator">
            <span
              className={`dot ${pings ? "success" : ""}`}
              style={{ backgroundColor: pings ? "#10b981" : "#64748b" }}
            />
            <span>
              {pings ? "Ping Completed (3 Requests)" : "Ready for Benchmark"}
            </span>
          </div>
          <span style={{ fontFamily: "monospace", color: "#94a3b8" }}>
            {region.edgeServer}
          </span>
        </div>

        {pings ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              fontSize: "0.75rem",
            }}
          >
            <div>
              <p
                className="param-control-label"
                style={{ margin: "0 0 0.25rem 0" }}
              >
                Avg TTFB Latency
              </p>
              <h4
                style={{
                  margin: 0,
                  fontSize: "1.25rem",
                  color: "#34d399",
                  fontFamily: "monospace",
                }}
              >
                {avgLatency} ms
              </h4>
            </div>

            <div>
              <p
                className="param-control-label"
                style={{ margin: "0 0 0.25rem 0" }}
              >
                CDN Edge Cache Hit Ratio
              </p>
              <h4
                style={{
                  margin: 0,
                  fontSize: "1.25rem",
                  color: "#60a5fa",
                  fontFamily: "monospace",
                }}
              >
                {region.cacheHitRatio}
              </h4>
            </div>

            <div
              style={{
                gridColumn: "span 2",
                marginTop: "0.5rem",
                borderTop: "1px solid #1e293b",
                paddingTop: "0.5rem",
              }}
            >
              <p
                className="param-control-label"
                style={{ margin: "0 0 0.25rem 0" }}
              >
                Individual Packet Hops:
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  fontFamily: "monospace",
                  color: "#cbd5e1",
                }}
              >
                {pings.map((p, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "0.125rem 0.375rem",
                      backgroundColor: "#1e293b",
                      borderRadius: "0.25rem",
                    }}
                  >
                    Hop {i + 1}: {p}ms
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p
            style={{
              fontSize: "0.75rem",
              color: "#94a3b8",
              margin: 0,
              padding: "1rem 0",
              textAlign: "center",
            }}
          >
            Select a region and click <strong>"Test Connection"</strong> to
            simulate network latency benchmarks.
          </p>
        )}
      </div>
    </div>
  );
}
