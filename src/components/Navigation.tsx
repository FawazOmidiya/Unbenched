"use client";

import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabase";

interface SportGroup {
  category: string;
  teams: { name: string; href: string; slug: string }[];
}

export default function Navigation() {
  const [sports, setSports] = useState<SportGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const supabase = createSupabaseClient();
        const { data: sportsData, error } = await supabase
          .from("sports")
          .select("*")
          .order("name", { ascending: true });

        if (error) {
          console.error("Failed to fetch sports:", error);
          return;
        }

        // Group sports by category - always show all three categories
        const groupedSports: SportGroup[] = [
          {
            category: "Men's Sports",
            teams: sportsData
              .filter((sport) => sport.category === "mens")
              .map((sport) => ({
                name: sport.name,
                href: `/sports/${sport.slug}`,
                slug: sport.slug,
              })),
          },
          {
            category: "Women's Sports",
            teams: sportsData
              .filter((sport) => sport.category === "womens")
              .map((sport) => ({
                name: sport.name,
                href: `/sports/${sport.slug}`,
                slug: sport.slug,
              })),
          },
          {
            category: "Other Sports",
            teams: sportsData
              .filter((sport) => sport.category === "other")
              .map((sport) => ({
                name: sport.name,
                href: `/sports/${sport.slug}`,
                slug: sport.slug,
              })),
          },
        ];

        setSports(groupedSports);
      } catch (error) {
        console.error("Failed to fetch sports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, []);

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 1000,
          background: "#8b0000",
          color: "white",
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.75rem",
          cursor: "pointer",
          boxShadow: "0 4px 12px -2px rgba(0, 0, 0, 0.25)",
        }}
        className="md:hidden"
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

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1001,
          }}
          className="md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: isSidebarOpen ? "0" : "-320px",
          width: "320px",
          height: "100vh",
          backgroundColor: "#8b0000",
          color: "white",
          zIndex: 1002,
          transition: "left 0.3s ease",
          overflowY: "auto",
        }}
        className="md:hidden"
      >
        {/* Sidebar Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Navigation</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "0.25rem",
            }}
          >
            ×
          </button>
        </div>

        {/* Sidebar Content */}
        <div style={{ padding: "1.5rem" }}>
          {/* Sports Section */}
          <div style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              Sports
            </h3>
            {loading ? (
              <div
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.875rem",
                  padding: "0.5rem 0",
                }}
              >
                Loading sports...
              </div>
            ) : (
              sports.map((sportGroup) => (
                <div key={sportGroup.category} style={{ marginBottom: "1rem" }}>
                  <div
                    onClick={() => toggleCategory(sportGroup.category)}
                    style={{
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                      padding: "0.75rem 1rem",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    className="hover:bg-white hover:bg-opacity-20"
                  >
                    <span>{sportGroup.category}</span>
                    <span style={{ fontSize: "0.875rem" }}>
                      {openCategories.has(sportGroup.category) ? "−" : "+"}
                    </span>
                  </div>
                  {openCategories.has(sportGroup.category) && (
                    <>
                      {sportGroup.teams.length > 0 ? (
                        <div
                          style={{
                            paddingLeft: "1rem",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {sportGroup.teams.map((team) => (
                            <Link
                              key={team.slug}
                              href={team.href}
                              style={{
                                display: "block",
                                padding: "0.5rem 1rem",
                                color: "rgba(255,255,255,0.8)",
                                textDecoration: "none",
                                fontSize: "0.875rem",
                                borderRadius: "0.25rem",
                                marginBottom: "0.25rem",
                                transition: "background-color 0.2s",
                              }}
                              className="hover:bg-white hover:bg-opacity-10"
                              onClick={() => setIsSidebarOpen(false)}
                            >
                              {team.name}
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div
                          style={{
                            paddingLeft: "1rem",
                            color: "rgba(255,255,255,0.5)",
                            fontSize: "0.75rem",
                            fontStyle: "italic",
                            padding: "0.5rem 1rem",
                          }}
                        >
                          No sports available
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Additional Navigation Items */}
          <div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              More
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              <Link
                href="#"
                style={{
                  display: "block",
                  padding: "0.75rem 1rem",
                  color: "rgba(255,255,255,0.9)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  borderRadius: "0.375rem",
                  transition: "background-color 0.2s",
                }}
                className="hover:bg-white hover:bg-opacity-10"
                onClick={() => setIsSidebarOpen(false)}
              >
                Awards
              </Link>
              <Link
                href="#"
                style={{
                  display: "block",
                  padding: "0.75rem 1rem",
                  color: "rgba(255,255,255,0.9)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  borderRadius: "0.375rem",
                  transition: "background-color 0.2s",
                }}
                className="hover:bg-white hover:bg-opacity-10"
                onClick={() => setIsSidebarOpen(false)}
              >
                History
              </Link>
              <Link
                href="#"
                style={{
                  display: "block",
                  padding: "0.75rem 1rem",
                  color: "rgba(255,255,255,0.9)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  borderRadius: "0.375rem",
                  transition: "background-color 0.2s",
                }}
                className="hover:bg-white hover:bg-opacity-10"
                onClick={() => setIsSidebarOpen(false)}
              >
                Hall of Fame
              </Link>
              <Link
                href="#"
                style={{
                  display: "block",
                  padding: "0.75rem 1rem",
                  color: "rgba(255,255,255,0.9)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  borderRadius: "0.375rem",
                  transition: "background-color 0.2s",
                }}
                className="hover:bg-white hover:bg-opacity-10"
                onClick={() => setIsSidebarOpen(false)}
              >
                News
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav
        style={{ backgroundColor: "#8b0000", color: "white" }}
        className="hidden md:block"
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <NavigationMenu viewport={false}>
              <NavigationMenuList style={{ gap: "0" }}>
                {loading ? (
                  <>
                    <NavigationMenuItem>
                      <div
                        style={{
                          padding: "0.75rem 1rem",
                          color: "white",
                          fontSize: "1rem",
                          fontWeight: "500",
                        }}
                      >
                        Men&apos;s Sports
                      </div>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <div
                        style={{
                          padding: "0.75rem 1rem",
                          color: "white",
                          fontSize: "1rem",
                          fontWeight: "500",
                        }}
                      >
                        Women&apos;s Sports
                      </div>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <div
                        style={{
                          padding: "0.75rem 1rem",
                          color: "white",
                          fontSize: "1rem",
                          fontWeight: "500",
                        }}
                      >
                        Other Sports
                      </div>
                    </NavigationMenuItem>
                  </>
                ) : (
                  sports.map((sportGroup) => (
                    <NavigationMenuItem key={sportGroup.category}>
                      <NavigationMenuTrigger
                        style={{
                          backgroundColor: "transparent",
                          color: "white",
                          border: "none",
                          padding: "0.75rem 1rem",
                          fontSize: "1rem",
                          fontWeight: "500",
                        }}
                        className="hover:bg-maroon-800 data-[state=open]:bg-maroon-800"
                      >
                        {sportGroup.category}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        style={{
                          backgroundColor: "white",
                          border: "1px solid #e5e7eb",
                          borderRadius: "0.5rem",
                          padding: "0.5rem",
                          minWidth: "200px",
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          zIndex: 50,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.25rem",
                          }}
                        >
                          {sportGroup.teams.length > 0 ? (
                            sportGroup.teams.map((team) => (
                              <NavigationMenuLink key={team.slug} asChild>
                                <Link
                                  href={team.href}
                                  style={{
                                    display: "block",
                                    padding: "0.5rem 1rem",
                                    color: "#1f2937",
                                    textDecoration: "none",
                                    borderRadius: "0.25rem",
                                    transition: "all 0.2s",
                                  }}
                                  className="hover:bg-gray-100 hover:text-maroon-700"
                                >
                                  {team.name}
                                </Link>
                              </NavigationMenuLink>
                            ))
                          ) : (
                            <div
                              style={{
                                padding: "0.5rem 1rem",
                                color: "#6b7280",
                                fontSize: "0.875rem",
                                fontStyle: "italic",
                              }}
                            >
                              No sports available
                            </div>
                          )}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ))
                )}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Additional Navigation Items */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Link
                href="#"
                style={{
                  padding: "0.75rem 1rem",
                  color: "white",
                  textDecoration: "none",
                  transition: "background-color 0.2s",
                  borderRadius: "0.25rem",
                }}
                className="hover:bg-maroon-800"
              >
                Awards
              </Link>
              <Link
                href="#"
                style={{
                  padding: "0.75rem 1rem",
                  color: "white",
                  textDecoration: "none",
                  transition: "background-color 0.2s",
                  borderRadius: "0.25rem",
                }}
                className="hover:bg-maroon-800"
              >
                History
              </Link>
              <Link
                href="#"
                style={{
                  padding: "0.75rem 1rem",
                  color: "white",
                  textDecoration: "none",
                  transition: "background-color 0.2s",
                  borderRadius: "0.25rem",
                }}
                className="hover:bg-maroon-800"
              >
                Hall of Fame
              </Link>
              <Link
                href="#"
                style={{
                  padding: "0.75rem 1rem",
                  color: "white",
                  textDecoration: "none",
                  transition: "background-color 0.2s",
                  borderRadius: "0.25rem",
                }}
                className="hover:bg-maroon-800"
              >
                News
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
