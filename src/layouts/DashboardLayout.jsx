import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  BookOpen,
  CreditCard,
  GraduationCap,
  Home,
  Menu,
  Settings,
  X,
} from "lucide-react";

import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import DashboardTopbar from "../components/DashboardTopbar";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
  { label: "Topics", path: "/topics", icon: <BookOpen size={18} /> },
  { label: "Students & Payments", path: "/subscriptions", icon: <CreditCard size={18} /> },
  { label: "Settings", path: "/settings", icon: <Settings size={18} /> },
];

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [teacherPlan, setTeacherPlan] = useState("basic");

  function closeSidebar() {
    setSidebarOpen(false);
  }

  useEffect(() => {
    async function fetchTeacherPlan() {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setTeacherPlan(userSnap.data().plan || "basic");
        }
      } catch (error) {
        console.error("Failed to fetch teacher plan:", error);
      }
    }

    fetchTeacherPlan();
  }, []);

  return (
    <div className="dashShell">
      <button
        className="mobileDashMenu"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {sidebarOpen && (
        <div className="dashboardOverlay" onClick={closeSidebar}></div>
      )}

      <aside className={`dashSidebar ${sidebarOpen ? "mobileOpen" : ""}`}>
        <div className="dashBrand">
          <div className="dashLogo">
            <GraduationCap size={22} />
          </div>

          <div>
            <h2>NexNena</h2>
            <p>Learning Portal</p>
          </div>
        </div>

        <div className="currentPlanBadge">
          Current Plan:
          <span>{teacherPlan.toUpperCase()}</span>
        </div>

        <nav className="dashNav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) => (isActive ? "dashActive" : "")}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="dashMain">
        <DashboardTopbar />
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;