export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f8fafc",
        borderTop: "1px solid #e5e7eb",
        marginTop: "3rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            textAlign: "center",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                width: "2rem",
                height: "2rem",
                backgroundColor: "#8b0000",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                }}
              >
                U
              </span>
            </div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                color: "#1f2937",
              }}
            >
              Unbenched Athletics
            </h3>
          </div>

          {/* Description */}
          <p
            style={{
              color: "#6b7280",
              fontSize: "0.875rem",
              maxWidth: "400px",
              lineHeight: "1.5",
            }}
          >
            UTSC Maroons Athletics - Excellence in sports and community
            engagement.
          </p>

          {/* Copyright */}
          <p
            style={{
              color: "#9ca3af",
              fontSize: "0.75rem",
              marginTop: "0.5rem",
            }}
          >
            © 2024 UTSC Maroons. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
