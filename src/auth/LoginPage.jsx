import { useState } from "react";
import { BookOpen, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.toLowerCase().trim(),
        password
      );

      const userRef = doc(db, "users", userCredential.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setError("Account profile not found. Please contact admin.");
        return;
      }

      const role = userSnap.data().role;

      if (role === "teacher") {
        navigate("/dashboard");
        return;
      }

      if (role === "student") {
        navigate("/student-portal");
        return;
      }

      setError("Invalid account role. Please contact admin.");
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="loginPage">
      <div className="loginGlowOne"></div>
      <div className="loginGlowTwo"></div>

      <div className="loginCard">
        <div className="loginBrand">
          <div className="loginLogo">
            <BookOpen size={24} />
          </div>

          <div>
            <h2>NexNena</h2>
            <p>Learning Portal</p>
          </div>
        </div>

        <div className="loginContent">
          <span>SECURE LEARNING ACCESS</span>

          <h1>Login to Your Portal</h1>

          <p>
            Teachers can manage classes and students can access their purchased
            learning content securely.
          </p>

          <div className="loginInputs">
            <div className="loginInput">
              <Mail size={18} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="loginInput">
              <Lock size={18} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="authError">{error}</p>}

          <button
            className="loginPageBtn"
            onClick={handleSubmit}
            disabled={loading}
          >
            <BookOpen size={18} />
            {loading ? "Logging in..." : "Login to Portal"}
          </button>

          <div className="demoAccess">
            <p>Need access?</p>

            <a href="mailto:nexnenaai@gmail.com">
              Contact your teacher or NexNena admin
            </a>

            <Link to="/">Back to homepage</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;