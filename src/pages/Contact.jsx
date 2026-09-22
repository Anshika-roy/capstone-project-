// src/pages/Contact.jsx
//
// Demonstrates a controlled form: every input's value is stored in
// component state (one object here), and onChange keeps state in sync
// with what the user types. There is no backend yet, so "submitting"
// just shows a confirmation message using another piece of state.

import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Spread the previous state and overwrite only the changed field.
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // stop the browser from reloading the page
    setSubmitted(true);
  };

  return (
    <div className="static-page contact-page">
      <h1>Contact Us</h1>
      <p>Have a question about a destination or feedback on the app? Send us a message below.</p>

      {submitted ? (
        <div className="contact-success">
          <p>Thanks, {formData.name || "traveller"}! Your message has been noted (demo only -- no backend yet).</p>
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
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      )}
    </div>
  );
}

export default Contact;
