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
import { Sport, createSupabaseClient } from "@/lib/supabase";

interface SportGroup {
  category: string;
  teams: { name: string; href: string; slug: string }[];
}

export default function Navigation() {
  const [sports, setSports] = useState<SportGroup[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <nav style={{ backgroundColor: "#8b0000", color: "white" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
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
                      Men's Sports
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
                      Women's Sports
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
  );
}
