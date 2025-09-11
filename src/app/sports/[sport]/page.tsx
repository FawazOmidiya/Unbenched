"use client";

import { useState, useEffect, use } from "react";
import Header from "../../../components/Header";
import Navigation from "../../../components/Navigation";
import Footer from "../../../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sport, Player, createSupabaseClient } from "@/lib/supabase";

export default function SportPage({
  params,
}: {
  params: Promise<{ sport: string }>;
}) {
  const [sport, setSport] = useState<Sport | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  const resolvedParams = use(params);
  const sportName = resolvedParams.sport
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const teamStats = {
    wins: 0,
    losses: 0,
    conference: "University League",
  };

  useEffect(() => {
    const fetchSportData = async () => {
      try {
        const supabase = createSupabaseClient();

        // First, get the sport by slug
        const { data: sportData, error: sportError } = await supabase
          .from("sports")
          .select("*")
          .eq("slug", resolvedParams.sport)
          .single();

        if (sportError) {
          console.error("Failed to fetch sport:", sportError);
          return;
        }

        if (sportData) {
          setSport(sportData);
          console.log(sportData);

          // Then get players for this sport
          const { data: playersData, error: playersError } = await supabase
            .from("players")
            .select("*")
            .eq("sport_id", sportData.id)
            .eq("is_active", true)
            .order("number", { ascending: true });

          console.log(playersData);

          if (playersError) {
            console.error("Failed to fetch players:", playersError);
          } else {
            setPlayers(playersData || []);
          }
        }
      } catch (error) {
        console.error("Failed to fetch sport data:", error);
        // Fallback to sample data
        setPlayers([
          {
            id: 1,
            sport_id: 1,
            name: "John Smith",
            position: "Captain",
            year: "Senior",
            number: Math.floor(Math.random() * 50) + 1,
            is_active: true,
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
          },
          {
            id: 2,
            sport_id: 1,
            name: "Mike Johnson",
            position: "Player",
            year: "Junior",
            number: Math.floor(Math.random() * 50) + 1,
            is_active: true,
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
          },
          {
            id: 3,
            sport_id: 1,
            name: "Chris Davis",
            position: "Player",
            year: "Sophomore",
            number: Math.floor(Math.random() * 50) + 1,
            is_active: true,
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
          },
          {
            id: 4,
            sport_id: 1,
            name: "Alex Wilson",
            position: "Player",
            year: "Senior",
            number: Math.floor(Math.random() * 50) + 1,
            is_active: true,
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
          },
          {
            id: 5,
            sport_id: 1,
            name: "Ryan Brown",
            position: "Player",
            year: "Junior",
            number: Math.floor(Math.random() * 50) + 1,
            is_active: true,
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-01T00:00:00Z",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSportData();
  }, [resolvedParams.sport]);

  const upcomingGames = [
    {
      opponent: "Rival University",
      date: "Dec 18, 2024",
      time: "6:00 PM",
      location: "Home",
    },
    {
      opponent: "State College",
      date: "Dec 21, 2024",
      time: "7:00 PM",
      location: "Away",
    },
    {
      opponent: "Championship Game",
      date: "Jan 5, 2025",
      time: "5:00 PM",
      location: "Neutral",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "white" }}>
      <Header />
      <Navigation />

      <main
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}
      >
        {/* Page Header */}
        <div
          style={{
            background: "linear-gradient(to right, #8b0000, #6b0000)",
            color: "white",
            padding: "3rem 2rem",
            borderRadius: "0.5rem",
            marginBottom: "2rem",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
            }}
          >
            {sportName}
          </h1>
          <p style={{ fontSize: "1.125rem", opacity: 0.9 }}>
            UTSC Maroons {sportName} Team
          </p>
          <div style={{ display: "flex", gap: "2rem", marginTop: "1.5rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {teamStats.wins}
              </div>
              <div style={{ fontSize: "0.875rem", opacity: 0.8 }}>Wins</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {teamStats.losses}
              </div>
              <div style={{ fontSize: "0.875rem", opacity: 0.8 }}>Losses</div>
            </div>
          </div>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}
          className="lg:grid-cols-2"
        >
          {/* Roster */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#8b0000",
                marginBottom: "1.5rem",
              }}
            >
              Current Roster
            </h2>

            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  color: "#6b7280",
                }}
              >
                Loading roster...
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {players
                  .sort((a, b) => (a?.number || 0) - (b?.number || 0))
                  .map((player) => (
                    <div
                      key={player.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "1rem",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.5rem",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{ fontWeight: "600", fontSize: "1.125rem" }}
                        >
                          #{player.number} {player.name}
                        </div>
                        <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                          {player.position} • {player.year}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            gap: "1rem",
                            marginTop: "0.5rem",
                          }}
                        >
                          {player.height && (
                            <span
                              style={{ color: "#6b7280", fontSize: "0.75rem" }}
                            >
                              {player.height}
                            </span>
                          )}
                          {player.weight && (
                            <span
                              style={{ color: "#6b7280", fontSize: "0.75rem" }}
                            >
                              {player.weight}
                            </span>
                          )}
                        </div>
                        {player.major && (
                          <div
                            style={{
                              color: "#6b7280",
                              fontSize: "0.75rem",
                              marginTop: "0.25rem",
                            }}
                          >
                            {player.major}
                          </div>
                        )}
                        {player.hometown && (
                          <div
                            style={{ color: "#6b7280", fontSize: "0.75rem" }}
                          >
                            {player.hometown}
                          </div>
                        )}
                        {player.bio && (
                          <div
                            style={{
                              color: "#6b7280",
                              fontSize: "0.75rem",
                              marginTop: "0.5rem",
                              fontStyle: "italic",
                            }}
                          >
                            {player.bio}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                {players.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "#6b7280",
                    }}
                  >
                    No players found for this team.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Upcoming Games */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              padding: "1.5rem",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#8b0000",
                marginBottom: "1.5rem",
              }}
            >
              Upcoming Games
            </h2>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {upcomingGames.map((game, index) => (
                <div
                  key={index}
                  style={{
                    padding: "1rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "1.125rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    vs {game.opponent}
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                    {game.date} at {game.time}
                  </div>
                  <div
                    style={{
                      color:
                        game.location === "Home"
                          ? "#8b0000"
                          : game.location === "Neutral"
                          ? "#f59e0b"
                          : "#6b7280",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                    }}
                  >
                    {game.location}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn-primary"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Buy Tickets
            </button>
          </div>
        </div>

        {/* Team Information */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            padding: "1.5rem",
            marginTop: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#8b0000",
              marginBottom: "1.5rem",
            }}
          >
            About the Team
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1.5rem",
            }}
            className="md:grid-cols-2"
          >
            <div
              style={{
                padding: "1rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
              }}
            >
              <h3 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
                Season Goals
              </h3>
              <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                The team is focused on making a strong playoff run and competing
                for the conference championship.
              </p>
            </div>
            <div
              style={{
                padding: "1rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
              }}
            >
              <h3 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
                Team Culture
              </h3>
              <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                Built on principles of teamwork, dedication, and excellence both
                on and off the field.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
