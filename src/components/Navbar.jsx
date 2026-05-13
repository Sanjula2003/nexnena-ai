import { useState } from "react";
import { Sparkles, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand" onClick={closeMenu}>
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

      <button className="mobileMenu" onClick={() => setOpen(!open)}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="mobileNavDropdown">
          <a href="#product" onClick={closeMenu}>Product</a>
          <a href="#features" onClick={closeMenu}>AI Features</a>
          <a href="#solutions" onClick={closeMenu}>Solutions</a>
          <a href="#pricing" onClick={closeMenu}>Pricing</a>
          <a href="#about" onClick={closeMenu}>About</a>

          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>

          <Link to="/login" className="mobileDemoBtn" onClick={closeMenu}>
            Book a Demo
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;