import { useState } from "react";
import { Plus } from "lucide-react";

function AddStudentForm({ onAddStudent }) {
  const [student, setStudent] = useState({
    name: "",
    subject: "",
    attendance: "",
    engagement: "High",
    risk: "Low",
    weak: "",
  });

  function handleChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!student.name || !student.subject) {
      alert("Please add student name and subject.");
      return;
    }

    onAddStudent(student);

    setStudent({
      name: "",
      subject: "",
      attendance: "",
      engagement: "High",
      risk: "Low",
      weak: "",
    });
  }

  return (
    <form className="addStudentForm" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Student name"
        value={student.name}
        onChange={handleChange}
      />

      <input
        name="subject"
        placeholder="Subject"
        value={student.subject}
        onChange={handleChange}
      />

      <input
        name="attendance"
        placeholder="Attendance %"
        value={student.attendance}
        onChange={handleChange}
      />

      <select name="engagement" value={student.engagement} onChange={handleChange}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <select name="risk" value={student.risk} onChange={handleChange}>
        <option>Low</option>
        <option>Moderate</option>
        <option>High</option>
      </select>

      <input
        name="weak"
        placeholder="Weak area"
        value={student.weak}
        onChange={handleChange}
      />

      <button type="submit">
        <Plus size={18} />
        Add Student
      </button>
    </form>
  );
}

export default AddStudentForm;