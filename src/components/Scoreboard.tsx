export default function Scoreboard() {
  const recentGames = [
    {
      id: 1,
      homeTeam: "Unbenched Lords",
      awayTeam: "Rival College",
      homeScore: 85,
      awayScore: 72,
      sport: "Basketball",
      date: "Dec 15, 2024",
      status: "Final",
    },
    {
      id: 2,
      homeTeam: "Unbenched Lords",
      awayTeam: "State University",
      homeScore: 2,
      awayScore: 1,
      sport: "Soccer",
      date: "Dec 12, 2024",
      status: "Final",
    },
    {
      id: 3,
      homeTeam: "Unbenched Lords",
      awayTeam: "City College",
      homeScore: 3,
      awayScore: 0,
      sport: "Volleyball",
      date: "Dec 10, 2024",
      status: "Final",
    },
  ];

  return (
    <div style={{
      backgroundColor: "white",
      borderRadius: "0.5rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      padding: "1.5rem"
    }}>
      <h3 style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "var(--color-maroon-700)",
        marginBottom: "1.5rem"
      }}>Scoreboard</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {recentGames.map((game) => (
          <div key={game.id} style={{
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            padding: "1rem"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem"
            }}>
              <span style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#6b7280"
              }}>{game.sport}</span>
              <span style={{
                fontSize: "0.75rem",
                color: "#6b7280"
              }}>{game.date}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{ fontWeight: "600" }}>{game.homeTeam}</span>
                <span style={{
                  fontSize: "1.125rem",
                  fontWeight: "bold"
                }}>{game.homeScore}</span>
              </div>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{ fontWeight: "600" }}>{game.awayTeam}</span>
                <span style={{
                  fontSize: "1.125rem",
                  fontWeight: "bold"
                }}>{game.awayScore}</span>
              </div>
            </div>

            <div style={{
              marginTop: "0.75rem",
              paddingTop: "0.75rem",
              borderTop: "1px solid #e5e7eb"
            }}>
              <span style={{
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "#4CAF50"
              }}>{game.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <button className="btn-secondary" style={{ width: "100%" }}>
          View Full Schedule
        </button>
      </div>
    </div>
  );
}
