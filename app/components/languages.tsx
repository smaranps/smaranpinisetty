"use client";

import React, { useEffect, useState } from "react";

interface LanguageBreakdownProps {
  username?: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Swift: "#F05138",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  C: "#555555",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Shell: "#89e051",
};

export default function LanguageBreakdown({
  username = "smaranps",
}: LanguageBreakdownProps) {
  const [languages, setLanguages] = useState<
    { name: string; percentage: number; color: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepoLanguages() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&type=owner`
        );

        if (response.ok) {
          const repos = await response.json();
          const counts: Record<string, number> = {};
          let totalCount = 0;
          repos.forEach((repo: any) => {
            if (!repo.fork && repo.language) {
              counts[repo.language] = (counts[repo.language] || 0) + 1;
              totalCount += 1;
            }
          });

          if (totalCount > 0) {
            const sorted = Object.keys(counts)
              .map((lang) => ({
                name: lang,
                percentage: Math.round((counts[lang] / totalCount) * 100),
                color: LANGUAGE_COLORS[lang] || "#0071e3",
              }))
              .sort((a, b) => b.percentage - a.percentage);

            setLanguages(sorted);
          }
        }
      } catch (error) {
        console.error("Failed to fetch repository languages:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRepoLanguages();
  }, [username]);

  if (loading) {
    return (
      <div className="glass-card lang-card">
        <p className="lang-subtitle">Calculating language breakdown...</p>
      </div>
    );
  }

  if (languages.length === 0) return null;

  return (
    <div
      className="glass-card lang-card"
      style={{ fontFamily: "var(--font-geist-mono, monospace, system-ui)" }}
    >
      <div className="lang-header">
        <h3 className="lang-title">Coding Languages Breakdown</h3>
        <span className="lang-subtitle">Across public repositories</span>
      </div>

      <div className="lang-bar-container">
        {languages.map((lang) => (
          <div
            key={lang.name}
            className="lang-bar-segment"
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: lang.color,
            }}
            title={`${lang.name}: ${lang.percentage}%`}
          />
        ))}
      </div>

      <div className="lang-legend">
        {languages.map((lang) => (
          <div key={lang.name} className="lang-legend-item">
            <span
              className="lang-dot"
              style={{ backgroundColor: lang.color }}
            />
            <span className="lang-name">{lang.name}</span>
            <span className="lang-percent">{lang.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
