import { useState } from "react";
import { Brain, Lock, Mail, Sparkles, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";

function LoginPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Check your email/password or create a new account.");
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
            <p>Teacher OS Platform</p>
          </div>
        </div>

        <div className="loginContent">
          <span>{mode === "login" ? "WELCOME BACK" : "CREATE ACCOUNT"}</span>

          <h1>
            {mode === "login"
              ? "Access Your AI Workspace"
              : "Start Your Teacher OS"}
          </h1>

          <p>
            Manage students, analytics, AI tools, and educational operations
            from one intelligent platform.
          </p>

          <div className="loginInputs">
            <div className="loginInput">
              <Mail size={18} />
              <input
                type="email"
                placeholder="Teacher Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="loginInput">
              <Lock size={18} />
              <input
                type="password"
                placeholder="Password - minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="authError">{error}</p>}

          <button className="loginPageBtn" onClick={handleSubmit} disabled={loading}>
            {mode === "login" ? <Brain size={18} /> : <UserPlus size={18} />}
            {loading
              ? "Processing..."
              : mode === "login"
              ? "Login to Teacher OS"
              : "Create Teacher Account"}
          </button>

          <div className="demoAccess">
            <p>
              {mode === "login"
                ? "New to NexNena AI?"
                : "Already have an account?"}
            </p>

            <button
              className="authSwitchBtn"
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError("");
              }}
            >
              {mode === "login"
                ? "Create a new teacher account"
                : "Login to existing account"}
            </button>

            <Link to="/dashboard">Explore Demo Workspace</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;