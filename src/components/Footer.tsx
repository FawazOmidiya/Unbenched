"use client";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#111827",
        color: "white",
        borderTop: "1px solid #374151",
        marginTop: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 1rem",
          backgroundColor: "#111827",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
            backgroundColor: "#111827",
          }}
          className="md:grid-cols-4"
        >
          {/* Logo and Description */}
          <div
            style={{ gridColumn: "span 2", backgroundColor: "#111827" }}
            className="md:col-span-2"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
                backgroundColor: "#111827",
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  backgroundColor: "#8b0000",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "white", fontWeight: "bold" }}>U</span>
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Unbenched Athletics
              </h3>
            </div>
            <p
              style={{
                color: "#d1d5db",
                marginBottom: "1rem",
                backgroundColor: "#111827",
              }}
            >
              The official website of the Unbenched Lords. Excellence in sports,
              leadership, and community engagement.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                backgroundColor: "#111827",
              }}
            >
              <a
                href="#"
                style={{
                  color: "#9ca3af",
                  transition: "color 0.2s",
                  backgroundColor: "#111827",
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#9ca3af";
                }}
              >
                <svg
                  style={{ width: "1.5rem", height: "1.5rem" }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                style={{
                  color: "#9ca3af",
                  transition: "color 0.2s",
                  backgroundColor: "#111827",
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#9ca3af";
                }}
              >
                <svg
                  style={{ width: "1.5rem", height: "1.5rem" }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a
                href="#"
                style={{
                  color: "#9ca3af",
                  transition: "color 0.2s",
                  backgroundColor: "#111827",
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#9ca3af";
                }}
              >
                <svg
                  style={{ width: "1.5rem", height: "1.5rem" }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ backgroundColor: "#111827" }}>
            <h4
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "white",
                backgroundColor: "#111827",
              }}
            >
              Quick Links
            </h4>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                backgroundColor: "#111827",
              }}
            >
              <li style={{ backgroundColor: "#111827" }}>
                <a
                  href="#"
                  style={{
                    color: "#d1d5db",
                    transition: "color 0.2s",
                    textDecoration: "none",
                    backgroundColor: "#111827",
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#d1d5db";
                  }}
                >
                  Schedule
                </a>
              </li>
              <li style={{ backgroundColor: "#111827" }}>
                <a
                  href="#"
                  style={{
                    color: "#d1d5db",
                    transition: "color 0.2s",
                    textDecoration: "none",
                    backgroundColor: "#111827",
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#d1d5db";
                  }}
                >
                  Roster
                </a>
              </li>
              <li style={{ backgroundColor: "#111827" }}>
                <a
                  href="#"
                  style={{
                    color: "#d1d5db",
                    transition: "color 0.2s",
                    textDecoration: "none",
                    backgroundColor: "#111827",
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#d1d5db";
                  }}
                >
                  News
                </a>
              </li>
              <li style={{ backgroundColor: "#111827" }}>
                <a
                  href="#"
                  style={{
                    color: "#d1d5db",
                    transition: "color 0.2s",
                    textDecoration: "none",
                    backgroundColor: "#111827",
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#d1d5db";
                  }}
                >
                  Tickets
                </a>
              </li>
              <li style={{ backgroundColor: "#111827" }}>
                <a
                  href="#"
                  style={{
                    color: "#d1d5db",
                    transition: "color 0.2s",
                    textDecoration: "none",
                    backgroundColor: "#111827",
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLAnchorElement;
                    target.style.color = "#d1d5db";
                  }}
                >
                  Shop
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div style={{ backgroundColor: "#111827" }}>
            <h4
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "white",
                backgroundColor: "#111827",
              }}
            >
              Contact
            </h4>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                color: "#d1d5db",
                backgroundColor: "#111827",
              }}
            >
              <li style={{ backgroundColor: "#111827" }}>123 University Ave</li>
              <li style={{ backgroundColor: "#111827" }}>City, State 12345</li>
              <li style={{ backgroundColor: "#111827" }}>
                Phone: (555) 123-4567
              </li>
              <li style={{ backgroundColor: "#111827" }}>
                Email: athletics@unbenched.edu
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div
          style={{
            borderTop: "1px solid #374151",
            marginTop: "2rem",
            paddingTop: "2rem",
            backgroundColor: "#111827",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              backgroundColor: "#111827",
            }}
            className="md:flex-row md:justify-between"
          >
            <p
              style={{
                color: "#9ca3af",
                fontSize: "0.875rem",
                backgroundColor: "#111827",
              }}
            >
              © 2024 Unbenched Athletics. All rights reserved.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                backgroundColor: "#111827",
              }}
            >
              <a
                href="#"
                style={{
                  color: "#9ca3af",
                  fontSize: "0.875rem",
                  transition: "color 0.2s",
                  textDecoration: "none",
                  backgroundColor: "#111827",
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#9ca3af";
                }}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                style={{
                  color: "#9ca3af",
                  fontSize: "0.875rem",
                  transition: "color 0.2s",
                  textDecoration: "none",
                  backgroundColor: "#111827",
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#9ca3af";
                }}
              >
                Terms of Service
              </a>
              <a
                href="#"
                style={{
                  color: "#9ca3af",
                  fontSize: "0.875rem",
                  transition: "color 0.2s",
                  textDecoration: "none",
                  backgroundColor: "#111827",
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLAnchorElement;
                  target.style.color = "#9ca3af";
                }}
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
