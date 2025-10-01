"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Story, createSupabaseClient } from "@/lib/supabase";
import Link from "next/link";

export default function TopStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const supabase = createSupabaseClient();
        const { data: storiesData, error } = await supabase
          .from("stories")
          .select(
            `
            *,
            sport:sports(name),
            game:games(home_team, away_team, date)
          `
          )
          .order("created_at", { ascending: false })
          .limit(4);

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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === stories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

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
          Latest Stories
        </h2>
        <div style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
          Loading stories...
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h2
        style={{
          fontSize: "1.875rem",
          fontWeight: "bold",
          color: "var(--color-maroon-700)",
        }}
      >
        Latest Stories
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
        <div
          style={{
            position: "relative",
            backgroundColor: "white",
            borderRadius: "1rem",
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
            border: "1px solid #f1f5f9",
          }}
        >
          {/* Carousel Container */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Stories Slides */}
            <div
              style={{
                display: "flex",
                width: `${stories.length * 100}%`,
                transform: `translateX(-${
                  (currentIndex * 100) / stories.length
                }%)`,
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {stories.map((story, index) => (
                <div
                  key={story.id}
                  style={{
                    width: `${100 / stories.length}%`,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Story Image */}
                  <div
                    style={{
                      aspectRatio: "16/9",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    {story.banner_image_url ? (
                      <img
                        src={story.banner_image_url}
                        alt={story.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background:
                            "linear-gradient(135deg, #8b0000 0%, #a00000 50%, #8b0000 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            textAlign: "center",
                            color: "white",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "3rem",
                              marginBottom: "1rem",
                              opacity: 0.8,
                            }}
                          >
                            📰
                          </div>
                          <div
                            style={{
                              fontSize: "1.25rem",
                              fontWeight: "500",
                            }}
                          >
                            Story Image
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Story Content Below Image */}
                  <div
                    style={{
                      padding: "1.5rem",
                      backgroundColor: "white",
                    }}
                  >
                    {/* Story Title */}
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#111827",
                        marginBottom: "0.75rem",
                        lineHeight: "1.3",
                      }}
                    >
                      {story.title}
                    </h3>

                    {/* Story Teaser */}
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                        marginBottom: "1rem",
                        lineHeight: "1.5",
                      }}
                    >
                      {story.article?.substring(0, 100)}...
                    </p>

                    {/* Read More Button */}
                    <Link href={`/stories/${story.id}`}>
                      <button
                        style={{
                          backgroundColor: "#8b0000",
                          color: "white",
                          border: "none",
                          padding: "0.5rem 1rem",
                          borderRadius: "0.375rem",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          fontWeight: "600",
                          transition: "all 0.2s ease",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#a00000";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#8b0000";
                        }}
                      >
                        Read More
                        <svg
                          style={{ width: "0.875rem", height: "0.875rem" }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {stories.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    color: "#8b0000",
                    border: "none",
                    borderRadius: "50%",
                    width: "3rem",
                    height: "3rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    transition: "all 0.2s ease",
                    zIndex: 10,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.9)";
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1)";
                  }}
                >
                  ‹
                </button>
                <button
                  onClick={nextSlide}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    color: "#8b0000",
                    border: "none",
                    borderRadius: "50%",
                    width: "3rem",
                    height: "3rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    transition: "all 0.2s ease",
                    zIndex: 10,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "white";
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(255, 255, 255, 0.9)";
                    e.currentTarget.style.transform =
                      "translateY(-50%) scale(1)";
                  }}
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator */}
          {stories.length > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.75rem",
                padding: "1rem",
                backgroundColor: "#f8fafc",
              }}
            >
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  style={{
                    width: index === currentIndex ? "2rem" : "0.75rem",
                    height: "0.75rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    backgroundColor:
                      index === currentIndex ? "#8b0000" : "#cbd5e1",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
