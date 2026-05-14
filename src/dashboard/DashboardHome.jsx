import { useEffect, useMemo, useState } from "react";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  BookOpen,
  CheckCircle,
  CreditCard,
  UserPlus,
  XCircle,
} from "lucide-react";

import { auth, db } from "../firebase";

function DashboardHome() {
  const [teacherName, setTeacherName] = useState("Teacher");
  const [topics, setTopics] = useState([]);
  const [records, setRecords] = useState([]);

  async function fetchDashboardData() {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) return;

      const teacherId = currentUser.uid;

      const userRef = doc(db, "users", teacherId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setTeacherName(userSnap.data().name || "Teacher");
      }

      const topicsQuery = query(
        collection(db, "topics"),
        where("teacherId", "==", teacherId)
      );

      const recordsQuery = query(
        collection(db, "subscriptions"),
        where("teacherId", "==", teacherId)
      );

      const topicsSnap = await getDocs(topicsQuery);
      const recordsSnap = await getDocs(recordsQuery);

      setTopics(
        topicsSnap.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))
      );

      setRecords(
        recordsSnap.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))
      );
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = useMemo(() => {
    const paidRecords = records.filter(
      (item) => item.paymentStatus === "paid"
    );

    const unpaidRecords = records.filter(
      (item) => item.paymentStatus === "unpaid"
    );

    const revenue = paidRecords.reduce((sum, item) => {
      return sum + Number(item.amount || 0);
    }, 0);

    return {
      topicCount: topics.length,
      recordCount: records.length,
      paidCount: paidRecords.length,
      unpaidCount: unpaidRecords.length,
      revenue,
    };
  }, [topics, records]);

  const recentRecords = records.slice(0, 5);

  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>BASIC PACKAGE</span>

          <h1>Welcome back, {teacherName || "Teacher"} 👋</h1>

          <p>
            Manage students, payments, subject access, and lesson content from
            your tuition dashboard.
          </p>
        </div>
      </div>

      <div className="dashKpiGrid">
        <div className="dashKpiCard">
          <BookOpen />
          <p>Total Topics</p>
          <h2>{stats.topicCount}</h2>
          <span>Available subjects</span>
        </div>

        <div className="dashKpiCard">
          <UserPlus />
          <p>Student Records</p>
          <h2>{stats.recordCount}</h2>
          <span>Registered payment records</span>
        </div>

        <div className="dashKpiCard">
          <CheckCircle />
          <p>Paid Students</p>
          <h2>{stats.paidCount}</h2>
          <span>Portal access enabled</span>
        </div>

        <div className="dashKpiCard">
          <CreditCard />
          <p>Total Paid Amount</p>
          <h2>Rs. {stats.revenue.toLocaleString()}</h2>
          <span>Paid records only</span>
        </div>
      </div>

      <div className="dashContentGrid">
        <div className="dashPanel large">
          <h3>Recent Student Records</h3>

          {recentRecords.length === 0 ? (
            <div className="emptyTopicState">
              No student payment records yet.
            </div>
          ) : (
            recentRecords.map((item) => (
              <div className="dashInsight" key={item.id}>
                {item.paymentStatus === "paid" ? (
                  <CheckCircle />
                ) : (
                  <XCircle />
                )}

                <div>
                  <h4>{item.studentName || "Unnamed Student"}</h4>

                  <p>
                    {item.email} · {item.topic} · Rs.{" "}
                    {Number(item.amount || 0).toLocaleString()} ·{" "}
                    {item.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default DashboardHome;