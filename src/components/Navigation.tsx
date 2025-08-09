"use client";

import { useState } from "react";

export default function Navigation() {
  const [activeSport, setActiveSport] = useState("");

  const sports = [
    {
      category: "Men's Sports",
      teams: [
        { name: "Men's Basketball", href: "#" },
        { name: "Men's Soccer", href: "#" },
        { name: "Men's Volleyball", href: "#" },
        { name: "Men's Rugby", href: "#" },
        { name: "Men's Baseball", href: "#" },
      ],
    },
    {
      category: "Women's Sports",
      teams: [
        { name: "Women's Basketball", href: "#" },
        { name: "Women's Soccer", href: "#" },
        { name: "Women's Volleyball", href: "#" },
        { name: "Women's Rugby", href: "#" },
        { name: "Women's Softball", href: "#" },
      ],
    },
    {
      category: "Other Sports",
      teams: [
        { name: "Golf", href: "#" },
        { name: "Curling", href: "#" },
        { name: "Esports", href: "#" },
      ],
    },
  ];

  return (
    <nav style={{ backgroundColor: "var(--color-maroon-700)", color: "white" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        <div
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
        >
          {sports.map((sportGroup) => (
            <div key={sportGroup.category} style={{ position: "relative" }}>
              <button
                style={{
                  padding: "0.75rem 1rem",
                  transition: "background-color 0.2s",
                  fontWeight: "500",
                }}
                onMouseEnter={() => setActiveSport(sportGroup.category)}
                onMouseLeave={() => setActiveSport("")}
                onClick={() =>
                  setActiveSport(
                    activeSport === sportGroup.category
                      ? ""
                      : sportGroup.category
                  )
                }
              >
                {sportGroup.category}
                <svg
                  style={{
                    display: "inline-block",
                    width: "1rem",
                    height: "1rem",
                    marginLeft: "0.25rem",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "0",
                  backgroundColor: "white",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                  borderRadius: "0.375rem",
                  padding: "0.5rem 0",
                  minWidth: "12rem",
                  zIndex: 50,
                  display:
                    activeSport === sportGroup.category ? "block" : "none",
                }}
              >
                {sportGroup.teams.map((team) => (
                  <a
                    key={team.name}
                    href={team.href}
                    style={{
                      display: "block",
                      padding: "0.5rem 1rem",
                      color: "#1f2937",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLAnchorElement;
                      target.style.backgroundColor = "#f3f4f6";
                      target.style.color = "var(--color-maroon-700)";
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLAnchorElement;
                      target.style.backgroundColor = "transparent";
                      target.style.color = "#1f2937";
                    }}
                  >
                    {team.name}
                  </a>
                ))}
              </div>
            </div>
          ))}

          {/* Additional Navigation Items */}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <a
              href="#"
              style={{
                padding: "0.75rem 1rem",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.backgroundColor = "var(--color-maroon-800)";
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.backgroundColor = "transparent";
              }}
            >
              Awards
            </a>
            <a
              href="#"
              style={{
                padding: "0.75rem 1rem",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.backgroundColor = "var(--color-maroon-800)";
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.backgroundColor = "transparent";
              }}
            >
              History
            </a>
            <a
              href="#"
              style={{
                padding: "0.75rem 1rem",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.backgroundColor = "var(--color-maroon-800)";
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.backgroundColor = "transparent";
              }}
            >
              Hall of Fame
            </a>
            <a
              href="#"
              style={{
                padding: "0.75rem 1rem",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.backgroundColor = "var(--color-maroon-800)";
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.backgroundColor = "transparent";
              }}
            >
              News
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
