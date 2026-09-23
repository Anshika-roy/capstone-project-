// src/App.jsx
//
// This is where React Router is configured. <Routes> looks at the current
// URL and renders whichever <Route> matches. Navbar and Footer sit OUTSIDE
// <Routes>, so they appear on every page, while the matched page component
// is rendered in between.

import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import DestinationDetails from "./pages/DestinationDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";

function ProtectedRoute({ children }) {
  return localStorage.getItem("travelExplorerLogin") ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
          {/* Dynamic route: ":id" is a URL parameter, read with useParams() */}
          <Route path="/destination/:id" element={<ProtectedRoute><DestinationDetails /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
