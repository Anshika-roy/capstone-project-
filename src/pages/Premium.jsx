import { Link } from "react-router-dom";
import "./Contact.css";

function Premium() {
  return (
    <div className="static-page contact-page">
      <h1>Premium Destination Guide</h1>
      <p className="payment-message">Premium Active</p>
      <div className="contact-success">
        <h2>Premium planning unlocked</h2>
        <p>Use the existing Explore and destination details pages with your Pro planning access.</p>
        <Link className="submit-btn" to="/explore">Explore destinations</Link>
      </div>
    </div>
  );
}

export default Premium;
