import { useEffect, useState } from "react";

import {
  AlertTriangle,
  Brain,
  TrendingUp,
  Users,
  ShieldAlert,
} from "lucide-react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase";

function StudentAnalytics() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "students"),
      (snapshot) => {
        const studentData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setStudents(studentData);
      }
    );

    return () => unsubscribe();
  }, []);

  const totalStudents = students.length;

  const lowAttendanceStudents = students.filter(
    (student) => Number(student.attendance) < 65
  );

  const highRiskStudents = students.filter(
    (student) =>
      Number(student.attendance) < 50 ||
      Number(student.performance) < 45
  );

  const averageAttendance =
    students.length > 0
      ? (
          students.reduce(
            (sum, student) =>
              sum + Number(student.attendance || 0),
            0
          ) / students.length
        ).toFixed(1)
      : 0;

  const averagePerformance =
    students.length > 0
      ? (
          students.reduce(
            (sum, student) =>
              sum + Number(student.performance || 0),
            0
          ) / students.length
        ).toFixed(1)
      : 0;

  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>AI ANALYTICS</span>

          <h1>NexNena Student Intelligence</h1>

          <p>
            AI-powered educational analytics and student risk intelligence.
          </p>
        </div>

        <button>Analytics AI Active</button>
      </div>

      <div className="analyticsKPIGrid">
        <div className="analyticsCard">
          <Users size={28} />

          <h3>{totalStudents}</h3>

          <p>Total Students</p>
        </div>

        <div className="analyticsCard">
          <TrendingUp size={28} />

          <h3>{averageAttendance}%</h3>

          <p>Average Attendance</p>
        </div>

        <div className="analyticsCard">
          <Brain size={28} />

          <h3>{averagePerformance}%</h3>

          <p>Average Performance</p>
        </div>

        <div className="analyticsCard riskCard">
          <ShieldAlert size={28} />

          <h3>{highRiskStudents.length}</h3>

          <p>High Risk Students</p>
        </div>
      </div>

      <div className="insightGrid">
        <div className="insightPanel">
          <div className="workspaceTop">
            <div>
              <h3>AI Educational Insights</h3>

              <p>Automatically generated learning intelligence.</p>
            </div>

            <div className="workspaceBadge">
              <Brain size={16} />
              Live AI
            </div>
          </div>

          <div className="insightList">
            <div className="insightItem">
              <AlertTriangle size={18} />

              <div>
                <h4>
                  {lowAttendanceStudents.length} students are below
                  65% attendance
                </h4>

                <p>
                  Attendance risk detected across multiple classes.
                </p>
              </div>
            </div>

            <div className="insightItem">
              <TrendingUp size={18} />

              <div>
                <h4>
                  Student engagement increased this month
                </h4>

                <p>
                  Average performance trend shows positive growth.
                </p>
              </div>
            </div>

            <div className="insightItem">
              <ShieldAlert size={18} />

              <div>
                <h4>
                  {highRiskStudents.length} students need urgent
                  academic support
                </h4>

                <p>
                  AI detected performance and attendance risk.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="insightPanel">
          <div className="workspaceTop">
            <div>
              <h3>High Risk Students</h3>

              <p>AI-flagged educational risk profiles.</p>
            </div>

            <div className="workspaceBadge">
              <ShieldAlert size={16} />
              Risk Engine
            </div>
          </div>

          <div className="riskStudentList">
            {highRiskStudents.length === 0 ? (
              <p className="emptyText">
                No high-risk students detected.
              </p>
            ) : (
              highRiskStudents.map((student) => (
                <div
                  key={student.id}
                  className="riskStudentCard"
                >
                  <h4>{student.name}</h4>

                  <div className="riskMetrics">
                    <span>
                      Attendance: {student.attendance}%
                    </span>

                    <span>
                      Performance: {student.performance}%
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudentAnalytics;