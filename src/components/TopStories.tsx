"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Story, createSupabaseClient } from "@/lib/supabase";

export default function TopStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const supabase = createSupabaseClient();
        const { data: storiesData, error } = await supabase
          .from("stories")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Failed to fetch stories:", error);
        } else {
          setStories(storiesData || []);
        }
      } catch (error) {
        console.error("Failed to fetch stories:", error);
        setStories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <h2
          style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            color: "var(--color-maroon-700)",
          }}
        >
          Top Stories
        </h2>
        <div style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
          Loading stories...
        </div>
      </div>
    );
  }

  const featuredStory = stories.find((story) => story.featured) || stories[0];
  const otherStories = stories
    .filter((story) => story.id !== featuredStory?.id)
    .slice(0, 3);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h2
        style={{
          fontSize: "1.875rem",
          fontWeight: "bold",
          color: "var(--color-maroon-700)",
        }}
      >
        Top Stories
      </h2>

      {stories.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem 2rem",
            color: "#6b7280",
            backgroundColor: "#f9fafb",
            borderRadius: "0.5rem",
            border: "2px dashed #d1d5db",
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
              margin: "0 auto",
            }}
          >
            Check back soon for the latest news and updates from UTSC Maroons
            Athletics!
          </p>
        </div>
      ) : (
        <>
          {/* Featured Story */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                aspectRatio: "16/9",
                background:
                  "linear-gradient(to bottom right, var(--color-maroon-100), var(--color-maroon-200))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "var(--color-maroon-700)",
                  fontWeight: "500",
                }}
              >
                Featured Image
              </span>
            </div>
            <div style={{ padding: "1.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "var(--color-maroon-700)",
                    backgroundColor: "var(--color-maroon-100)",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                  }}
                >
                  {featuredStory?.category}
                </span>
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                  }}
                >
                  {featuredStory?.date
                    ? new Date(featuredStory.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : ""}
                </span>
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#111827",
                  marginBottom: "0.75rem",
                }}
              >
                {featuredStory?.title}
              </h3>
              <p
                style={{
                  color: "#6b7280",
                  marginBottom: "1rem",
                }}
              >
                {featuredStory?.excerpt}
              </p>
              <Button>Read More</Button>
            </div>
          </div>

          {/* Other Stories Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1.5rem",
            }}
            className="md:grid-cols-2"
          >
            {otherStories.map((story) => (
              <div
                key={story.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    aspectRatio: "16/9",
                    background:
                      "linear-gradient(to bottom right, var(--color-maroon-100), var(--color-maroon-200))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      color: "var(--color-maroon-700)",
                      fontWeight: "500",
                    }}
                  >
                    Story Image
                  </span>
                </div>
                <div style={{ padding: "1rem" }}>
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
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        color: "var(--color-maroon-700)",
                        backgroundColor: "var(--color-maroon-100)",
                        padding: "0.125rem 0.5rem",
                        borderRadius: "9999px",
                      }}
                    >
                      {story.category}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                      }}
                    >
                      {story.date
                        ? new Date(story.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : ""}
                    </span>
                  </div>
                  <h4
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "bold",
                      color: "#111827",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {story.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {story.excerpt}
                  </p>
                  <button
                    style={{
                      color: "var(--color-maroon-700)",
                      fontWeight: "600",
                      fontSize: "0.875rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Stories Button */}
          <div style={{ textAlign: "center" }}>
            <Button variant="secondary">View All Stories</Button>
          </div>
        </>
      )}
    </div>
  );
}
