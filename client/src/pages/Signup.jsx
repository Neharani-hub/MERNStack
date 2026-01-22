import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert(`✅ Welcome, ${data.name || formData.name}!`);
        navigate("/login");
      } else setError(data.message || "Signup failed.");
    } catch {
      setError("Server error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="signup-container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "28rem" }}>
        <h2 className="text-center mb-4 text-primary fw-bold">Create Account</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-white"><FaUser /></span>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-white"><FaEnvelope /></span>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-white"><FaLock /></span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
            <span
              className="input-group-text bg-white"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <div className="alert alert-danger small">{error}</div>}

          <button type="submit" className="btn btn-primary w-100 fw-semibold" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0 text-white-50">
          Already have an account? <Link to="/login" className="text-decoration-none fw-semibold">Login</Link>
        </p>
      </div>

      {/* Stylish Background */}
      <style>
        {`
          .signup-container {
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #5563de, #74abe2);
          }

          .signup-container::before {
            content: 'AWP PROJECT';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-25deg);
            font-size: 8rem;
            color: rgba(255, 255, 255, 0.08);
            font-weight: 900;
            letter-spacing: 1rem;
            text-transform: uppercase;
            white-space: nowrap;
            pointer-events: none;
            user-select: none;
            z-index: 0;
            filter: blur(2px);
            animation: floatText 10s linear infinite alternate;
          }

          @keyframes floatText {
            0% { transform: translate(-50%, -50%) rotate(-25deg) translateX(-10%); }
            50% { transform: translate(-50%, -50%) rotate(-25deg) translateX(10%); }
            100% { transform: translate(-50%, -50%) rotate(-25deg) translateX(-10%); }
          }

          .card {
            position: relative;
            z-index: 1;
          }
        `}
      </style>
    </div>
  );
}

export default Signup;
