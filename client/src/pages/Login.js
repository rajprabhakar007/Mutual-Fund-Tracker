import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../api';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await login(form);
    localStorage.setItem("token", res.data.token);

    
    const nameFromEmail = form.email.split("@")[0];
    localStorage.setItem("user", JSON.stringify({
      email: form.email,
      name: nameFromEmail
    }));

    navigate(redirectTo);
  } catch (err) {
    alert("Invalid credentials");
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

      navigate(redirectTo);
    } catch (err) {
      console.error("Google login error:", err);
      alert("Google login failed");
    }
  };

  return (
    <div className="container col-md-6 mt-5">
      <h3>Login</h3>

      
      <form onSubmit={handleSubmit}>
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
        <button className="btn btn-primary w-100">Login</button>
      </form>

      
      <div className="text-center my-3">
        <span className="text-muted">OR</span>
      </div>

      
      <div className="d-grid">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("Google login failed")}
        />
      </div>
    </div>
  );
}

export default Login;
