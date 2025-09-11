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
        // Fallback to static data if API fails
        setRecentGames([
          {
            id: 1,
            home_team: "Unbenched Lords",
            away_team: "Rival College",
            home_score: 85,
            away_score: 72,
            sport: "Basketball",
            date: "2024-12-15",
            status: "final",
            created_at: "2024-12-15T00:00:00Z",
            updated_at: "2024-12-15T00:00:00Z",
          },
          {
            id: 2,
            home_team: "Unbenched Lords",
            away_team: "State University",
            home_score: 2,
            away_score: 1,
            sport: "Soccer",
            date: "2024-12-12",
            status: "final",
            created_at: "2024-12-12T00:00:00Z",
            updated_at: "2024-12-12T00:00:00Z",
          },
          {
            id: 3,
            home_team: "Unbenched Lords",
            away_team: "City College",
            home_score: 3,
            away_score: 0,
            sport: "Volleyball",
            date: "2024-12-10",
            status: "final",
            created_at: "2024-12-10T00:00:00Z",
            updated_at: "2024-12-10T00:00:00Z",
          },
        ]);
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
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
                  <span style={{ fontWeight: "600" }}>{game.home_team}</span>
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
                  <span style={{ fontWeight: "600" }}>{game.away_team}</span>
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
      </CardContent>
    </Card>
  );
}
