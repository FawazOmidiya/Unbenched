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
          padding: "2rem 1rem",
        }}
        className="md:py-16"
      >
        <div style={{ maxWidth: "64rem" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
              lineHeight: "1.2",
            }}
            className="md:text-5xl"
          >
            Welcome to Unbenched Athletics
          </h2>
          <p
            style={{
              fontSize: "1rem",
              marginBottom: "1.5rem",
              color: "#e5e7eb",
              lineHeight: "1.5",
            }}
            className="md:text-xl md:mb-8"
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
