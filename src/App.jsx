import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeatureCards from "./components/FeatureCards";
import TeacherOS from "./pages/TeacherOS";
import StudentAnalytics from "./pages/StudentAnalytics";
import AIToolsHub from "./pages/AIToolsHub";
import SocialStudio from "./pages/SocialStudio";
import MobileShowcase from "./pages/MobileShowcase";
import Pricing from "./pages/Pricing";
import Testimonials from "./pages/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="app">
      <Navbar />
      <Hero />
      <FeatureCards />
      <TeacherOS />
      <StudentAnalytics />
      <AIToolsHub />
      <SocialStudio />
      <MobileShowcase />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}

export default App;