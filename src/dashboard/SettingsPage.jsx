import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { Save, User } from "lucide-react";
import { auth, db } from "../firebase";

function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [teacherName, setTeacherName] = useState("");
  const [instituteName, setInstituteName] = useState("");
  const [subjectStream, setSubjectStream] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);

        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();

          setTeacherName(data.name || "");
          setInstituteName(data.instituteName || "");
          setSubjectStream(data.subjectStream || "");
          setPhoneNumber(data.phoneNumber || "");
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  async function handleSave(e) {
    e.preventDefault();

    try {
      setSaving(true);

      const currentUser = auth.currentUser;

      if (!currentUser) {
        alert("User not found.");
        return;
      }

      const userRef = doc(db, "users", currentUser.uid);

      await setDoc(
        userRef,
        {
          name: teacherName,
          instituteName,
          subjectStream,
          phoneNumber,
          email: currentUser.email,
          role: "teacher",
          plan: "basic",
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      alert("Profile settings saved successfully.");
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert(error.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="dashPage">
      <div className="dashHeader">
        <div>
          <span>BASIC PACKAGE</span>
          <h1>Teacher Profile Settings</h1>
          <p>
            Manage your teacher profile details used across NexNena Learning
            Portal.
          </p>
        </div>
      </div>

      <div className="dashPanel">
        <div className="sectionTitle">
          <User size={22} />
          <h3>Profile Information</h3>
        </div>

        {loading ? (
          <div className="emptyTopicState">Loading profile settings...</div>
        ) : (
          <form className="studentAccessForm" onSubmit={handleSave}>
            <input
              type="text"
              placeholder="Teacher Name"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Institute / Class Name"
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Subject Stream"
              value={subjectStream}
              onChange={(e) => setSubjectStream(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <button type="submit" disabled={saving}>
              <Save size={18} />
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default SettingsPage;