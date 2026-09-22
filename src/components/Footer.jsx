// src/components/Footer.jsx
// A static, reusable component shared by every page through App.jsx.

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>Travel Destination Explorer &mdash; Advanced Web Technology Capstone, Experiment 3</p>
        <p className="footer-note">Built with React.js &amp; React Router &middot; Live API with local fallback</p>
      </div>
    </footer>
  );
}

export default Footer;
