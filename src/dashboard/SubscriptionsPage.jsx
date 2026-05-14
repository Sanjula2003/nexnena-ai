import { useEffect, useMemo, useState } from "react";

import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import {
  CheckCircle,
  CreditCard,
  Pencil,
  Plus,
  UserPlus,
  X,
} from "lucide-react";

import { auth, db } from "../firebase";

function SubscriptionsPage() {
  const [records, setRecords] = useState([]);
  const [topics, setTopics] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("paid");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  async function fetchData() {
    try {
      if (!auth.currentUser) return;

      const teacherId = auth.currentUser.uid;

      const subQuery = query(
        collection(db, "subscriptions"),
        where("teacherId", "==", teacherId)
      );

      const topicQuery = query(
        collection(db, "topics"),
        where("teacherId", "==", teacherId)
      );

      const subSnap = await getDocs(subQuery);
      const topicSnap = await getDocs(topicQuery);

      setRecords(
        subSnap.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))
      );

      setTopics(
        topicSnap.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }))
      );
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  function clearForm() {
    setEditingId(null);
    setStudentName("");
    setEmail("");
    setTopic("");
    setAmount("");
    setPaymentStatus("paid");
    setPaymentMethod("Cash");
  }

  async function syncStudentAccess(data) {
    if (!auth.currentUser) return;

    const teacherId = auth.currentUser.uid;
    const cleanEmail = data.email.toLowerCase().trim();

    const accessQuery = query(
      collection(db, "student_access"),
      where("teacherId", "==", teacherId),
      where("email", "==", cleanEmail),
      where("topic", "==", data.topic)
    );

    const accessSnap = await getDocs(accessQuery);

    const payload = {
      teacherId,
      studentName: data.studentName,
      email: cleanEmail,
      topic: data.topic,
      paymentStatus: data.paymentStatus,
      updatedAt: serverTimestamp(),
    };

    if (!accessSnap.empty) {
      const existingDoc = accessSnap.docs[0];
      await updateDoc(doc(db, "student_access", existingDoc.id), payload);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (saving) return;

    if (!auth.currentUser) {
      alert("Teacher login not found. Please log in again.");
      return;
    }

    if (!studentName || !email || !topic || !amount) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);

      const teacherId = auth.currentUser.uid;
      const cleanEmail = email.toLowerCase().trim();

      const duplicate = records.some(
        (item) =>
          item.email?.toLowerCase().trim() === cleanEmail &&
          item.topic === topic &&
          item.id !== editingId
      );

      if (duplicate) {
        alert("This student already has a record for this topic.");
        return;
      }

      const payload = {
        teacherId,
        studentName,
        email: cleanEmail,
        topic,
        amount: Number(amount),
        paymentStatus,
        paymentMethod,
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await updateDoc(doc(db, "subscriptions", editingId), payload);
        await syncStudentAccess(payload);
        alert("Student record updated successfully.");
      } else {
        const temporaryPassword =
          "Student@" + Math.floor(1000 + Math.random() * 9000);

        const response = await fetch(
            "https://YOUR-RENDER-BACKEND.onrender.com/create-student",
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                teacherId,
                studentName,
                email: cleanEmail,
                password: temporaryPassword,
                topic,
                amount,
                paymentStatus,
                paymentMethod,
                }),
            }
            );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to create student.");
        }

        alert(
          `Student account created successfully.\n\nLogin Email: ${cleanEmail}\nTemporary Password: ${temporaryPassword}`
        );
      }

      clearForm();
      fetchData();
    } catch (error) {
      console.error("Failed to save record:", error);
      alert(error.message || "Failed to save student record.");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(item) {
    setEditingId(item.id);
    setStudentName(item.studentName || "");
    setEmail(item.email || "");
    setTopic(item.topic || "");
    setAmount(item.amount || "");
    setPaymentStatus(item.paymentStatus || "paid");
    setPaymentMethod(item.paymentMethod || "Cash");
  }

  const stats = useMemo(() => {
    const totalRevenue = records.reduce((sum, item) => {
      if (item.paymentStatus !== "paid") return sum;
      return sum + Number(item.amount || 0);
    }, 0);

    return {
      totalStudents: records.length,
      paidStudents: records.filter((item) => item.paymentStatus === "paid")
        .length,
      unpaidStudents: records.filter((item) => item.paymentStatus === "unpaid")
        .length,
      totalRevenue,
    };
  }, [records]);

  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>BASIC PACKAGE</span>
          <h1>Students & Payments</h1>
          <p>
            Register students, assign topic access, and record tuition payments
            in one place.
          </p>
        </div>
      </div>

      <div className="studentStatsGrid">
        <div className="studentStatCard">
          <UserPlus size={28} />
          <div>
            <h3>{stats.totalStudents}</h3>
            <p>Total Records</p>
          </div>
        </div>

        <div className="studentStatCard">
          <CheckCircle size={28} />
          <div>
            <h3>{stats.paidStudents}</h3>
            <p>Paid Students</p>
          </div>
        </div>

        <div className="studentStatCard">
          <CreditCard size={28} />
          <div>
            <h3>{stats.unpaidStudents}</h3>
            <p>Unpaid Students</p>
          </div>
        </div>

        <div className="studentStatCard">
          <CreditCard size={28} />
          <div>
            <h3>Rs. {stats.totalRevenue.toLocaleString()}</h3>
            <p>Total Paid Amount</p>
          </div>
        </div>
      </div>

      <div className="dashPanel">
        <div className="sectionTitle">
          <UserPlus size={20} />
          <h3>{editingId ? "Update Student Record" : "Add Student Record"}</h3>
        </div>

        <form className="studentAccessForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Student Login Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">Select Topic</option>
            {topics.map((item) => (
              <option key={item.id} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Payment Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Online Payment">Online Payment</option>
            <option value="Other">Other</option>
          </select>

          <button type="submit" disabled={saving}>
            {editingId ? (
              <>
                <Pencil size={18} />
                {saving ? "Updating..." : "Update Record"}
              </>
            ) : (
              <>
                <Plus size={18} />
                {saving ? "Creating Student..." : "Add Record"}
              </>
            )}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancelAccessBtn"
              onClick={clearForm}
              disabled={saving}
            >
              <X size={18} />
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <div className="dashPanel studentAccessPanel">
        <div className="sectionTitle">
          <CreditCard size={20} />
          <h3>Student Payment Records</h3>
        </div>

        <div className="studentAccessTableWrapper">
          <table className="studentsTable">
            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Topic</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Method</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records.map((item) => (
                <tr key={item.id}>
                  <td>{item.studentName}</td>
                  <td>{item.email}</td>
                  <td>{item.topic}</td>
                  <td>Rs. {Number(item.amount || 0).toLocaleString()}</td>
                  <td>
                    <span
                      className={
                        item.paymentStatus === "paid"
                          ? "statusBadge greenBadge"
                          : "statusBadge redBadge"
                      }
                    >
                      {item.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td>{item.paymentMethod || "Cash"}</td>
                  <td>
                    <div className="studentAccessActions">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        disabled={saving}
                      >
                        <Pencil size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {records.length === 0 && (
                <tr>
                  <td colSpan="7" className="emptyState">
                    No student payment records added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default SubscriptionsPage;
