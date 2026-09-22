// src/pages/About.jsx
// A simple static page -- no state or props needed here.

import "./About.css";

function About() {
  return (
    <div className="static-page">
      <h1>About This Project</h1>
      <p>
        Travel Destination Explorer is a capstone project for the Advanced Web
        Technology course. Experiment 3 focuses on rebuilding the application's
        frontend using <strong>React.js</strong>, replacing repeated static HTML
        with reusable components and client-side routing via
        <strong> React Router DOM</strong>.
      </p>
      <p>
        At this stage, all destination data lives in a local JavaScript array
        (<code>src/data/destinations.js</code>). A later experiment will connect
        this frontend to a Node.js/Express backend backed by MongoDB.
      </p>

      <h2>What this experiment demonstrates</h2>
      <ul>
        <li>Breaking a UI into reusable components (Navbar, Footer, DestinationCard, etc.)</li>
        <li>Passing data between components using props</li>
        <li>Managing interactive state with the useState hook</li>
        <li>Rendering lists dynamically with map()</li>
        <li>Multi-page navigation with React Router, including dynamic routes</li>
      </ul>
    </div>
  );
}

export default About;
