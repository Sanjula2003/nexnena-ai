import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import {
  BarChart3,
  Brain,
  Home,
  MessageSquare,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import DashboardTopbar from "../components/DashboardTopbar";
import CommandPalette from "../components/CommandPalette";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
  { label: "Students", path: "/students", icon: <Users size={18} /> },
  { label: "Analytics", path: "/analytics", icon: <BarChart3 size={18} /> },
  { label: "AI Tools", path: "/ai-tools", icon: <Brain size={18} /> },
  { label: "Social Studio", path: "/social-studio", icon: <MessageSquare size={18} /> },
  { label: "Settings", path: "/settings", icon: <Settings size={18} /> },
];

function DashboardLayout() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div className="dashShell">
      <aside className="dashSidebar">
        <div className="dashBrand">
          <div className="dashLogo">
            <Sparkles size={22} />
          </div>
          <div>
            <h2>NexNena</h2>
            <p>Teacher OS</p>
          </div>
        </div>

        <nav className="dashNav">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => isActive ? "dashActive" : ""}>
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button className="commandBtn" onClick={() => setPaletteOpen(true)}>
          Ctrl + K · Command
        </button>

        <div className="dashAiBox">
          <Brain size={22} />
          <h4>AI Assistant</h4>
          <p>Ask about students, analytics, revision risks, or content generation.</p>
        </div>
      </aside>

      <main className="dashMain">
        <DashboardTopbar />
        <Outlet />
      </main>

      {paletteOpen && <CommandPalette close={() => setPaletteOpen(false)} />}
    </div>
  );
}

export default DashboardLayout;