export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        background:
          "linear-gradient(to right, var(--color-maroon-700), var(--color-maroon-900))",
        color: "white",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "black",
          opacity: 0.4,
        }}
      ></div>
      <div
        style={{
          position: "relative",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 1rem",
        }}
      >
        <div style={{ maxWidth: "64rem" }}>
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Welcome to Unbenched Athletics
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              marginBottom: "2rem",
              color: "#e5e7eb",
            }}
          >
            Home of the UTSC Maroons - Excellence in Sports, Leadership, and
            Community
          </p>
          {/* <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
            className="sm:flex-row"
          >
            <Button size="lg" className="text-lg px-8 py-3">
              View Schedule
            </Button>
            <Button variant="secondary" size="lg" className="text-lg px-8 py-3">
              Buy Tickets
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
}
