"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import { createSupabaseClient } from "@/lib/supabase";
import { Story } from "@/lib/supabase";
import Link from "next/link";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface StoryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function StoryDetailPage({ params }: StoryDetailPageProps) {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resolvedParams = use(params);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase
          .from("stories")
          .select(
            `
            *,
            sport:sports(name, slug),
            game:games(home_team, away_team, date)
          `
          )
          .eq("id", resolvedParams.id)
          .single();

        if (error) {
          if (error.code === "PGRST116") {
            setError("Story not found");
          } else {
            throw error;
          }
        } else {
          setStory(data);
        }
      } catch (error) {
        console.error("Failed to fetch story:", error);
        setError("Failed to load story");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <div style={{ fontSize: "1.5rem", color: "#666" }}>
          Loading story...
        </div>
      </div>
    );
  }

  if (error || !story) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <div
          style={{ fontSize: "1.5rem", color: "#dc2626", marginBottom: "1rem" }}
        >
          {error || "Story not found"}
        </div>
        <Link
          href="/"
          style={{
            color: "#8b0000",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Site Header */}
      <Header />

      {/* Site Navigation */}
      <Navigation />

      {/* Main Content */}
      <main
        style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}
        className="md:px-8"
      >
        {/* Back Button */}
        <div style={{ marginBottom: "2rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#8b0000",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "0.875rem",
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Story Content */}
        <article
          style={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          {/* Banner Image */}
          {story.banner_image_url && (
            <div
              style={{
                aspectRatio: "16/9",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <img
                src={story.banner_image_url}
                alt={story.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          {/* Story Header */}
          <header style={{ padding: "1.5rem" }} className="md:px-8">
            {/* Metadata */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              {story.sport?.name && (
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
                  {story.sport.name}
                </span>
              )}
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                }}
              >
                {new Date(story.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {story.journalist && (
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                  }}
                >
                  By {story.journalist}
                </span>
              )}
              {story.photographer && (
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                  }}
                >
                  Photos by {story.photographer}
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#111827",
                lineHeight: "1.2",
                marginBottom: "1.5rem",
              }}
              className="md:text-4xl"
            >
              {story.title}
            </h1>

            {/* Game Information */}
            {story.game && (
              <div
                style={{
                  backgroundColor: "#f9fafb",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e5e7eb",
                  marginBottom: "1.5rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "0.75rem",
                  }}
                >
                  Related Game
                </h3>
                <div
                  style={{
                    fontSize: "1rem",
                    color: "#6b7280",
                    fontWeight: "500",
                  }}
                >
                  {story.game.home_team} vs {story.game.away_team}
                  {story.game.date && (
                    <span style={{ marginLeft: "0.5rem" }}>
                      - {new Date(story.game.date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            )}
          </header>

          {/* Article Content */}
          <div
            style={{
              padding: "0 1.5rem 1.5rem 1.5rem",
              fontSize: "1rem",
              lineHeight: "1.7",
              color: "#374151",
            }}
            className="md:px-8 md:text-lg"
          >
            {story.article.split("\n").map((paragraph, index) => (
              <p
                key={index}
                style={{
                  marginBottom: "1.5rem",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Story Footer */}
          <footer
            style={{
              padding: "1.5rem 2rem",
              backgroundColor: "#f9fafb",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                }}
              >
                Published on{" "}
                {new Date(story.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <Link
                href="/"
                style={{
                  color: "#8b0000",
                  textDecoration: "none",
                  fontWeight: "500",
                  fontSize: "0.875rem",
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Home
              </Link>
            </div>
          </footer>
        </article>
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}
