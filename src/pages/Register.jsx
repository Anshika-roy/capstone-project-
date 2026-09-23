import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Contact.css";

const initialForm = { name: "", email: "", password: "", confirmPassword: "" };

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    localStorage.setItem("travelExplorerRegistration", JSON.stringify({
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase()
    }));
    setMessage("Registration details saved for this browser.");
    setFormData(initialForm);
    navigate("/login");
  };

  return (
    <div className="static-page contact-page">
      <h1>Register</h1>
      <p>Create a simple local registration record for the lab demonstration.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Name<input name="name" value={formData.name} onChange={handleChange} required /></label>
        <label>Email<input type="email" name="email" value={formData.email} onChange={handleChange} required /></label>
        <label>Password<input type="password" name="password" value={formData.password} onChange={handleChange} minLength="6" required /></label>
        <label>Confirm password<input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} minLength="6" required /></label>
        {error && <p className="payment-message payment-error">{error}</p>}
        {message && <p className="payment-message">{message}</p>}
        <button type="submit" className="submit-btn">Register</button>
      </form>
      <p className="form-link">Already registered? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Register;
