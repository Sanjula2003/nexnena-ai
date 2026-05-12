import { Sparkles, Menu } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <div className="logoBox">
          <Sparkles size={22} />
        </div>

        <div>
          <h2>NexNena AI</h2>
          <p>The Future OS for Education</p>
        </div>
      </Link>

      <div className="navLinks">
        <a href="#product">Product</a>
        <a href="#features">AI Features</a>
        <a href="#solutions">Solutions</a>
        <a href="#pricing">Pricing</a>
        <a href="#about">About</a>
      </div>

      <div className="navActions">
        <Link to="/login" className="loginNavBtn">
          Login
        </Link>

        <Link to="/login" className="demoBtn">
          Book a Demo
        </Link>
      </div>

      <button className="mobileMenu">
        <Menu size={24} />
      </button>
    </nav>
  );
}

export default Navbar;