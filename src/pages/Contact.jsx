// src/pages/Contact.jsx
//
// Demonstrates a controlled form: every input's value is stored in
// component state (one object here), and onChange keeps state in sync
// with what the user types. There is no backend yet, so "submitting"
// just shows a confirmation message using another piece of state.

import { useState } from "react";
import { submitEnquiry } from "../lib/api";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Spread the previous state and overwrite only the changed field.
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // stop the browser from reloading the page
    setIsSubmitting(true);
    setError("");
    try {
      await submitEnquiry(formData);
      setSubmitted(true);
    } catch (requestError) {
      setError(requestError.message || "Unable to send your message right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="static-page contact-page">
      <h1>Contact Us</h1>
      <p>Have a question about a destination or feedback on the app? Send us a message below.</p>

      {submitted ? (
        <div className="contact-success">
          <p>Thanks, {formData.name || "traveller"}! Your message has been sent.</p>
          <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", message: "" }); }}>
            Send another message
          </button>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required />
          </label>
          {error && <p className="payment-message payment-error">{error}</p>}
          <button type="submit" className="submit-btn" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send Message"}</button>
        </form>
      )}
    </div>
  );
}

export default Contact;
