import { useState } from "react";
import { Brain, Lock, Mail, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");

    if (!email || !password) {
      setError("Please enter your teacher email and password.");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        "Login failed. Please check your approved teacher email and password."
      );
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
            <Sparkles size={24} />
          </div>

          <div>
            <h2>NexNena AI</h2>
            <p>Invite-Only Teacher OS Platform</p>
          </div>
        </div>

        <div className="loginContent">
          <span>APPROVED TEACHER ACCESS</span>

          <h1>Access Your AI Workspace</h1>

          <p>
            NexNena AI is currently available for approved teachers and selected
            early users only.
          </p>

          <div className="loginInputs">
            <div className="loginInput">
              <Mail size={18} />
              <input
                type="email"
                placeholder="Approved teacher email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="loginInput">
              <Lock size={18} />
              <input
                type="password"
                placeholder="Teacher password"
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
            <Brain size={18} />
            {loading ? "Verifying..." : "Login to Teacher OS"}
          </button>

          <div className="demoAccess">
            <p>Need teacher access?</p>

            <a href="mailto:nexnenaai@gmail.com">
              Request an invite from NexNena AI
            </a>

            <Link to="/">Back to homepage</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;