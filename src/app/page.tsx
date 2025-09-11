import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Scoreboard from "../components/Scoreboard";
import TopStories from "../components/TopStories";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "white" }}>
      <Header />
      <Navigation />
      <main>
        <Hero />
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}
            className="lg:grid-cols-3"
          >
            <div style={{ gridColumn: "span 2" }} className="lg:col-span-2">
              <TopStories />
            </div>
            <div style={{ gridColumn: "span 1" }} className="lg:col-span-1">
              <Scoreboard />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
