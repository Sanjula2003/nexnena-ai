import { Bell, Brain, CreditCard, User } from "lucide-react";

function SettingsPage() {
  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>PLATFORM SETTINGS</span>
          <h1>Teacher OS Configuration</h1>
          <p>Manage profile, AI preferences, notifications, and subscription settings.</p>
        </div>
        <button>Workspace Active</button>
      </div>

      <div className="settingsGrid">
        <div className="settingsCard">
          <User size={22} />
          <h3>Teacher Profile</h3>
          <p>Manage teacher name, institution, subject area, and workspace identity.</p>
          <div className="settingField">Sanjula Bandara</div>
          <div className="settingField">Advanced Level Science Stream</div>
        </div>

        <div className="settingsCard">
          <Brain size={22} />
          <h3>AI Preferences</h3>
          <p>Control AI tone, difficulty level, content style, and generation behavior.</p>
          <div className="toggleRow"><span>Exam-focused outputs</span><button>ON</button></div>
          <div className="toggleRow"><span>Sinhala support</span><button>ON</button></div>
        </div>

        <div className="settingsCard">
          <Bell size={22} />
          <h3>Notifications</h3>
          <p>Configure alerts for student risks, payments, attendance, and AI outputs.</p>
          <div className="toggleRow"><span>Revision risk alerts</span><button>ON</button></div>
          <div className="toggleRow"><span>Payment reminders</span><button>ON</button></div>
        </div>

        <div className="settingsCard">
          <CreditCard size={22} />
          <h3>Subscription</h3>
          <p>Current demo workspace plan and future billing configuration.</p>
          <div className="planBox">
            <h4>Professional Demo</h4>
            <span>Active MVP Workspace</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SettingsPage;