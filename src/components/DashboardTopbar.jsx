import {
  Bell,
  Search,
} from "lucide-react";

import { useState } from "react";

import NotificationPanel from "./NotificationPanel";

function DashboardTopbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="dashboardTopbar">
      <div className="topbarSearch">
        <Search size={18} />

        <input placeholder="Search students, analytics, AI tools..." />
      </div>

      <div className="topbarRight">
        <div className="aiStatus">
          <span></span>
          AI Engine Online
        </div>

        <div className="notificationWrapper">
          <button
            className="notificationBtn"
            onClick={() => setOpen(!open)}
          >
            <Bell size={18} />

            <div className="notificationDot"></div>
          </button>

          {open && <NotificationPanel />}
        </div>

        <div className="topbarProfile">
          <div className="profileAvatar">
            S
          </div>

          <div>
            <h4>Sanjula</h4>
            <p>Founder</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardTopbar;