import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ Welcome back, ${data.name || "User"}!`);
        navigate("/dashboard");
      } else setError(data.message || "Invalid credentials.");
    } catch {
      setError("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg border-0 p-4" style={{ width: "22rem", borderRadius: "1rem" }}>
        <h3 className="text-center mb-3 fw-bold text-primary">Welcome Back</h3>
        <p className="text-center text-muted mb-4">Login to continue</p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3 input-group">
            <span className="input-group-text bg-white"><FaEnvelope /></span>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              placeholder="Enter your password"
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

          {error && <p className="text-danger small text-center">{error}</p>}

          <button type="submit" className="btn btn-primary w-100 mt-2 fw-semibold">
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0 text-white-50">
          Don’t have an account? <Link to="/register" className="text-decoration-none fw-semibold">Sign Up</Link>
        </p>
      </div>

      {/* Stylish Background */}
      <style>
        {`
          .login-container {
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #5563de, #74abe2);
          }

          .login-container::before {
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

export default Login;
