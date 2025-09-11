"use client";

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function Navigation() {
  const [activeSport, setActiveSport] = useState("");

  const sports = [
    {
      category: "Men's Sports",
      teams: [
        { name: "Men's Basketball", href: "/sports/mens-basketball" },
        { name: "Men's Soccer", href: "/sports/mens-soccer" },
        { name: "Men's Volleyball", href: "/sports/mens-volleyball" },
        { name: "Men's Rugby", href: "/sports/mens-rugby" },
        { name: "Men's Baseball", href: "/sports/mens-baseball" },
      ],
    },
    {
      category: "Women's Sports",
      teams: [
        { name: "Women's Basketball", href: "/sports/womens-basketball" },
        { name: "Women's Soccer", href: "/sports/womens-soccer" },
        { name: "Women's Volleyball", href: "/sports/womens-volleyball" },
        { name: "Women's Rugby", href: "/sports/womens-rugby" },
        { name: "Women's Softball", href: "/sports/womens-softball" },
      ],
    },
    {
      category: "Other Sports",
      teams: [
        { name: "Golf", href: "/sports/golf" },
        { name: "Curling", href: "/sports/curling" },
        { name: "Esports", href: "/sports/esports" },
      ],
    },
  ];

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
              {sports.map((sportGroup) => (
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
                      {sportGroup.teams.map((team) => (
                        <NavigationMenuLink key={team.name} asChild>
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
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
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
