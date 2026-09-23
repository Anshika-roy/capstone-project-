// src/components/Navbar.jsx
//
// A reusable component. It receives no props here because every page
// needs the exact same navigation bar, but it uses React Router's
// <NavLink> so the *active* page is highlighted automatically.

import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../lib/api";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("travelExplorerLogin"));
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
          <NavLink to="/home" className={linkClass}>Home</NavLink>
          <NavLink to="/explore" className={linkClass}>Explore</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          <NavLink to="/register" className={linkClass}>Register</NavLink>
          {isLoggedIn ? <button className="nav-link nav-button" onClick={async () => { await logoutUser().catch(() => {}); localStorage.removeItem("travelExplorerToken"); localStorage.removeItem("travelExplorerLogin"); navigate("/login"); }}>Logout</button> : <NavLink to="/login" className={linkClass}>Login</NavLink>}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
