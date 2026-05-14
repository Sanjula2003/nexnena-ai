import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

import {
  UserCheck,
  Plus,
  Trash2,
  Pencil,
  X,
  CheckCircle,
  Lock,
} from "lucide-react";

function StudentAccessPage() {
  const [accessList, setAccessList] = useState([]);
  const [topics, setTopics] = useState([]);

  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("paid");

  const [editingId, setEditingId] = useState(null);

  async function fetchAccess() {
    try {
      const snapshot = await getDocs(collection(db, "student_access"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAccessList(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchTopics() {
    try {
      const snapshot = await getDocs(collection(db, "topics"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTopics(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAccess();
    fetchTopics();
  }, []);

  function clearForm() {
    setStudentName("");
    setEmail("");
    setTopic("");
    setPaymentStatus("paid");
    setEditingId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!studentName || !email || !topic) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (editingId) {
        const accessRef = doc(db, "student_access", editingId);

        await updateDoc(accessRef, {
          studentName,
          email: email.toLowerCase().trim(),
          topic,
          paymentStatus,
          updatedAt: serverTimestamp(),
        });

        alert("Student access updated");
      } else {
        await addDoc(collection(db, "student_access"), {
          studentName,
          email: email.toLowerCase().trim(),
          topic,
          paymentStatus,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        alert("Student access created");
      }

      clearForm();
      fetchAccess();
    } catch (error) {
      console.error(error);
      alert("Failed to save student access");
    }
  }

  function startEdit(item) {
    setEditingId(item.id);
    setStudentName(item.studentName || "");
    setEmail(item.email || "");
    setTopic(item.topic || "");
    setPaymentStatus(item.paymentStatus || "paid");
  }

  async function deleteAccess(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student access?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "student_access", id));
      fetchAccess();
    } catch (error) {
      console.error(error);
      alert("Failed to delete access");
    }
  }

  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>STUDENT ACCESS</span>
          <h1>Student Access Management</h1>
          <p>
            Control which registered students can access paid tuition topics.
          </p>
        </div>
      </div>

      <div className="dashPanel">
        <div className="sectionTitle">
          <UserCheck size={20} />
          <h3>{editingId ? "Update Student Access" : "Add Student Access"}</h3>
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

          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>

          <button type="submit">
            {editingId ? (
              <>
                <Pencil size={18} />
                Update Access
              </>
            ) : (
              <>
                <Plus size={18} />
                Add Access
              </>
            )}
          </button>

          {editingId && (
            <button type="button" className="cancelAccessBtn" onClick={clearForm}>
              <X size={18} />
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      <div className="dashPanel studentAccessPanel">
        <div className="sectionTitle">
          <UserCheck size={20} />
          <h3>Access Records</h3>
        </div>

        <div className="studentAccessTableWrapper">
          <table className="studentsTable">
            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Topic</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {accessList.map((item) => (
                <tr key={item.id}>
                  <td>{item.studentName}</td>
                  <td>{item.email}</td>
                  <td>{item.topic}</td>
                  <td>
                    <span
                      className={
                        item.paymentStatus === "paid"
                          ? "statusBadge greenBadge"
                          : "statusBadge redBadge"
                      }
                    >
                      {item.paymentStatus === "paid" ? (
                        <>
                          <CheckCircle size={13} /> Paid
                        </>
                      ) : (
                        <>
                          <Lock size={13} /> Unpaid
                        </>
                      )}
                    </span>
                  </td>
                  <td>
                    <div className="studentAccessActions">
                      <button type="button" onClick={() => startEdit(item)}>
                        <Pencil size={15} />
                      </button>

                      <button
                        type="button"
                        className="deleteAccessBtn"
                        onClick={() => deleteAccess(item.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {accessList.length === 0 && (
                <tr>
                  <td colSpan="5" className="emptyState">
                    No student access records added yet.
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

export default StudentAccessPage;