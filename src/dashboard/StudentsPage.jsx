import {
  AlertTriangle,
  Brain,
  Search,
  Users,
} from "lucide-react";

const students = [
  {
    name: "Nethmi Perera",
    subject: "Biology",
    attendance: "92%",
    engagement: "High",
    risk: "Low",
    weak: "Organic Chemistry",
  },
  {
    name: "Kasun Silva",
    subject: "Combined Maths",
    attendance: "68%",
    engagement: "Medium",
    risk: "Moderate",
    weak: "Vectors",
  },
  {
    name: "Ayesha Fernando",
    subject: "Physics",
    attendance: "54%",
    engagement: "Low",
    risk: "High",
    weak: "Mechanics",
  },
  {
    name: "Dulanjana Jayasuriya",
    subject: "Chemistry",
    attendance: "88%",
    engagement: "High",
    risk: "Low",
    weak: "Chemical Bonding",
  },
];

function StudentsPage() {
  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>STUDENT MANAGEMENT</span>

          <h1>Student Intelligence System</h1>

          <p>
            Track student engagement, attendance, risks, and AI-powered
            educational insights.
          </p>
        </div>

        <button>Total Students · 248</button>
      </div>

      <div className="studentTopGrid">
        <div className="studentSearchBox">
          <Search size={18} />
          <input placeholder="Search students..." />
        </div>

        <div className="studentStatCard">
          <Users size={18} />
          <div>
            <h3>86%</h3>
            <p>Average Attendance</p>
          </div>
        </div>

        <div className="studentStatCard">
          <Brain size={18} />
          <div>
            <h3>18</h3>
            <p>AI Risk Alerts</p>
          </div>
        </div>

        <div className="studentStatCard">
          <AlertTriangle size={18} />
          <div>
            <h3>12</h3>
            <p>Revision Risks</p>
          </div>
        </div>
      </div>

      <div className="studentsTableWrapper">
        <table className="studentsTable">
          <thead>
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Attendance</th>
              <th>Engagement</th>
              <th>Risk Level</th>
              <th>Weak Area</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.name}>
                <td>{student.name}</td>
                <td>{student.subject}</td>
                <td>{student.attendance}</td>

                <td>
                  <span
                    className={`statusBadge ${
                      student.engagement === "High"
                        ? "greenBadge"
                        : student.engagement === "Medium"
                        ? "blueBadge"
                        : "orangeBadge"
                    }`}
                  >
                    {student.engagement}
                  </span>
                </td>

                <td>
                  <span
                    className={`statusBadge ${
                      student.risk === "Low"
                        ? "greenBadge"
                        : student.risk === "Moderate"
                        ? "orangeBadge"
                        : "redBadge"
                    }`}
                  >
                    {student.risk}
                  </span>
                </td>

                <td>{student.weak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="studentInsightsGrid">
        <div className="dashPanel">
          <h3>AI Recommendations</h3>

          <div className="dashInsight">
            <Brain />
            <div>
              <h4>Schedule additional Mechanics revision</h4>
              <p>
                8 Physics students are struggling with Mechanics concepts.
              </p>
            </div>
          </div>

          <div className="dashInsight">
            <Brain />
            <div>
              <h4>Low engagement detected</h4>
              <p>
                Combined Maths evening batch engagement dropped this week.
              </p>
            </div>
          </div>
        </div>

        <div className="dashPanel">
          <h3>Revision Risk Heatmap</h3>

          <div className="heatmapGrid">
            <div className="heat high"></div>
            <div className="heat medium"></div>
            <div className="heat low"></div>
            <div className="heat high"></div>
            <div className="heat medium"></div>
            <div className="heat low"></div>
            <div className="heat medium"></div>
            <div className="heat high"></div>
            <div className="heat low"></div>
          </div>

          <p className="heatmapText">
            AI-generated visualization of revision consistency and learning
            risk patterns.
          </p>
        </div>
      </div>
    </section>
  );
}

export default StudentsPage;