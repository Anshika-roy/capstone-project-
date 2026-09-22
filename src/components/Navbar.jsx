// src/components/Navbar.jsx
//
// A reusable component. It receives no props here because every page
// needs the exact same navigation bar, but it uses React Router's
// <NavLink> so the *active* page is highlighted automatically.

import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  // A small helper passed to NavLink's className prop.
  // React Router calls this function for us and tells us if the link is active.
  const linkClass = ({ isActive }) => (isActive ? "nav-link active" : "nav-link");

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">✦</span> Travel Explorer
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/explore" className={linkClass}>Explore</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          <NavLink to="/register" className={linkClass}>Register</NavLink>
          <NavLink to="/login" className={linkClass}>Login</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
