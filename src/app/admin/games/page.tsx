"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GamesAdmin() {
  const [games, setGames] = useState([
    {
      id: 1,
      homeTeam: "Unbenched Lords",
      awayTeam: "Rival College",
      homeScore: 85,
      awayScore: 72,
      sport: "Basketball",
      date: "2024-12-15",
      status: "final",
    },
    {
      id: 2,
      homeTeam: "Unbenched Lords",
      awayTeam: "State University",
      homeScore: 2,
      awayScore: 1,
      sport: "Soccer",
      date: "2024-12-12",
      status: "final",
    },
    {
      id: 3,
      homeTeam: "Unbenched Lords",
      awayTeam: "City College",
      homeScore: 0,
      awayScore: 0,
      sport: "Volleyball",
      date: "2024-12-20",
      status: "upcoming",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingGame, setEditingGame] = useState<{
    id: number;
    homeTeam: string;
    awayTeam: string;
    homeScore: number;
    awayScore: number;
    sport: string;
    date: string;
    status: string;
  } | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "final":
        return "#4CAF50";
      case "live":
        return "#FF9800";
      case "upcoming":
        return "#2196F3";
      default:
        return "#6b7280";
    }
  };

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
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Link
                href="/admin"
                style={{ color: "white", textDecoration: "none" }}
              >
                ← Back to Dashboard
              </Link>
              <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                Manage Games
              </h1>
            </div>
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
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}
      >
        {/* Header Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: "bold",
                color: "#1f2937",
                marginBottom: "0.5rem",
              }}
            >
              Games & Scores Management
            </h2>
            <p style={{ color: "#6b7280" }}>
              Manage game schedules, update scores, and track game status.
            </p>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            style={{ backgroundColor: "#8b0000" }}
          >
            + Add New Game
          </Button>
        </div>

        {/* Games List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {games.map((game) => (
            <Card key={game.id}>
              <CardContent style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          color: "#8b0000",
                          backgroundColor: "#fef2f2",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "9999px",
                        }}
                      >
                        {game.sport}
                      </span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: "600",
                          color: "white",
                          backgroundColor: getStatusColor(game.status),
                          padding: "0.25rem 0.5rem",
                          borderRadius: "9999px",
                          textTransform: "capitalize",
                        }}
                      >
                        {game.status}
                      </span>
                      <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        {game.date}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span style={{ fontWeight: "600" }}>
                          {game.homeTeam}
                        </span>
                        <span
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            color: "#8b0000",
                          }}
                        >
                          {game.homeScore}
                        </span>
                      </div>
                      <span style={{ color: "#6b7280" }}>vs</span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <span style={{ fontWeight: "600" }}>
                          {game.awayTeam}
                        </span>
                        <span
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            color: "#8b0000",
                          }}
                        >
                          {game.awayScore}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingGame(game)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (
                          confirm("Are you sure you want to delete this game?")
                        ) {
                          setGames(games.filter((g) => g.id !== game.id));
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add/Edit Game Form Modal */}
        {(showAddForm || editingGame) && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
            }}
          >
            <Card
              style={{
                width: "90%",
                maxWidth: "600px",
                maxHeight: "90vh",
                overflow: "auto",
              }}
            >
              <CardHeader>
                <CardTitle>
                  {editingGame ? "Edit Game" : "Add New Game"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          fontWeight: "600",
                        }}
                      >
                        Home Team
                      </label>
                      <input
                        type="text"
                        defaultValue={editingGame?.homeTeam || ""}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "0.375rem",
                          fontSize: "1rem",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          fontWeight: "600",
                        }}
                      >
                        Away Team
                      </label>
                      <input
                        type="text"
                        defaultValue={editingGame?.awayTeam || ""}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "0.375rem",
                          fontSize: "1rem",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          fontWeight: "600",
                        }}
                      >
                        Home Score
                      </label>
                      <input
                        type="number"
                        defaultValue={editingGame?.homeScore || 0}
                        min="0"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "0.375rem",
                          fontSize: "1rem",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          fontWeight: "600",
                        }}
                      >
                        Away Score
                      </label>
                      <input
                        type="number"
                        defaultValue={editingGame?.awayScore || 0}
                        min="0"
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "0.375rem",
                          fontSize: "1rem",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          fontWeight: "600",
                        }}
                      >
                        Sport
                      </label>
                      <select
                        defaultValue={editingGame?.sport || ""}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "0.375rem",
                          fontSize: "1rem",
                        }}
                      >
                        <option value="">Select Sport</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Soccer">Soccer</option>
                        <option value="Volleyball">Volleyball</option>
                        <option value="Rugby">Rugby</option>
                        <option value="Baseball">Baseball</option>
                        <option value="Softball">Softball</option>
                      </select>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          fontWeight: "600",
                        }}
                      >
                        Date
                      </label>
                      <input
                        type="date"
                        defaultValue={editingGame?.date || ""}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "0.375rem",
                          fontSize: "1rem",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          fontWeight: "600",
                        }}
                      >
                        Status
                      </label>
                      <select
                        defaultValue={editingGame?.status || "upcoming"}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "0.375rem",
                          fontSize: "1rem",
                        }}
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="live">Live</option>
                        <option value="final">Final</option>
                      </select>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingGame(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      style={{ backgroundColor: "#8b0000" }}
                    >
                      {editingGame ? "Update Game" : "Create Game"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
