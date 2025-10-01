"use client";

import { useState, useEffect } from "react";
import { createSupabaseClient } from "@/lib/supabase";
import { Story, Sport, Game } from "@/lib/supabase";

interface StoryFormData {
  title: string;
  article: string;
  banner_image_url: string;
  sport_id: number | null;
  game_id: number | null;
  photographer: string;
  journalist: string;
  excerpt: string;
  date: string;
}

export default function AdminStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [formData, setFormData] = useState<StoryFormData>({
    title: "",
    article: "",
    banner_image_url: "",
    sport_id: null,
    game_id: null,
    photographer: "",
    journalist: "",
    excerpt: "",
    date: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchStories();
    fetchSports();
    fetchGames();
  }, []);

  const fetchStories = async () => {
    try {
      const supabase = createSupabaseClient();
      const { data, error } = await supabase
        .from("stories")
        .select(
          `
          *,
          sport:sports(name),
          game:games(home_team, away_team, date)
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSports = async () => {
    try {
      const supabase = createSupabaseClient();
      const { data, error } = await supabase
        .from("sports")
        .select("*")
        .order("name");

      if (error) throw error;
      setSports(data || []);
    } catch (error) {
      console.error("Failed to fetch sports:", error);
    }
  };

  const fetchGames = async () => {
    try {
      const supabase = createSupabaseClient();
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      setGames(data || []);
    } catch (error) {
      console.error("Failed to fetch games:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      article: "",
      banner_image_url: "",
      sport_id: null,
      game_id: null,
      photographer: "",
      journalist: "",
      excerpt: "",
      date: "",
    });
    setSelectedFile(null);
    setEditingStory(null);
    setShowAddForm(false);
  };

  const handleAddStory = async () => {
    try {
      const supabase = createSupabaseClient();

      // First create the story
      const storyPayload = {
        title: formData.title,
        article: formData.article,
        sport_id: formData.sport_id,
        game_id: formData.game_id,
        photographer: formData.photographer,
        journalist: formData.journalist,
        excerpt: formData.excerpt,
        date: formData.date,
      };

      const { data: newStory, error: storyError } = await supabase
        .from("stories")
        .insert(storyPayload)
        .select()
        .single();

      if (storyError) throw storyError;

      // If there's a selected file, upload it
      if (selectedFile && newStory) {
        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `story-${newStory.id}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("story-images")
          .upload(fileName, selectedFile);

        if (uploadError) throw uploadError;

        // Get the public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("story-images").getPublicUrl(fileName);

        // Update the story with the image URL
        const { error: updateError } = await supabase
          .from("stories")
          .update({ banner_image_url: publicUrl })
          .eq("id", newStory.id);

        if (updateError) throw updateError;
      }

      await fetchStories();
      resetForm();
      alert("Story added successfully!");
    } catch (error) {
      alert(
        `Failed to add story: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  const handleUpdateStory = async () => {
    if (!editingStory) return;

    try {
      const supabase = createSupabaseClient();

      const updatePayload: {
        title: string;
        article: string;
        sport_id: number | null;
        game_id: number | null;
        photographer: string;
        journalist: string;
        excerpt: string;
        date: string;
        banner_image_url?: string;
      } = {
        title: formData.title,
        article: formData.article,
        sport_id: formData.sport_id,
        game_id: formData.game_id,
        photographer: formData.photographer,
        journalist: formData.journalist,
        excerpt: formData.excerpt,
        date: formData.date,
      };

      // If there's a new file, upload it
      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const fileName = `story-${editingStory.id}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("story-images")
          .upload(fileName, selectedFile, { upsert: true });

        if (uploadError) throw uploadError;

        // Get the public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("story-images").getPublicUrl(fileName);

        updatePayload.banner_image_url = publicUrl;
      }

      const { error } = await supabase
        .from("stories")
        .update(updatePayload)
        .eq("id", editingStory.id);

      if (error) throw error;

      await fetchStories();
      resetForm();
      alert("Story updated successfully!");
    } catch (error) {
      alert(
        `Failed to update story: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  const handleDeleteStory = async (storyId: number) => {
    if (!confirm("Are you sure you want to delete this story?")) return;

    try {
      const supabase = createSupabaseClient();
      const { error } = await supabase
        .from("stories")
        .delete()
        .eq("id", storyId);

      if (error) throw error;

      await fetchStories();
      alert("Story deleted successfully!");
    } catch (error) {
      alert(
        `Failed to delete story: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  const handleDeleteImage = async (storyId: number, imageUrl: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const supabase = createSupabaseClient();

      // Extract filename from URL
      const urlParts = imageUrl.split("/");
      const fileName = urlParts[urlParts.length - 1];

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("story-images")
        .remove([fileName]);

      if (storageError) {
        console.warn("Failed to delete from storage:", storageError);
        // Continue anyway as the image might not exist in storage
      }

      // Update story to remove image URL
      const { error: updateError } = await supabase
        .from("stories")
        .update({ banner_image_url: null })
        .eq("id", storyId);

      if (updateError) throw updateError;

      await fetchStories();
      alert("Image deleted successfully!");
    } catch (error) {
      alert(
        `Failed to delete image: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  const openEditForm = (story: Story) => {
    setFormData({
      title: story.title,
      article: story.article,
      banner_image_url: story.banner_image_url || "",
      sport_id: story.sport_id || null,
      game_id: story.game_id || null,
      photographer: story.photographer || "",
      journalist: story.journalist || "",
      excerpt: story.excerpt || "",
      date: story.date || "",
    });
    setEditingStory(story);
    setSelectedFile(null);
  };

  const openAddForm = () => {
    resetForm();
    setShowAddForm(true);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Compress image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        const maxWidth = 1200;
        const maxHeight = 800;
        let { width, height } = img;

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              setSelectedFile(compressedFile);
            }
          },
          "image/jpeg",
          0.8
        );
      };

      img.src = URL.createObjectURL(file);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <div style={{ fontSize: "1.5rem", color: "#666" }}>
          Loading stories...
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "white",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "1.875rem",
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: "0.25rem",
                }}
              >
                Stories Dashboard
              </h1>
              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                Manage all your stories, images, and content
              </p>
            </div>
            <button
              onClick={openAddForm}
              style={{
                backgroundColor: "#8b0000",
                color: "white",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <svg
                style={{ width: "1.25rem", height: "1.25rem" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New Story
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}
      >
        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    marginBottom: "0.25rem",
                  }}
                >
                  Total Stories
                </p>
                <p
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#111827",
                  }}
                >
                  {stories.length}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#fef2f2",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  color: "#8b0000",
                }}
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
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    marginBottom: "0.25rem",
                  }}
                >
                  With Images
                </p>
                <p
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#111827",
                  }}
                >
                  {stories.filter((story) => story.banner_image_url).length}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#f0f9ff",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  color: "#0369a1",
                }}
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              border: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    marginBottom: "0.25rem",
                  }}
                >
                  Recent Stories
                </p>
                <p
                  style={{
                    fontSize: "2rem",
                    fontWeight: "bold",
                    color: "#111827",
                  }}
                >
                  {
                    stories.filter((story) => {
                      const storyDate = new Date(story.created_at);
                      const weekAgo = new Date();
                      weekAgo.setDate(weekAgo.getDate() - 7);
                      return storyDate > weekAgo;
                    }).length
                  }
                </p>
              </div>
              <div
                style={{
                  backgroundColor: "#f0fdf4",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  color: "#16a34a",
                }}
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Stories Management Section */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "1.5rem",
              borderBottom: "1px solid #e5e7eb",
              backgroundColor: "#f9fafb",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "0.5rem",
              }}
            >
              All Stories
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
              Manage your stories, edit content, and organize your content
              library
            </p>
          </div>

          <div style={{ padding: "1.5rem" }}>
            {stories.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem 2rem",
                  color: "#6b7280",
                }}
              >
                <div
                  style={{
                    fontSize: "3rem",
                    marginBottom: "1rem",
                    opacity: 0.5,
                  }}
                >
                  📰
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "0.5rem",
                  }}
                >
                  No Stories Yet
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    maxWidth: "400px",
                    margin: "0 auto 1.5rem auto",
                  }}
                >
                  Get started by creating your first story. Add images, content,
                  and metadata to engage your audience.
                </p>
                <button
                  onClick={openAddForm}
                  style={{
                    backgroundColor: "#8b0000",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                >
                  Create Your First Story
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gap: "1.5rem" }}>
                {stories.map((story) => (
                  <div
                    key={story.id}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                      padding: "1.5rem",
                      backgroundColor: "#fafafa",
                      transition: "all 0.2s",
                    }}
                    className="hover:shadow-md hover:border-gray-300"
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "1rem",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            marginBottom: "0.75rem",
                          }}
                        >
                          <h3
                            style={{
                              fontSize: "1.25rem",
                              fontWeight: "bold",
                              color: "#111827",
                            }}
                          >
                            {story.title}
                          </h3>
                          {story.banner_image_url && (
                            <span
                              style={{
                                fontSize: "0.75rem",
                                fontWeight: "500",
                                color: "#16a34a",
                                backgroundColor: "#dcfce7",
                                padding: "0.25rem 0.5rem",
                                borderRadius: "9999px",
                              }}
                            >
                              Has Image
                            </span>
                          )}
                        </div>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "1rem",
                            marginBottom: "1rem",
                          }}
                        >
                          <div>
                            <p
                              style={{
                                fontSize: "0.75rem",
                                color: "#6b7280",
                                marginBottom: "0.25rem",
                              }}
                            >
                              SPORT
                            </p>
                            <p
                              style={{
                                fontSize: "0.875rem",
                                color: "#374151",
                                fontWeight: "500",
                              }}
                            >
                              {story.sport?.name || "Not assigned"}
                            </p>
                          </div>
                          <div>
                            <p
                              style={{
                                fontSize: "0.75rem",
                                color: "#6b7280",
                                marginBottom: "0.25rem",
                              }}
                            >
                              JOURNALIST
                            </p>
                            <p
                              style={{
                                fontSize: "0.875rem",
                                color: "#374151",
                                fontWeight: "500",
                              }}
                            >
                              {story.journalist || "Not assigned"}
                            </p>
                          </div>
                          <div>
                            <p
                              style={{
                                fontSize: "0.75rem",
                                color: "#6b7280",
                                marginBottom: "0.25rem",
                              }}
                            >
                              PHOTOGRAPHER
                            </p>
                            <p
                              style={{
                                fontSize: "0.875rem",
                                color: "#374151",
                                fontWeight: "500",
                              }}
                            >
                              {story.photographer || "Not assigned"}
                            </p>
                          </div>
                          <div>
                            <p
                              style={{
                                fontSize: "0.75rem",
                                color: "#6b7280",
                                marginBottom: "0.25rem",
                              }}
                            >
                              CREATED
                            </p>
                            <p
                              style={{
                                fontSize: "0.875rem",
                                color: "#374151",
                                fontWeight: "500",
                              }}
                            >
                              {new Date(story.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {story.banner_image_url && (
                          <div style={{ marginBottom: "1rem" }}>
                            <div
                              style={{
                                position: "relative",
                                display: "inline-block",
                              }}
                            >
                              <img
                                src={story.banner_image_url}
                                alt={story.title}
                                style={{
                                  width: "100%",
                                  maxWidth: "300px",
                                  height: "150px",
                                  objectFit: "cover",
                                  borderRadius: "0.375rem",
                                }}
                              />
                              <button
                                onClick={() =>
                                  handleDeleteImage(
                                    story.id,
                                    story.banner_image_url!
                                  )
                                }
                                style={{
                                  position: "absolute",
                                  top: "0.5rem",
                                  right: "0.5rem",
                                  backgroundColor: "rgba(220, 38, 38, 0.9)",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "50%",
                                  width: "2rem",
                                  height: "2rem",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "0.875rem",
                                  fontWeight: "bold",
                                }}
                                title="Delete Image"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        )}

                        <div
                          style={{
                            fontSize: "0.875rem",
                            color: "#6b7280",
                            lineHeight: "1.5",
                            marginBottom: "1rem",
                          }}
                        >
                          {story.article.substring(0, 150)}...
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          flexDirection: "column",
                        }}
                      >
                        <button
                          onClick={() => openEditForm(story)}
                          style={{
                            backgroundColor: "#3b82f6",
                            color: "white",
                            border: "none",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.375rem",
                            cursor: "pointer",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <svg
                            style={{ width: "1rem", height: "1rem" }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteStory(story.id)}
                          style={{
                            backgroundColor: "#dc2626",
                            color: "white",
                            border: "none",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.375rem",
                            cursor: "pointer",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <svg
                            style={{ width: "1rem", height: "1rem" }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Story Form Modal */}
      {(showAddForm || editingStory) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              padding: "2rem",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {editingStory ? "Edit Story" : "Add New Story"}
              </h2>
              <button
                onClick={resetForm}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#666",
                }}
              >
                ×
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingStory) {
                  handleUpdateStory();
                } else {
                  handleAddStory();
                }
              }}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.25rem",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Article *
                </label>
                <textarea
                  value={formData.article}
                  onChange={(e) =>
                    setFormData({ ...formData, article: e.target.value })
                  }
                  required
                  rows={8}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.25rem",
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
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Banner Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.25rem",
                    fontSize: "1rem",
                  }}
                />
                {selectedFile && (
                  <div
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.875rem",
                      color: "#666",
                    }}
                  >
                    Selected: {selectedFile.name}
                  </div>
                )}
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
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Sport
                  </label>
                  <select
                    value={formData.sport_id || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sport_id: e.target.value
                          ? parseInt(e.target.value)
                          : null,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.25rem",
                      fontSize: "1rem",
                    }}
                  >
                    <option value="">Select a sport</option>
                    {sports.map((sport) => (
                      <option key={sport.id} value={sport.id}>
                        {sport.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Game
                  </label>
                  <select
                    value={formData.game_id || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        game_id: e.target.value
                          ? parseInt(e.target.value)
                          : null,
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.25rem",
                      fontSize: "1rem",
                    }}
                  >
                    <option value="">Select a game</option>
                    {games.map((game) => (
                      <option key={game.id} value={game.id}>
                        {game.home_team} vs {game.away_team} -{" "}
                        {new Date(game.date).toLocaleDateString()}
                      </option>
                    ))}
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
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Photographer
                  </label>
                  <input
                    type="text"
                    value={formData.photographer}
                    onChange={(e) =>
                      setFormData({ ...formData, photographer: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.25rem",
                      fontSize: "1rem",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Journalist
                  </label>
                  <input
                    type="text"
                    value={formData.journalist}
                    onChange={(e) =>
                      setFormData({ ...formData, journalist: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.25rem",
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
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  Excerpt *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  required
                  rows={3}
                  placeholder="Brief description of the story..."
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.25rem",
                    fontSize: "1rem",
                    resize: "vertical",
                  }}
                />
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
                      fontWeight: "500",
                      color: "#333",
                    }}
                  >
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      border: "1px solid #d1d5db",
                      borderRadius: "0.25rem",
                      fontSize: "1rem",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    backgroundColor: "#6b7280",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#8b0000",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  {editingStory ? "Update Story" : "Add Story"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
