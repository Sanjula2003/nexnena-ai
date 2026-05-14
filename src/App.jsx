import { BrowserRouter, Routes, Route } from "react-router-dom";
import SubscriptionsPage from "./dashboard/SubscriptionsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PlanProtectedRoute from "./components/PlanProtectedRoute";
import TeacherRoute from "./components/TeacherRoute";

import CsvImportPage from "./dashboard/CsvImportPage";
import TopicsPage from "./dashboard/TopicsPage";
import StudentAccessPage from "./dashboard/StudentAccessPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./dashboard/DashboardHome";
import StudentsPage from "./dashboard/StudentsPage";
import AnalyticsPage from "./dashboard/AnalyticsPage";
import AIToolsPage from "./dashboard/AIToolsPage";
import SocialStudioPage from "./dashboard/SocialStudioPage";
import SettingsPage from "./dashboard/SettingsPage";

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
import RoleRedirect from "./pages/RoleRedirect";
import StudentPortal from "./pages/StudentPortal";
import UpgradePage from "./pages/UpgradePage";
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
            path="/portal"
            element={
              <ProtectedRoute>
                <RoleRedirect />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student-portal"
            element={
              <ProtectedRoute>
                <StudentPortal />
              </ProtectedRoute>
            }
          />

          <Route
            element={
              <ProtectedRoute>
                <TeacherRoute>
                  <DashboardLayout />
                </TeacherRoute>
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/student-access" element={<StudentAccessPage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/csv-import" element={<CsvImportPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />

            <Route path="/upgrade" element={<UpgradePage />} />

            <Route
              path="/analytics"
              element={
                <PlanProtectedRoute requiredPlan="standard">
                  <AnalyticsPage />
                </PlanProtectedRoute>
              }
            />

            <Route
              path="/ai-tools"
              element={
                <PlanProtectedRoute requiredPlan="standard">
                  <AIToolsPage />
                </PlanProtectedRoute>
              }
            />

            <Route
              path="/exam-builder"
              element={
                <PlanProtectedRoute requiredPlan="pro">
                  <ExamBuilder />
                </PlanProtectedRoute>
              }
            />

            <Route
              path="/social-studio"
              element={
                <PlanProtectedRoute requiredPlan="pro">
                  <SocialStudioPage />
                </PlanProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;