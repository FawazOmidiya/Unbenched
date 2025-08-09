"use client";

import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      style={{
        backgroundColor: "white",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "4rem",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "3rem",
                height: "3rem",
                backgroundColor: "var(--color-maroon-700)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.125rem",
                }}
              >
                U
              </span>
            </div>
            <div>
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "var(--color-maroon-700)",
                }}
              >
                Unbenched Athletics
              </h1>
              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                The Official Website of the Unbenched Lords
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            style={{ display: "none", alignItems: "center", gap: "2rem" }}
            className="md:flex"
          >
            <a href="#" className="nav-link">
              Schedule
            </a>
            <a href="#" className="nav-link">
              Roster
            </a>
            <a href="#" className="nav-link">
              News
            </a>
            <a href="#" className="nav-link">
              Tickets
            </a>
            <a href="#" className="nav-link">
              Shop
            </a>
            <button className="btn-primary">Donate</button>
          </nav>

          {/* Mobile menu button */}
          <button
            style={{ display: "block", padding: "0.5rem" }}
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              style={{ width: "1.5rem", height: "1.5rem" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            style={{
              display: "block",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              borderTop: "1px solid #e5e7eb",
            }}
            className="md:hidden"
          >
            <nav
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <a href="#" className="nav-link">
                Schedule
              </a>
              <a href="#" className="nav-link">
                Roster
              </a>
              <a href="#" className="nav-link">
                News
              </a>
              <a href="#" className="nav-link">
                Tickets
              </a>
              <a href="#" className="nav-link">
                Shop
              </a>
              <button className="btn-primary" style={{ width: "100%" }}>
                Donate
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
