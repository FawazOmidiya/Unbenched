"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Game, createSupabaseClient } from "@/lib/supabase";

export default function Scoreboard() {
  const [recentGames, setRecentGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const supabase = createSupabaseClient();
        const { data: gamesData, error } = await supabase
          .from("games")
          .select("*")
          .order("date", { ascending: false })
          .limit(3);

        if (error) {
          console.error("Failed to fetch games:", error);
        } else {
          setRecentGames(gamesData || []);
        }
      } catch (error) {
        console.error("Failed to fetch games:", error);
        setRecentGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle style={{ color: "#8b0000" }}>Scoreboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}
          >
            Loading games...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle style={{ color: "#8b0000" }}>Scoreboard</CardTitle>
      </CardHeader>
      <CardContent>
        {recentGames.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "1.5rem 1rem",
              color: "#6b7280",
              backgroundColor: "#f9fafb",
              borderRadius: "0.5rem",
              border: "2px dashed #d1d5db",
            }}
            className="md:p-8"
          >
            <div
              style={{
                fontSize: "2rem",
                marginBottom: "0.75rem",
                opacity: 0.5,
              }}
              className="md:text-4xl md:mb-4"
            >
              🏆
            </div>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
              className="md:text-lg"
            >
              No Games Scheduled
            </h3>
            <p
              style={{
                fontSize: "0.75rem",
                lineHeight: "1.5",
                maxWidth: "250px",
                margin: "0 auto",
              }}
              className="md:text-sm md:max-w-xs"
            >
              Check back soon for upcoming games and match results!
            </p>
          </div>
        ) : (
          <>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {recentGames.map((game) => (
                <div
                  key={game.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "#6b7280",
                      }}
                    >
                      {game.sport}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                      }}
                    >
                      {game.date
                        ? new Date(game.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : ""}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontWeight: "600" }}>
                        {game.home_team}
                      </span>
                      <span
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: "bold",
                        }}
                      >
                        {game.home_score}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontWeight: "600" }}>
                        {game.away_team}
                      </span>
                      <span
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: "bold",
                        }}
                      >
                        {game.away_score}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "0.75rem",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid #e5e7eb",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        color:
                          game.status === "final"
                            ? "#4CAF50"
                            : game.status === "live"
                            ? "#FF9800"
                            : "#2196F3",
                        textTransform: "capitalize",
                      }}
                    >
                      {game.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <Button variant="secondary" className="w-full">
                View Full Schedule
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
