"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { Google_Sans_Flex } from "next/font/google";

const googleSans = Google_Sans_Flex({
  subsets: ["latin"],
  display: "swap",
});

interface ContributionDay {
  date: string;
  count: number;
}

interface CommitHeatmapProps {
  username?: string;
}

export default function CommitHeatmap({
  username = "smaranps",
}: CommitHeatmapProps) {
  const [heatmapData, setHeatmapData] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchGitHubData() {
      setLoading(true);

      const daysMap: Record<string, number> = {};
      const today = new Date();

      for (let i = 364; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        daysMap[dateStr] = 0;
      }

      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/events?per_page=100`
        );

        if (response.ok) {
          const events = await response.json();

          events.forEach((event: any) => {
            if (event.created_at) {
              const eventDate = event.created_at.split("T")[0];
              if (daysMap[eventDate] !== undefined) {
                if (event.type === "PushEvent") {
                  const commitCount = event.payload?.commits?.length || 1;
                  daysMap[eventDate] += commitCount;
                } else if (
                  event.type === "CreateEvent" ||
                  event.type === "PullRequestEvent" ||
                  event.type === "IssuesEvent"
                ) {
                  daysMap[eventDate] += 1;
                }
              }
            }
          });
        }
      } catch (error) {
        console.error("Failed to fetch GitHub events:", error);
      } finally {
        const formattedDays: ContributionDay[] = Object.keys(daysMap).map(
          (date) => ({
            date,
            count: daysMap[date],
          })
        );

        setHeatmapData(formattedDays);
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, [username]);

  useEffect(() => {
    if (!loading && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [loading]);

  const monthLabels = useMemo(() => {
    if (heatmapData.length === 0) return [];

    const labels: { name: string; colIndex: number }[] = [];
    let lastMonth = "";

    heatmapData.forEach((day, index) => {
      if (index % 7 === 0) {
        const dateObj = new Date(day.date + "T00:00:00");
        const monthName = dateObj.toLocaleString("default", { month: "short" });

        if (monthName !== lastMonth) {
          labels.push({ name: monthName, colIndex: Math.floor(index / 7) });
          lastMonth = monthName;
        }
      }
    });

    return labels;
  }, [heatmapData]);

  const getLevelOpacity = (count: number) => {
    if (count === 0) return 0;
    if (count <= 2) return 0.4;
    if (count <= 4) return 0.65;
    if (count <= 6) return 0.85;
    return 1;
  };

  const totalCommits = useMemo(() => {
    return heatmapData.reduce((acc, curr) => acc + curr.count, 0);
  }, [heatmapData]);

  const formatDateLabel = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className="glass-card heatmap-card"
      style={{ fontFamily: googleSans.style.fontFamily }}
    >
      <div className="heatmap-header">
        <div>
          <h3 className="heatmap-title">Contribution Graph</h3>
          <p className="heatmap-subtitle">
            {loading
              ? "Fetching live data from GitHub..."
              : `${totalCommits} contributions/commits in recent activity`}
          </p>
        </div>

        <div className="heatmap-legend">
          <span>Less</span>
          {[0, 2, 4, 6, 8].map((count) => (
            <div
              key={count}
              className="heatmap-cell legend-cell"
              style={{
                backgroundColor:
                  count === 0
                    ? undefined
                    : `rgba(var(--accent-rgb), ${getLevelOpacity(count)})`,
              }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="heatmap-container-outer">
        <div className="heatmap-days-column">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        <div className="heatmap-grid-container no-scrollbar" ref={scrollRef}>
          <div className="heatmap-months-row">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                className="heatmap-month-label"
                style={{ gridColumnStart: m.colIndex + 1 }}
              >
                {m.name}
              </span>
            ))}
          </div>

          <div className="heatmap-grid">
            {heatmapData.map((day) => {
              const opacity = getLevelOpacity(day.count);
              const isZero = day.count === 0;

              return (
                <div
                  key={day.date}
                  className="heatmap-cell"
                  style={{
                    backgroundColor: isZero
                      ? undefined
                      : `rgba(var(--accent-rgb), ${opacity})`,
                    boxShadow:
                      !isZero && opacity > 0.6
                        ? "0 0 6px rgba(var(--accent-rgb), 0.5)"
                        : "none",
                  }}
                >
                  <span className="heatmap-tooltip">
                    <strong>{day.count} contributions</strong>
                    <br />
                    {formatDateLabel(day.date)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
