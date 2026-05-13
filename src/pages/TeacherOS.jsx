import {
  BarChart3,
  Brain,
  CalendarDays,
  CreditCard,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import ScrollToTopButton from "../components/ScrollToTopButton";

const menu = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { icon: <Users size={18} />, label: "Students" },
  { icon: <CalendarDays size={18} />, label: "Classes" },
  { icon: <Brain size={18} />, label: "AI Tools" },
  { icon: <BarChart3 size={18} />, label: "Analytics" },
  { icon: <MessageSquare size={18} />, label: "Social Studio" },
  { icon: <CreditCard size={18} />, label: "Payments" },
  { icon: <Settings size={18} />, label: "Settings" },
];

function TeacherOS() {
  return (
    <section id="product" className="teacherSection">
      <div className="sectionHeader">
        <span>NEXNENA TEACHER OS</span>
        <h2>Your AI Command Center for Education.</h2>
        <p>
          A premium dashboard experience designed for teachers, institutes, and
          learning teams to manage students, content, analytics, and AI tools.
        </p>
      </div>

      <div className="teacherOSFrame">
        <aside className="osSidebar">
          <div className="osBrand">
            <div className="osLogo">
              <Sparkles size={22} />
            </div>
            <div>
              <h3>NexNena</h3>
              <p>Teacher OS</p>
            </div>
          </div>

          <nav className="osMenu">
            {menu.map((item, index) => (
              <button className={index === 0 ? "active" : ""} key={item.label}>
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="aiAssistantBox">
            <Brain size={22} />
            <div>
              <h4>AI Assistant</h4>
              <p>Ask anything...</p>
            </div>
          </div>
        </aside>

        <div className="osMain">
          <div className="osTopbar">
            <div>
              <h3>Good evening, Sanjula 👋</h3>
              <p>Here’s what’s happening across your classes today.</p>
            </div>
            <button>May 2026</button>
          </div>

          <div className="osKpis">
            <div className="osKpi">
              <p>Total Students</p>
              <h3>248</h3>
              <span>↑ 12 this month</span>
            </div>
            <div className="osKpi">
              <p>Monthly Revenue</p>
              <h3>LKR 128,450</h3>
              <span>↑ 18.6%</span>
            </div>
            <div className="osKpi">
              <p>Attendance Rate</p>
              <h3>86.7%</h3>
              <span>↑ 6.4%</span>
            </div>
            <div className="osKpi">
              <p>Engagement Score</p>
              <h3>78/100</h3>
              <span>↑ 9 pts</span>
            </div>
          </div>

          <div className="osGrid">
            <div className="osPanel large">
              <h4>AI Insights</h4>

              <div className="osInsight">
                <Brain size={18} />
                <div>
                  <h5>12 students are at revision risk</h5>
                  <p>They are falling behind in 2 or more subjects.</p>
                </div>
              </div>

              <div className="osInsight">
                <BarChart3 size={18} />
                <div>
                  <h5>Biology engagement increased</h5>
                  <p>Engagement improved by 15% compared to last week.</p>
                </div>
              </div>

              <div className="osInsight">
                <CreditCard size={18} />
                <div>
                  <h5>5 payments are pending</h5>
                  <p>Total pending amount: LKR 18,750.</p>
                </div>
              </div>
            </div>

            <div className="osPanel">
              <h4>Upcoming Classes</h4>
              <ul className="classList">
                <li>Physics Theory <span>Today · 6.00 PM</span></li>
                <li>Chemistry Revision <span>Tomorrow · 8.00 AM</span></li>
                <li>Combined Maths <span>Tomorrow · 6.00 PM</span></li>
                <li>Physics Paper Class <span>May 18 · 6.00 PM</span></li>
              </ul>
            </div>

            <div className="osPanel">
              <h4>Quick AI Tools</h4>
              <div className="toolGrid">
                <button><FileText size={18} /> AI Tute</button>
                <button><Brain size={18} /> MCQs</button>
                <button><Sparkles size={18} /> Summary</button>
                <button><BarChart3 size={18} /> Analytics</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </section>
  );
}

export default TeacherOS;