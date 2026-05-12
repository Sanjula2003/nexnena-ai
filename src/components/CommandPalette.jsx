import { Link } from "react-router-dom";
import { BarChart3, Brain, Home, Search, Settings, Users } from "lucide-react";

const commands = [
  { label: "Open Dashboard", path: "/dashboard", icon: <Home size={18} /> },
  { label: "View Students", path: "/students", icon: <Users size={18} /> },
  { label: "Open Analytics", path: "/analytics", icon: <BarChart3 size={18} /> },
  { label: "Launch AI Tools", path: "/ai-tools", icon: <Brain size={18} /> },
  { label: "Settings", path: "/settings", icon: <Settings size={18} /> },
];

function CommandPalette({ close }) {
  return (
    <div className="commandOverlay" onClick={close}>
      <div className="commandPalette" onClick={(e) => e.stopPropagation()}>
        <div className="commandSearch">
          <Search size={18} />
          <input placeholder="Search commands..." autoFocus />
        </div>

        <div className="commandList">
          {commands.map((item) => (
            <Link to={item.path} onClick={close} key={item.label}>
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;