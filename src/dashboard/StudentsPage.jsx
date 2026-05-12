import { useEffect, useState } from "react";
import { AlertTriangle, Brain, Search, Trash2, Users } from "lucide-react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { auth, db } from "../firebase";
import AddStudentForm from "./AddStudentForm";

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "students"),
      where("teacherId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const studentData = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));

      setStudents(studentData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  async function handleAddStudent(student) {
    if (!currentUser) return;

    await addDoc(collection(db, "students"), {
      ...student,
      teacherId: currentUser.uid,
      createdAt: serverTimestamp(),
    });
  }

  async function handleDeleteStudent(id) {
    await deleteDoc(doc(db, "students", id));
  }

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>STUDENT MANAGEMENT</span>
          <h1>Student Intelligence System</h1>
          <p>
            Track student engagement, attendance, risks, and AI-powered
            educational insights using real Firestore data.
          </p>
        </div>

        <button>Total Students · {students.length}</button>
      </div>

      <AddStudentForm onAddStudent={handleAddStudent} />

      <div className="studentTopGrid">
        <div className="studentSearchBox">
          <Search size={18} />
          <input
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="studentStatCard">
          <Users size={18} />
          <div>
            <h3>{students.length}</h3>
            <p>Total Students</p>
          </div>
        </div>

        <div className="studentStatCard">
          <Brain size={18} />
          <div>
            <h3>{students.filter((s) => s.risk === "High").length}</h3>
            <p>AI Risk Alerts</p>
          </div>
        </div>

        <div className="studentStatCard">
          <AlertTriangle size={18} />
          <div>
            <h3>{students.filter((s) => s.risk !== "Low").length}</h3>
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
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="7" className="emptyState">
                  No students found. Add your first student above.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.subject}</td>
                  <td>{student.attendance || "N/A"}</td>

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

                  <td>{student.weak || "N/A"}</td>

                  <td>
                    <button
                      className="deleteStudentBtn"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="studentInsightsGrid">
        <div className="dashPanel">
          <h3>AI Recommendations</h3>

          <div className="dashInsight">
            <Brain />
            <div>
              <h4>Risk-based revision support</h4>
              <p>
                High-risk students should receive targeted revision material
                and additional practice tasks.
              </p>
            </div>
          </div>

          <div className="dashInsight">
            <Brain />
            <div>
              <h4>Engagement optimization</h4>
              <p>
                Students with low engagement can be improved using reminders,
                short quizzes, and AI-generated summaries.
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