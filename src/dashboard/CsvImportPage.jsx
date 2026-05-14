import { useState } from "react";
import Papa from "papaparse";
import { Upload, FileSpreadsheet, CheckCircle, AlertTriangle } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../firebase";

function CsvImportPage() {
  const [rows, setRows] = useState([]);
  const [message, setMessage] = useState("");
  const [importing, setImporting] = useState(false);

  function handleFileUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setRows(results.data);
        setMessage(`${results.data.length} students loaded from CSV.`);
      },
      error: function () {
        setMessage("CSV reading failed. Please check your file format.");
      },
    });
  }

  async function importStudents() {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setMessage("Please login again.");
      return;
    }

    if (rows.length === 0) {
      setMessage("Please upload a CSV file first.");
      return;
    }

    setImporting(true);

    try {
      for (const row of rows) {
        await addDoc(collection(db, "students"), {
          name: row.name || row.Name || "",
          email: row.email || row.Email || "",
          phone: row.phone || row.Phone || "",
          paymentAmount: row.paymentAmount || row.amount || row.Amount || "",
          paymentStatus:
            row.paymentStatus ||
            row.status ||
            row.Status ||
            "pending",
          topic: row.topic || row.Topic || "",
          teacherId: currentUser.uid,
          createdAt: serverTimestamp(),
        });

        await addDoc(collection(db, "student_access"), {
          studentEmail: row.email || row.Email || "",
          studentName: row.name || row.Name || "",
          phone: row.phone || row.Phone || "",
          topic: row.topic || row.Topic || "",
          paymentAmount: row.paymentAmount || row.amount || row.Amount || "",
          paymentStatus:
            row.paymentStatus ||
            row.status ||
            row.Status ||
            "pending",
          teacherId: currentUser.uid,
          createdAt: serverTimestamp(),
        });
      }

      setMessage(`${rows.length} students imported successfully.`);
      setRows([]);
    } catch (error) {
      console.error(error);
      setMessage("Import failed. Please check Firebase rules.");
    } finally {
      setImporting(false);
    }
  }

  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>CSV IMPORT</span>
          <h1>Bulk Student Import</h1>
          <p>
            Upload student payment records and automatically load them into the
            learning portal.
          </p>
        </div>

        <button>{rows.length} Rows Loaded</button>
      </div>

      <div className="csvImportGrid">
        <div className="csvImportPanel">
          <div className="workspaceTop">
            <div>
              <h3>Upload CSV File</h3>
              <p>Supported columns: name, email, phone, paymentAmount, paymentStatus, topic</p>
            </div>

            <div className="workspaceBadge">
              <FileSpreadsheet size={16} />
              CSV Ready
            </div>
          </div>

          <label className="csvUploadBox">
            <Upload size={34} />
            <h3>Choose CSV File</h3>
            <p>Click here and select teacher student CSV file.</p>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
          </label>

          {message && (
            <div className="csvMessage">
              {message.includes("success") || message.includes("loaded") ? (
                <CheckCircle size={18} />
              ) : (
                <AlertTriangle size={18} />
              )}
              {message}
            </div>
          )}

          <button className="generateBtn csvImportBtn" onClick={importStudents}>
            <Upload size={18} />
            {importing ? "Importing..." : "Import Students"}
          </button>
        </div>

        <div className="csvPreviewPanel">
          <h3>CSV Preview</h3>

          {rows.length === 0 ? (
            <p className="emptyText">No CSV data loaded yet.</p>
          ) : (
            <div className="csvTableWrapper">
              <table className="csvTable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Topic</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.slice(0, 10).map((row, index) => (
                    <tr key={index}>
                      <td>{row.name || row.Name}</td>
                      <td>{row.email || row.Email}</td>
                      <td>{row.phone || row.Phone}</td>
                      <td>{row.paymentAmount || row.amount || row.Amount}</td>
                      <td>{row.paymentStatus || row.status || row.Status || "pending"}</td>
                      <td>{row.topic || row.Topic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="csvNote">
                Showing first 10 rows only. Full file will be imported.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CsvImportPage;