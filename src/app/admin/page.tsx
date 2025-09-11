"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseClient } from "@/lib/supabase";

export default function AdminDashboard() {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const supabase = createSupabaseClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  const adminSections = [
    {
      title: "Stories",
      description: "Manage news articles and stories",
      href: "/admin/stories",
      icon: "📰",
      count: "12 stories",
    },
    {
      title: "Games & Scores",
      description: "Update game results and schedules",
      href: "/admin/games",
      icon: "🏆",
      count: "8 games",
    },
    {
      title: "Sports Teams",
      description: "Manage sports and team information",
      href: "/admin/sports",
      icon: "⚽",
      count: "13 sports",
    },
    {
      title: "Media Library",
      description: "Upload and manage images and videos",
      href: "/admin/media",
      icon: "📸",
      count: "45 files",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      {/* Admin Header */}
      <div
        style={{
          backgroundColor: "#8b0000",
          color: "white",
          padding: "1rem 0",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
              Admin Dashboard
            </h1>
            {user && (
              <span style={{ fontSize: "0.875rem", opacity: 0.8 }}>
                Welcome, {user.email}
              </span>
            )}
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link
                href="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  color: "white",
                  background: "none",
                  border: "1px solid white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}
      >
        <div style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "0.5rem",
            }}
          >
            Welcome to the Admin Panel
          </h2>
          <p style={{ color: "#6b7280" }}>
            Manage your sports website content, stories, and media from this
            dashboard.
          </p>
        </div>

        {/* Admin Sections Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {adminSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              style={{ textDecoration: "none" }}
            >
              <Card
                style={{
                  cursor: "pointer",
                  transition: "all 0.2s",
                  border: "1px solid #e5e7eb",
                }}
                className="hover:shadow-lg hover:border-maroon-300"
              >
                <CardHeader>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <span style={{ fontSize: "2rem" }}>{section.icon}</span>
                    <div>
                      <CardTitle
                        style={{ color: "#1f2937", marginBottom: "0.25rem" }}
                      >
                        {section.title}
                      </CardTitle>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        {section.count}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p style={{ color: "#6b7280" }}>{section.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div style={{ marginTop: "3rem" }}>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "1rem",
            }}
          >
            Quick Stats
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            <Card>
              <CardContent style={{ padding: "1.5rem" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      backgroundColor: "#8b0000",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.25rem",
                    }}
                  >
                    📰
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                        margin: 0,
                      }}
                    >
                      Total Stories
                    </p>
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#1f2937",
                        margin: 0,
                      }}
                    >
                      12
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent style={{ padding: "1.5rem" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      backgroundColor: "#8b0000",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.25rem",
                    }}
                  >
                    🏆
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                        margin: 0,
                      }}
                    >
                      Upcoming Games
                    </p>
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#1f2937",
                        margin: 0,
                      }}
                    >
                      5
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent style={{ padding: "1.5rem" }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div
                    style={{
                      width: "3rem",
                      height: "3rem",
                      backgroundColor: "#8b0000",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.25rem",
                    }}
                  >
                    📸
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                        margin: 0,
                      }}
                    >
                      Media Files
                    </p>
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#1f2937",
                        margin: 0,
                      }}
                    >
                      45
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
