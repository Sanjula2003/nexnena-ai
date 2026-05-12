import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureCards from "./components/FeatureCards";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="app">
      <Navbar />
      <Hero />
      <FeatureCards />
      <CTA />
      <Footer />
    </main>
  );
}

export default App;