import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert("Registration failed. Try another email.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const res = await axios.post("http://localhost:5000/api/users/google-login", {
        email: decoded.email,
        name: decoded.name,
        googleId: decoded.sub,
        picture: decoded.picture
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture
      }));

      navigate("/");
    } catch (err) {
      console.error("Google registration/login error:", err);
      alert("Google sign-in failed");
    }
  };

  return (
    <div className="container col-md-6 mt-5">
      <h3>Register</h3>

      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            className="form-control"
            required
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            required
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-success w-100">Register</button>
      </form>

      
      <div className="text-center my-3">
        <span className="text-muted">OR</span>
      </div>

      
      <div className="d-grid">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("Google sign-in failed")}
        />
      </div>
    </div>
  );
}

export default Register;
