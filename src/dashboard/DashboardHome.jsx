import {
  BarChart3,
  Brain,
  CalendarDays,
  CreditCard,
  Users,
} from "lucide-react";

import ActivityFeed from "../components/ActivityFeed";

function DashboardHome() {
  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>NEXNENA TEACHER OS</span>

          <h1>Good evening, Sanjula 👋</h1>

          <p>
            Your AI command center for today’s education operations.
          </p>
        </div>

        <button>May 2026</button>
      </div>

      <div className="dashKpiGrid">
        <div className="dashKpiCard">
          <Users />
          <p>Total Students</p>
          <h2>248</h2>
          <span>+12 this month</span>
        </div>

        <div className="dashKpiCard">
          <CreditCard />
          <p>Monthly Revenue</p>
          <h2>LKR 128,450</h2>
          <span>+18.6%</span>
        </div>

        <div className="dashKpiCard">
          <CalendarDays />
          <p>Attendance Rate</p>
          <h2>86.7%</h2>
          <span>+6.4%</span>
        </div>

        <div className="dashKpiCard">
          <BarChart3 />
          <p>Engagement Score</p>
          <h2>78/100</h2>
          <span>+9 pts</span>
        </div>
      </div>

      <div className="dashContentGrid">
        <div className="dashPanel large">
          <h3>AI Insights</h3>

          <div className="dashInsight">
            <Brain />

            <div>
              <h4>12 students are at revision risk</h4>

              <p>
                They are falling behind in two or more learning areas.
              </p>
            </div>
          </div>

          <div className="dashInsight">
            <BarChart3 />

            <div>
              <h4>Biology engagement improved</h4>

              <p>
                Engagement increased by 15% compared with last week.
              </p>
            </div>
          </div>

          <div className="dashInsight">
            <CreditCard />

            <div>
              <h4>5 payments are pending</h4>

              <p>
                Total pending amount: LKR 18,750.
              </p>
            </div>
          </div>

          <ActivityFeed />
        </div>

        <div className="dashPanel">
          <h3>Upcoming Classes</h3>

          <div className="dashClassItem">
            <strong>Physics Theory</strong>

            <span>Today · 6.00 PM</span>
          </div>

          <div className="dashClassItem">
            <strong>Chemistry Revision</strong>

            <span>Tomorrow · 8.00 AM</span>
          </div>

          <div className="dashClassItem">
            <strong>Combined Maths</strong>

            <span>Tomorrow · 6.00 PM</span>
          </div>
        </div>

        <div className="dashPanel">
          <h3>Quick AI Actions</h3>

          <div className="dashActionGrid">
            <button>Generate Tute</button>

            <button>Create MCQs</button>

            <button>Build Planner</button>

            <button>Write Caption</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardHome;