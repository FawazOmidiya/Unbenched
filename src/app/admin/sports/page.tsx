"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createSupabaseClient, Player, Sport } from "@/lib/supabase";
import PhotoUpload, { uploadPlayerPhoto } from "@/components/PhotoUpload";

// Type for player form data
interface PlayerFormData {
  name: string;
  number: number | null;
  position: string;
  bio: string;
  height: string;
  weight: string;
  year: string;
  hometown: string;
  major: string;
  photo_url: string;
}

export default function SportsAdmin() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSport, setEditingSport] = useState<Sport | null>(null);
  const [showPlayersModal, setShowPlayersModal] = useState(false);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [showAddPlayerForm, setShowAddPlayerForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Form state for player management
  const [playerFormData, setPlayerFormData] = useState<PlayerFormData>({
    name: "",
    number: null,
    position: "",
    bio: "",
    height: "",
    weight: "",
    year: "",
    hometown: "",
    major: "",
    photo_url: "",
  });

  // Fetch sports from database
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

        setSports(sportsData || []);
      } catch (error) {
        console.error("Failed to fetch sports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "mens":
        return "#3B82F6";
      case "womens":
        return "#EC4899";
      case "other":
        return "#10B981";
      default:
        return "#6b7280";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "mens":
        return "Men's Sports";
      case "womens":
        return "Women's Sports";
      case "other":
        return "Other Sports";
      default:
        return category;
    }
  };

  // Helper functions for form management
  const resetPlayerForm = () => {
    setPlayerFormData({
      name: "",
      number: null,
      position: "",
      bio: "",
      height: "",
      weight: "",
      year: "",
      hometown: "",
      major: "",
      photo_url: "",
    });
    setSelectedFile(null);
  };

  const populatePlayerForm = (player: Player) => {
    setPlayerFormData({
      name: player.name || "",
      number: player.number || null,
      position: player.position || "",
      bio: player.bio || "",
      height: player.height || "",
      weight: player.weight || "",
      year: player.year || "",
      hometown: player.hometown || "",
      major: player.major || "",
      photo_url: player.photo_url || "",
    });
  };

  const updateFormField = (
    field: keyof PlayerFormData,
    value: string | number | null
  ) => {
    setPlayerFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Helper functions for player management
  const openAddPlayerForm = () => {
    resetPlayerForm();
    setShowAddPlayerForm(true);
  };

  const openEditPlayerForm = (player: Player) => {
    populatePlayerForm(player);
    setEditingPlayer(player);
  };

  const closePlayerForms = () => {
    setShowAddPlayerForm(false);
    setEditingPlayer(null);
    resetPlayerForm();
  };

  const handleManagePlayers = async (sport: Sport) => {
    setSelectedSport(sport);
    setShowPlayersModal(true);

    try {
      const supabase = createSupabaseClient();

      const { data: playersData, error } = await supabase
        .from("players")
        .select("*")
        .eq("sport_id", sport.id)
        .order("number", { ascending: true });

      if (error) {
        console.error("Failed to fetch players:", error);
      } else {
        setPlayers(playersData || []);
      }
    } catch (error) {
      console.error("Failed to fetch players:", error);
    }
  };

  const handleAddPlayer = async () => {
    if (!selectedSport) return;

    try {
      const supabase = createSupabaseClient();

      // Prepare the payload with proper types (without photo_url initially)
      const playerPayload = {
        sport_id: selectedSport.id,
        name: playerFormData.name,
        number: playerFormData.number,
        position: playerFormData.position || null,
        bio: playerFormData.bio || null,
        height: playerFormData.height || null,
        weight: playerFormData.weight || null,
        year: playerFormData.year || null,
        hometown: playerFormData.hometown || null,
        major: playerFormData.major || null,
        is_active: true,
      };

      // Step 1: Create the player first
      const { data: newPlayer, error } = await supabase
        .from("players")
        .insert([playerPayload])
        .select()
        .single();

      if (error) {
        console.error("Failed to add player:", error);
        alert("Failed to add player: " + error.message);
        return;
      }

      // Step 2: If there's a selected file, upload it using the player ID
      if (selectedFile) {
        try {
          const photoUrl = await uploadPlayerPhoto(
            selectedFile,
            selectedSport.id,
            newPlayer.id
          );

          // Step 3: Update the player record with the photo URL
          const { data: updatedPlayer, error: updateError } = await supabase
            .from("players")
            .update({ photo_url: photoUrl })
            .eq("id", newPlayer.id)
            .select()
            .single();

          if (updateError) {
            console.error(
              "Failed to update player with photo URL:",
              updateError
            );
            // Continue with the player without photo
          } else {
            // Use the updated player data
            newPlayer.photo_url = updatedPlayer.photo_url;
          }
        } catch (uploadError) {
          console.error("Failed to upload photo:", uploadError);
          // Continue anyway, the player was created successfully
        }
      }

      setPlayers([...players, newPlayer]);
      setShowAddPlayerForm(false);
      resetPlayerForm();
    } catch (error) {
      console.error("Failed to add player:", error);
      alert(
        "Failed to add player: " +
          (error instanceof Error ? error.message : String(error))
      );
    }
  };

  const handleUpdatePlayer = async () => {
    if (!editingPlayer) return;

    try {
      const supabase = createSupabaseClient();

      // Prepare the payload with the ID for upsert
      const playerPayload = {
        id: editingPlayer.id,
        sport_id: editingPlayer.sport_id,
        name: playerFormData.name,
        number: playerFormData.number,
        position: playerFormData.position || null,
        bio: playerFormData.bio || null,
        height: playerFormData.height || null,
        weight: playerFormData.weight || null,
        year: playerFormData.year || null,
        hometown: playerFormData.hometown || null,
        major: playerFormData.major || null,
        photo_url: playerFormData.photo_url || null,
        is_active: editingPlayer.is_active,
        updated_at: new Date().toISOString(),
      };

      console.log("Upserting player with ID:", editingPlayer.id);
      console.log("Payload:", playerPayload);

      const { data: upsertedPlayer, error } = await supabase
        .from("players")
        .upsert(playerPayload);

      if (error) {
        console.error("Failed to upsert player:", error);
        alert(
          "Failed to update player: " +
            (error instanceof Error ? error.message : String(error))
        );
        return;
      }

      console.log("Player upserted successfully:", upsertedPlayer);

      setPlayers(
        players.map((p) =>
          p.id === editingPlayer.id ? upsertedPlayer || p : p
        )
      );
      setEditingPlayer(null);
      resetPlayerForm();
    } catch (error) {
      console.error("Failed to upsert player:", error);
      alert(
        "Failed to update player: " +
          (error instanceof Error ? error.message : String(error))
      );
    }
  };

  const handleDeletePlayer = async (playerId: number) => {
    if (confirm("Are you sure you want to delete this player?")) {
      try {
        const supabase = createSupabaseClient();

        const { error } = await supabase
          .from("players")
          .delete()
          .eq("id", playerId);

        if (error) {
          console.error("Failed to delete player:", error);
          alert("Failed to delete player: " + error.message);
        } else {
          setPlayers(players.filter((p) => p.id !== playerId));
        }
      } catch (error) {
        console.error("Failed to delete player:", error);
        alert(
          "Failed to delete player: " +
            (error instanceof Error ? error.message : String(error))
        );
      }
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
                Manage Sports
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
              Sports Teams Management
            </h2>
            <p style={{ color: "#6b7280" }}>
              Manage sports teams, categories, and team information.
            </p>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            style={{ backgroundColor: "#8b0000" }}
          >
            + Add New Sport
          </Button>
        </div>

        {/* Sports Grid */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "3rem",
              fontSize: "1.125rem",
              color: "#6b7280",
            }}
          >
            Loading sports...
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {sports.map((sport) => (
              <Card key={sport.id}>
                <div
                  style={{
                    aspectRatio: "16/9",
                    backgroundColor: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                  }}
                >
                  ⚽
                </div>
                <CardContent style={{ padding: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "bold",
                        color: "#1f2937",
                        flex: 1,
                      }}
                    >
                      {sport.name}
                    </h3>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        color: "white",
                        backgroundColor: getCategoryColor(sport.category),
                        padding: "0.25rem 0.5rem",
                        borderRadius: "9999px",
                      }}
                    >
                      {getCategoryLabel(sport.category)}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "#6b7280",
                      marginBottom: "1rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    {sport.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <Button
                        variant="secondary"
                        size="sm"
                        style={{ flex: 1 }}
                        onClick={() => setEditingSport(sport)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this sport?"
                            )
                          ) {
                            setSports(sports.filter((s) => s.id !== sport.id));
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                    <Button
                      size="sm"
                      style={{
                        backgroundColor: "#8b0000",
                        width: "100%",
                      }}
                      onClick={() => handleManagePlayers(sport)}
                    >
                      Manage Players
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add/Edit Sport Form Modal */}
        {(showAddForm || editingSport) && (
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
                  {editingSport ? "Edit Sport" : "Add New Sport"}
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
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "600",
                      }}
                    >
                      Sport Name
                    </label>
                    <input
                      type="text"
                      defaultValue={editingSport?.name || ""}
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
                      Category
                    </label>
                    <select
                      defaultValue={editingSport?.category || ""}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "0.375rem",
                        fontSize: "1rem",
                      }}
                    >
                      <option value="">Select Category</option>
                      <option value="mens">Men&apos;s Sports</option>
                      <option value="womens">Women&apos;s Sports</option>
                      <option value="other">Other Sports</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "600",
                      }}
                    >
                      Description
                    </label>
                    <textarea
                      defaultValue={editingSport?.description || ""}
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "0.375rem",
                        fontSize: "1rem",
                        resize: "vertical",
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
                      Team Image URL
                    </label>
                    <input
                      type="url"
                      defaultValue={editingSport?.image_url || ""}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "0.375rem",
                        fontSize: "1rem",
                      }}
                    />
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
                        setEditingSport(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      style={{ backgroundColor: "#8b0000" }}
                    >
                      {editingSport ? "Update Sport" : "Create Sport"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Players Management Modal */}
        {showPlayersModal && selectedSport && (
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
                maxWidth: "800px",
                maxHeight: "90vh",
                overflow: "auto",
              }}
            >
              <CardHeader>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <CardTitle>Manage Players - {selectedSport.name}</CardTitle>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowPlayersModal(false);
                      setSelectedSport(null);
                      setPlayers([]);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div style={{ marginBottom: "1rem" }}>
                  <Button
                    onClick={openAddPlayerForm}
                    style={{ backgroundColor: "#8b0000" }}
                  >
                    + Add New Player
                  </Button>
                </div>

                {/* Players List */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {players.map((player) => (
                    <div
                      key={player.id}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        padding: "1rem",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.5rem",
                      }}
                    >
                      {/* Player Photo */}
                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "0.375rem",
                          overflow: "hidden",
                          backgroundColor: "#f3f4f6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {player.photo_url ? (
                          <img
                            src={player.photo_url}
                            alt={`${player.name} photo`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              color: "#9ca3af",
                              fontSize: "1.25rem",
                            }}
                          >
                            👤
                          </div>
                        )}
                      </div>

                      {/* Player Info */}
                      <div style={{ flex: 1 }}>
                        <div
                          style={{ fontWeight: "600", fontSize: "1.125rem" }}
                        >
                          #{player.number} {player.name}
                        </div>
                        <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                          {player.position} • {player.year}
                        </div>
                        {player.hometown && (
                          <div
                            style={{ color: "#6b7280", fontSize: "0.75rem" }}
                          >
                            {player.hometown}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => openEditPlayerForm(player)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeletePlayer(player.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {players.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "2rem",
                      color: "#6b7280",
                    }}
                  >
                    No players found. Add some players to get started.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add Player Modal */}
        {showAddPlayerForm && selectedSport && (
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
              zIndex: 60,
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <CardTitle>Add New Player - {selectedSport.name}</CardTitle>
                  <Button variant="secondary" onClick={closePlayerForms}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await handleAddPlayer();
                  }}
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
                        Name *
                      </label>
                      <input
                        name="name"
                        required
                        value={playerFormData.name}
                        onChange={(e) =>
                          updateFormField("name", e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "0.5rem",
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
                        Number *
                      </label>
                      <input
                        name="number"
                        type="number"
                        required
                        value={playerFormData.number || ""}
                        onChange={(e) =>
                          updateFormField(
                            "number",
                            e.target.value ? parseInt(e.target.value) : null
                          )
                        }
                        style={{
                          width: "100%",
                          padding: "0.5rem",
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
                        Position
                      </label>
                      <input
                        name="position"
                        value={playerFormData.position}
                        onChange={(e) =>
                          updateFormField("position", e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "0.5rem",
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
                        Year
                      </label>
                      <select
                        name="year"
                        value={playerFormData.year}
                        onChange={(e) =>
                          updateFormField("year", e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "0.5rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "0.375rem",
                          fontSize: "1rem",
                        }}
                      >
                        <option value="">Select Year</option>
                        <option value="Freshman">Freshman</option>
                        <option value="Sophomore">Sophomore</option>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                        <option value="Graduate">Graduate</option>
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
                        Height
                      </label>
                      <input
                        name="height"
                        placeholder="e.g., 6'2&quot;"
                        value={playerFormData.height}
                        onChange={(e) =>
                          updateFormField("height", e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "0.5rem",
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
                        Weight
                      </label>
                      <input
                        name="weight"
                        placeholder="e.g., 185 lbs"
                        value={playerFormData.weight}
                        onChange={(e) =>
                          updateFormField("weight", e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "0.5rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "0.375rem",
                          fontSize: "1rem",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "600",
                      }}
                    >
                      Hometown
                    </label>
                    <input
                      name="hometown"
                      placeholder="e.g., Chicago, IL"
                      value={playerFormData.hometown}
                      onChange={(e) =>
                        updateFormField("hometown", e.target.value)
                      }
                      style={{
                        width: "100%",
                        padding: "0.5rem",
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
                      Major
                    </label>
                    <input
                      name="major"
                      placeholder="e.g., Business Administration"
                      value={playerFormData.major}
                      onChange={(e) => updateFormField("major", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.5rem",
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
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      rows={3}
                      placeholder="Brief player bio..."
                      value={playerFormData.bio}
                      onChange={(e) => updateFormField("bio", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "0.375rem",
                        fontSize: "1rem",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <PhotoUpload
                    onUploadComplete={(url) =>
                      updateFormField("photo_url", url)
                    }
                    onUploadError={(error) => alert(error)}
                    onFileSelect={(file) => setSelectedFile(file)}
                    currentPhotoUrl={playerFormData.photo_url}
                    teamId={selectedSport.id}
                    playerId={undefined} // New player, no ID yet
                  />

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
                      onClick={closePlayerForms}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      style={{ backgroundColor: "#8b0000" }}
                    >
                      Add Player
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Player Modal */}
        {editingPlayer && (
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
              zIndex: 60,
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <CardTitle>Edit Player - {editingPlayer.name}</CardTitle>
                  <Button variant="secondary" onClick={closePlayerForms}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    await handleUpdatePlayer();
                  }}
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
                        Name *
                      </label>
                      <input
                        name="name"
                        required
                        value={playerFormData.name}
                        onChange={(e) =>
                          updateFormField("name", e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "0.5rem",
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
                        Number *
                      </label>
                      <input
                        name="number"
                        type="number"
                        required
                        value={playerFormData.number || ""}
                        onChange={(e) =>
                          updateFormField(
                            "number",
                            e.target.value ? parseInt(e.target.value) : null
                          )
                        }
                        style={{
                          width: "100%",
                          padding: "0.5rem",
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
                        Position
                      </label>
                      <input
                        name="position"
                        value={playerFormData.position}
                        onChange={(e) =>
                          updateFormField("position", e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "0.5rem",
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
                        Year
                      </label>
                      <select
                        name="year"
                        value={playerFormData.year}
                        onChange={(e) =>
                          updateFormField("year", e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "0.5rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "0.375rem",
                          fontSize: "1rem",
                        }}
                      >
                        <option value="">Select Year</option>
                        <option value="Freshman">Freshman</option>
                        <option value="Sophomore">Sophomore</option>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                        <option value="Graduate">Graduate</option>
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
                        Height
                      </label>
                      <input
                        name="height"
                        placeholder="e.g., 6'2&quot;"
                        value={playerFormData.height}
                        onChange={(e) =>
                          updateFormField("height", e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "0.5rem",
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
                        Weight
                      </label>
                      <input
                        name="weight"
                        placeholder="e.g., 185 lbs"
                        value={playerFormData.weight}
                        onChange={(e) =>
                          updateFormField("weight", e.target.value)
                        }
                        style={{
                          width: "100%",
                          padding: "0.5rem",
                          border: "1px solid #d1d5db",
                          borderRadius: "0.375rem",
                          fontSize: "1rem",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "600",
                      }}
                    >
                      Hometown
                    </label>
                    <input
                      name="hometown"
                      placeholder="e.g., Chicago, IL"
                      value={playerFormData.hometown}
                      onChange={(e) =>
                        updateFormField("hometown", e.target.value)
                      }
                      style={{
                        width: "100%",
                        padding: "0.5rem",
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
                      Major
                    </label>
                    <input
                      name="major"
                      placeholder="e.g., Business Administration"
                      value={playerFormData.major}
                      onChange={(e) => updateFormField("major", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.5rem",
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
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      rows={3}
                      placeholder="Brief player bio..."
                      value={playerFormData.bio}
                      onChange={(e) => updateFormField("bio", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "0.375rem",
                        fontSize: "1rem",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  <PhotoUpload
                    onUploadComplete={(url) =>
                      updateFormField("photo_url", url)
                    }
                    onUploadError={(error) => alert(error)}
                    currentPhotoUrl={playerFormData.photo_url}
                    teamId={editingPlayer.sport_id}
                    playerId={editingPlayer.id}
                  />

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
                      onClick={closePlayerForms}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      style={{ backgroundColor: "#8b0000" }}
                    >
                      Update Player
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
