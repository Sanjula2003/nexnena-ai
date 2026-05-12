import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

function NotFound() {
  return (
    <section className="notFoundPage">
      <div className="loginLogo">
        <Sparkles size={28} />
      </div>
      <h1>404</h1>
      <p>This page does not exist in the NexNena AI workspace.</p>
      <Link to="/" className="primaryBtn">Back to Home</Link>
    </section>
  );
}

export default NotFound;