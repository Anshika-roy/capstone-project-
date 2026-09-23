import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Contact.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.email.trim() || !formData.password) {
      setError("Enter both your email and password.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Enter a valid email address.");
      return;
    }
    const savedRegistration = JSON.parse(localStorage.getItem("travelExplorerRegistration") || "null");
    if (savedRegistration && savedRegistration.email === formData.email.trim().toLowerCase() && savedRegistration.password === formData.password) {
      localStorage.setItem("travelExplorerLogin", JSON.stringify({ email: savedRegistration.email }));
      setMessage("Login form submitted successfully for this lab demonstration.");
      setError("");
      navigate("/home");
      return;
    }
    setMessage("");
    setError("No matching local registration was found. Register first or check your email.");
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    setMessage("Password recovery requires a backend authentication service and is not enabled for this lab demo.");
    setError("");
  };

  return (
    <div className="static-page contact-page">
      <h1>Login</h1>
      <p>Use the local registration record to demonstrate React form handling.</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Email<input type="email" name="email" value={formData.email} onChange={handleChange} required /></label>
        <label>Password
          <span className="password-field">
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required />
            <button type="button" className="password-toggle" onClick={() => setShowPassword((previous) => !previous)}>{showPassword ? "Hide" : "Show"}</button>
          </span>
        </label>
        {error && <p className="payment-message payment-error">{error}</p>}
        {message && <p className="payment-message">{message}</p>}
        <button type="submit" className="submit-btn">Login</button>
      </form>
      <p className="form-link"><a href="#forgot" onClick={handleForgotPassword}>Forgot Password?</a></p>
      <p className="form-link">New traveller? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;
