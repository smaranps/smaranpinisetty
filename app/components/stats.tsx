"use client";

import React, { useEffect, useState } from "react";
import { FaGithub, FaCodeBranch, FaStar } from "react-icons/fa";
import { Google_Sans_Flex } from "next/font/google";
import { useTheme } from "next-themes";

const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
});

interface RepoData {
  stargazers_count: number;
  forks_count: number;
}

export default function GitHubStats({ username }: { username: string }) {
  const [stats, setStats] = useState({ repos: 0, stars: 0, forks: 0 });
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );
        const repos: RepoData[] = await res.json();

        if (Array.isArray(repos)) {
          const stars = repos.reduce(
            (acc, repo) => acc + (repo.stargazers_count || 0),
            0
          );
          const forks = repos.reduce(
            (acc, repo) => acc + (repo.forks_count || 0),
            0
          );
          setStats({ repos: repos.length, stars, forks });
        }
      } catch (e) {
        console.error("Failed to fetch GitHub stats", e);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [username]);

  const iconColor = isDark ? "#f8fafc" : "#1d1d1f";
  const titleColor = isDark ? "#f8fafc" : "#1d1d1f";
  const countColor = isDark ? "#f8fafc" : "#1d1d1f";
  const labelColor = isDark ? "#94a3b8" : "#666666";

  return (
    <div
      className="glass-card"
      style={{ marginTop: "30px", padding: "20px 30px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "15px",
          fontFamily: googleSans.style.fontFamily,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaGithub
            size={24}
            color={iconColor}
            style={{ transition: "color 0.3s ease" }}
          />
          <span
            style={{
              fontWeight: 600,
              fontSize: "16px",
              color: titleColor,
              transition: "color 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Live GitHub Activity
            <span
              className="live-pulse-dot"
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#ef4444",
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
          </span>
        </div>

        <div style={{ display: "flex", gap: "25px", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                display: "block",
                color: countColor,
                transition: "color 0.3s ease",
              }}
            >
              {loading ? "..." : stats.repos}
            </span>
            <span
              style={{
                fontSize: "12px",
                color: labelColor,
                transition: "color 0.3s ease",
              }}
            >
              Repositories
            </span>
          </div>

          <div style={{ textAlign: "center" }}>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                display: "block",
                color: countColor,
                transition: "color 0.3s ease",
              }}
            >
              {loading ? "..." : stats.stars}
            </span>
            <span
              style={{
                fontSize: "12px",
                color: labelColor,
                display: "flex",
                alignItems: "center",
                gap: "3px",
                transition: "color 0.3s ease",
              }}
            >
              <FaStar size={10} /> Stars
            </span>
          </div>

          <div style={{ textAlign: "center" }}>
            <span
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                display: "block",
                color: countColor,
                transition: "color 0.3s ease",
              }}
            >
              {loading ? "..." : stats.forks}
            </span>
            <span
              style={{
                fontSize: "12px",
                color: labelColor,
                display: "flex",
                alignItems: "center",
                gap: "3px",
                transition: "color 0.3s ease",
              }}
            >
              <FaCodeBranch size={10} /> Forks
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
