"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen] = useState(false);

  return (
    <header
      style={{
        backgroundColor: "white",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          padding: "2rem 2rem",
        }}
      >
        <div className="flex flex-row justify-between items-center h-4">
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "left",
                gap: "1rem",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "15rem",
                  height: "5rem",
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.2s ease",
                }}
              >
                <img
                  src="/IMG_6304.jpeg"
                  alt="UTSC Maroons Logo"
                  style={{
                    width: "20rem",
                    height: "20rem",
                    objectFit: "cover",
                    objectPosition: "center center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) scale(1.5)",
                  }}
                />
              </div>
            </div>
          </Link>

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
          </nav>

          {/* Mobile menu button */}
          {/* <button
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
          </button> */}
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
