import { Sparkles, Menu } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">
        <div className="logoBox">
          <Sparkles size={22} />
        </div>
        <div>
          <h2>NexNena AI</h2>
          <p>The Future OS for Education</p>
        </div>
      </div>

      <div className="navLinks">
        <a href="#">Product</a>
        <a href="#">AI Features</a>
        <a href="#">Solutions</a>
        <a href="#">Pricing</a>
        <a href="#">About</a>
      </div>

      <div className="navActions">
        <button className="loginBtn">Login</button>
        <button className="demoBtn">Book a Demo</button>
      </div>

      <button className="mobileMenu">
        <Menu size={24} />
      </button>
    </nav>
  );
}

export default Navbar;