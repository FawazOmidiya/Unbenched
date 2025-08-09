export default function TopStories() {
  const stories = [
    {
      id: 1,
      title: "Lords Basketball Team Advances to Championship Finals",
      excerpt:
        "The Unbenched Lords basketball team secured their spot in the championship finals with an impressive victory over their rivals...",
      image: "/api/placeholder/400/250",
      date: "December 16, 2024",
      category: "Basketball",
      featured: true,
    },
    {
      id: 2,
      title: "New Athletic Director Announced",
      excerpt:
        "The university is pleased to announce the appointment of a new Athletic Director who brings years of experience...",
      image: "/api/placeholder/400/250",
      date: "December 14, 2024",
      category: "Administration",
    },
    {
      id: 3,
      title: "Soccer Team Wins Conference Title",
      excerpt:
        "The Lords soccer team captured their third consecutive conference championship with a dominant performance...",
      image: "/api/placeholder/400/250",
      date: "December 12, 2024",
      category: "Soccer",
    },
    {
      id: 4,
      title: "Student-Athlete Academic Excellence Awards",
      excerpt:
        "Twenty-five student-athletes were recognized for their outstanding academic achievements this semester...",
      image: "/api/placeholder/400/250",
      date: "December 10, 2024",
      category: "Academics",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <h2 style={{
        fontSize: "1.875rem",
        fontWeight: "bold",
        color: "var(--color-maroon-700)"
      }}>Top Stories</h2>

      {/* Featured Story */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        overflow: "hidden"
      }}>
        <div style={{
          aspectRatio: "16/9",
          background: "linear-gradient(to bottom right, var(--color-maroon-100), var(--color-maroon-200))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <span style={{
            color: "var(--color-maroon-700)",
            fontWeight: "500"
          }}>Featured Image</span>
        </div>
        <div style={{ padding: "1.5rem" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "0.75rem"
          }}>
            <span style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "var(--color-maroon-700)",
              backgroundColor: "var(--color-maroon-100)",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px"
            }}>{stories[0].category}</span>
            <span style={{
              fontSize: "0.875rem",
              color: "#6b7280"
            }}>{stories[0].date}</span>
          </div>
          <h3 style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#111827",
            marginBottom: "0.75rem"
          }}>{stories[0].title}</h3>
          <p style={{
            color: "#6b7280",
            marginBottom: "1rem"
          }}>{stories[0].excerpt}</p>
          <button className="btn-primary">Read More</button>
        </div>
      </div>

      {/* Other Stories Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "1.5rem"
      }} className="md:grid-cols-2">
        {stories.slice(1).map((story) => (
          <div
            key={story.id}
            style={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              overflow: "hidden"
            }}
          >
            <div style={{
              aspectRatio: "16/9",
              background: "linear-gradient(to bottom right, var(--color-maroon-100), var(--color-maroon-200))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <span style={{
                color: "var(--color-maroon-700)",
                fontWeight: "500"
              }}>Story Image</span>
            </div>
            <div style={{ padding: "1rem" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "0.5rem"
              }}>
                <span style={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "var(--color-maroon-700)",
                  backgroundColor: "var(--color-maroon-100)",
                  padding: "0.125rem 0.5rem",
                  borderRadius: "9999px"
                }}>{story.category}</span>
                <span style={{
                  fontSize: "0.75rem",
                  color: "#6b7280"
                }}>{story.date}</span>
              </div>
              <h4 style={{
                fontSize: "1.125rem",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "0.5rem"
              }}>{story.title}</h4>
              <p style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "0.75rem"
              }}>{story.excerpt}</p>
              <button style={{
                color: "var(--color-maroon-700)",
                fontWeight: "600",
                fontSize: "0.875rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0
              }}>
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Stories Button */}
      <div style={{ textAlign: "center" }}>
        <button className="btn-secondary">View All Stories</button>
      </div>
    </div>
  );
}
