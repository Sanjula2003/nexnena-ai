import { Brain, Lock, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function LoginPage() {
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
          <span>WELCOME BACK</span>

          <h1>Access Your AI Workspace</h1>

          <p>
            Manage students, analytics, AI tools, and educational operations
            from one intelligent platform.
          </p>

          <div className="loginInputs">
            <div className="loginInput">
              <Mail size={18} />
              <input placeholder="Teacher Email" />
            </div>

            <div className="loginInput">
              <Lock size={18} />
              <input type="password" placeholder="Password" />
            </div>
          </div>

          <Link to="/dashboard" className="loginBtn">
            <Brain size={18} />
            Continue to Teacher OS
          </Link>

          <div className="demoAccess">
            <p>Quick Demo Access</p>

            <Link to="/dashboard">
              Explore Demo Workspace
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;