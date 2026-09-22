import { useState } from "react";
import "./Contact.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const savedRegistration = JSON.parse(localStorage.getItem("travelExplorerRegistration") || "null");
    if (savedRegistration && savedRegistration.email === formData.email.trim().toLowerCase()) {
      localStorage.setItem("travelExplorerLogin", JSON.stringify({ email: savedRegistration.email }));
      setMessage("Login form submitted successfully for this lab demonstration.");
      setError("");
      return;
    }
    setMessage("");
    setError("No matching local registration was found. Register first or check your email.");
  };

  return (
    <div className="static-page contact-page">
      <h1>Login</h1>
      <p>Use the local registration record to demonstrate React form handling.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Email<input type="email" name="email" value={formData.email} onChange={handleChange} required /></label>
        <label>Password<input type="password" name="password" value={formData.password} onChange={handleChange} required /></label>
        {error && <p className="payment-message payment-error">{error}</p>}
        {message && <p className="payment-message">{message}</p>}
        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
