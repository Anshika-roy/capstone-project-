// src/App.jsx
//
// This is where React Router is configured. <Routes> looks at the current
// URL and renders whichever <Route> matches. Navbar and Footer sit OUTSIDE
// <Routes>, so they appear on every page, while the matched page component
// is rendered in between.

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import DestinationDetails from "./pages/DestinationDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          {/* Dynamic route: ":id" is a URL parameter, read with useParams() */}
          <Route path="/destination/:id" element={<DestinationDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
