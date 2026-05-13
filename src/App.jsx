import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ExamBuilder from "./pages/ExamBuilder";
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


import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./dashboard/DashboardHome";
import StudentsPage from "./dashboard/StudentsPage";
import AnalyticsPage from "./dashboard/AnalyticsPage";
import AIToolsPage from "./dashboard/AIToolsPage";
import SocialStudioPage from "./dashboard/SocialStudioPage";
import SettingsPage from "./dashboard/SettingsPage";
import LoginPage from "./auth/LoginPage";
import NotFound from "./pages/NotFound";

function LandingPage() {
  return (
    <>
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
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <main className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/ai-tools" element={<AIToolsPage />} />
            <Route path="/exam-builder" element={<ExamBuilder />} />
            <Route path="/social-studio" element={<SocialStudioPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;