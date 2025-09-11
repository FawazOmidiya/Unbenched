import Link from "next/link";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  currentPath?: string;
}

export default function AdminLayout({
  children,
  title,
  currentPath,
}: AdminLayoutProps) {
  const adminNavItems = [
    { name: "Dashboard", href: "/admin", icon: "🏠" },
    { name: "Stories", href: "/admin/stories", icon: "📰" },
    { name: "Games", href: "/admin/games", icon: "🏆" },
    { name: "Sports", href: "/admin/sports", icon: "⚽" },
    { name: "Media", href: "/admin/media", icon: "📸" },
  ];

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
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Admin Panel
              </Link>
              <span style={{ color: "rgba(255,255,255,0.7)" }}>|</span>
              <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {title}
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
              <button
                style={{
                  color: "white",
                  background: "none",
                  border: "1px solid white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {/* Sidebar Navigation */}
        <div
          style={{
            width: "250px",
            backgroundColor: "white",
            borderRight: "1px solid #e5e7eb",
            minHeight: "calc(100vh - 80px)",
          }}
        >
          <nav style={{ padding: "1rem" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {adminNavItems.map((item) => (
                <li key={item.name} style={{ marginBottom: "0.5rem" }}>
                  <Link
                    href={item.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem 1rem",
                      color: currentPath === item.href ? "#8b0000" : "#6b7280",
                      textDecoration: "none",
                      borderRadius: "0.375rem",
                      backgroundColor:
                        currentPath === item.href ? "#fef2f2" : "transparent",
                      fontWeight: currentPath === item.href ? "600" : "400",
                      transition: "all 0.2s",
                    }}
                  >
                    <span style={{ fontSize: "1.25rem" }}>{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}
